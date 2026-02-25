import { defineEventHandler, readMultipartFormData, createError, sendStream } from 'h3';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { tmpdir } from 'os';

// Set ffmpeg path
if (ffmpegPath) {
  ffmpeg.setFfmpegPath(ffmpegPath);
}

export default defineEventHandler(async (event) => {
  console.log('--- Start Generation Process ---');
  const tempFiles: string[] = [];

  try {
    const formData = await readMultipartFormData(event);
    if (!formData) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No form data received',
      });
    }

    const videoFile = formData.find((item) => item.name === 'video');
    if (!videoFile || !videoFile.data) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No video file uploaded',
      });
    }

    const tempDir = tmpdir();
    const inputPath = path.join(tempDir, `input-${uuidv4()}.mp4`);
    const outputPath = path.join(tempDir, `output-${uuidv4()}.mp4`);
    tempFiles.push(inputPath, outputPath);

    // Use process.cwd() to ensure absolute path in Render/Nitro
    const satisfyingVideoPath = path.join(process.cwd(), 'public/assets/satisfying.mp4');
    
    console.log('Current working directory:', process.cwd());
    console.log('Target satisfying video path:', satisfyingVideoPath);

    // Write uploaded file to temp
    fs.writeFileSync(inputPath, videoFile.data);

    // Check if satisfying video exists
    if (!fs.existsSync(satisfyingVideoPath)) {
      console.error('Missing satisfying.mp4 at:', satisfyingVideoPath);
      throw createError({
        statusCode: 500,
        statusMessage: 'Source assets missing on server',
      });
    }

    return await new Promise((resolve, reject) => {
      console.log('Starting FFmpeg command...');
      ffmpeg()
        .input(inputPath)
        .input(satisfyingVideoPath)
        .complexFilter([
          '[0:v]scale=720:-1[top]',
          '[1:v]scale=720:-1[bottom]',
          '[top][bottom]vstack=inputs=2[v]'
        ])
        .map('[v]')
        .outputOptions('-c:v libx264')
        .outputOptions('-preset ultrafast')
        .on('start', (commandLine) => {
          console.log('Spawned FFmpeg with command: ' + commandLine);
        })
        .on('end', () => {
          console.log('FFmpeg finished successfully');
          const stream = fs.createReadStream(outputPath);
          
          // Cleanup input immediately
          if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
          
          // Note: outputPath is cleaned up via event hook or left to OS temp if streaming
          resolve(sendStream(event, stream));
        })
        .on('error', (err) => {
          console.error('FFmpeg execution error:', err.message);
          reject(createError({
            statusCode: 500,
            statusMessage: `FFmpeg error: ${err.message}`,
          }));
        })
        .save(outputPath);
    });

  } catch (error: any) {
    console.error('Handler error:', error);
    
    // Cleanup any created temp files on error
    for (const file of tempFiles) {
      if (fs.existsSync(file)) {
        try { fs.unlinkSync(file); } catch (e) {}
      }
    }

    if (error.statusCode) throw error;
    
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Internal Server Error during video generation',
    });
  }
});
