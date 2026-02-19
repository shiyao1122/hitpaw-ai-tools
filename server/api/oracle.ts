import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { birthDate, type = 'image' } = body

  if (!birthDate) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Birth date is required',
    })
  }

  // 1. 根据生日计算星座 (Cloud Logic)
  const dateObj = new Date(birthDate)
  const month = dateObj.getMonth() + 1
  const day = dateObj.getDate()
  
  let zodiac = ''
  if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) zodiac = 'Aquarius'
  else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) zodiac = 'Pisces'
  else if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) zodiac = 'Aries'
  else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) zodiac = 'Taurus'
  else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) zodiac = 'Gemini'
  else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) zodiac = 'Cancer'
  else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) zodiac = 'Leo'
  else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) zodiac = 'Virgo'
  else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) zodiac = 'Libra'
  else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) zodiac = 'Scorpio'
  else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) zodiac = 'Sagittarius'
  else zodiac = 'Capricorn'

  // 2. 构造 Prompt
  const prompt = `A cosmic, ethereal digital art representation of the zodiac sign ${zodiac}, cinematic lighting, futuristic 2029 theme, 8k resolution, intricate details.`

  // 3. 直接在 Server API 中调用 Replicate (Cloud Execution)
  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY
  
  if (!REPLICATE_API_TOKEN) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Server configuration error: Missing Replicate API Token',
    })
  }

  if (!OPENAI_API_KEY) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Server configuration error: Missing OpenAI API Key',
    })
  }
  
  try {
    let output;
    let fortuneReport = '';

    if (type === 'image') {
      const response = await fetch("https://api.replicate.com/v1/models/prunaai/z-image-turbo/predictions", {
        method: "POST",
        headers: {
          "Authorization": `Token ${REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: { prompt } }),
      });
      
      const prediction = await response.json();
      
      // 等待 Replicate 生成完成 (Turbo 模型通常非常快)
      let result = prediction;
      while (result.status !== "succeeded" && result.status !== "failed") {
        await new Promise(resolve => setTimeout(resolve, 500));
        const pollResponse = await fetch(prediction.urls.get, {
          headers: { "Authorization": `Token ${REPLICATE_API_TOKEN}` },
        });
        result = await pollResponse.json();
      }
      
      if (result.status === "failed") throw new Error("Image generation failed");
      
      // 修复：确保正确处理数组或字符串输出，避免返回首字母 "h"
      const finalOutput = result.output;
      output = Array.isArray(finalOutput) ? finalOutput[0] : finalOutput;

      // 4. Generate 2026 Fortune Report using OpenAI
      const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "You are a professional astrologer. Provide a detailed 2026 fortune report based on the user's zodiac sign. The report should be approximately 300 words, insightful, and formatted with clear headings for Love, Career, and Wellness."
            },
            {
              role: "user",
              content: `Generate a 2026 fortune report for the zodiac sign: ${zodiac}.`
            }
          ],
          max_tokens: 1000,
        }),
      });

      const openaiData = await openaiResponse.json();
      if (openaiData.choices && openaiData.choices.length > 0) {
        fortuneReport = openaiData.choices[0].message.content;
      }
    }

    return { url: output, fortuneReport }
  } catch (error: any) {
    console.error('Replicate call failed:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Internal Server Error',
    })
  }
})
