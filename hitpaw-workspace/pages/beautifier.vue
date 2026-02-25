<template>
  <div class="min-h-screen bg-[#0a0a0c] text-slate-200 font-sans selection:bg-indigo-500/30">
    <div class="max-w-6xl mx-auto px-6 py-12">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-6xl font-black tracking-tight text-white mb-4">
          Social Evidence <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Beautifier</span>
        </h1>
        <p class="text-slate-400 text-lg">Transform raw screenshots into high-converting social proof.</p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12 items-start">
        <!-- Controls -->
        <div class="space-y-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
          <section>
            <h2 class="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-4">1. Upload Image</h2>
            <div 
              @click="triggerUpload"
              @drop.prevent="handleDrop"
              @dragover.prevent
              @paste="handlePaste"
              class="relative group cursor-pointer border-2 border-dashed border-white/10 hover:border-indigo-500/50 rounded-2xl p-8 transition-all duration-300 bg-slate-900/50 hover:bg-slate-900"
            >
              <input 
                ref="fileInput"
                type="file" 
                class="hidden" 
                accept="image/*"
                @change="handleFileChange"
              />
              <div class="flex flex-col items-center gap-4 text-center">
                <div class="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-white">Click, Drop or Paste</p>
                  <p class="text-sm text-slate-500">Supports PNG, JPG, WebP</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 class="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-4">2. Customize</h2>
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-xs text-slate-400">Background</label>
                <div class="flex gap-2">
                  <button 
                    v-for="bg in backgrounds" 
                    :key="bg.name"
                    @click="config.bg = bg.value"
                    :class="['w-8 h-8 rounded-lg border-2 transition-all', config.bg === bg.value ? 'border-indigo-500 scale-110' : 'border-transparent']"
                    :style="{ background: bg.value }"
                  ></button>
                </div>
              </div>
              <div class="space-y-2">
                <label class="text-xs text-slate-400">Padding</label>
                <input type="range" v-model="config.padding" min="20" max="100" class="w-full accent-indigo-500" />
              </div>
              <div class="space-y-2 text-center">
                <label class="text-xs text-slate-400">Radius</label>
                <input type="range" v-model="config.radius" min="0" max="40" class="w-full accent-indigo-500" />
              </div>
              <div class="space-y-2">
                <label class="text-xs text-slate-400">Shadow</label>
                <input type="range" v-model="config.shadow" min="0" max="100" class="w-full accent-indigo-500" />
              </div>
            </div>
          </section>

          <div class="pt-4 flex flex-col gap-3">
            <button 
              @click="downloadImage"
              :disabled="!imageSource || !canConsume()"
              class="w-full py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 rounded-2xl font-bold text-white shadow-xl shadow-indigo-500/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1h16v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Beautified Evidence
            </button>
            <p class="text-center text-xs text-slate-500">
              Free uses today: <span class="text-indigo-400 font-bold">{{ getRemainingQuota() }} / {{ MAX_DAILY_QUOTA }}</span>
            </p>
          </div>
        </div>

        <!-- Preview Area -->
        <div class="lg:sticky lg:top-12">
          <div class="relative group">
            <!-- Canvas Container -->
            <div 
              ref="previewContainer"
              class="overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 bg-slate-900 aspect-square flex items-center justify-center"
            >
              <canvas ref="canvas" class="max-w-full h-auto"></canvas>
              
              <div v-if="!imageSource" class="absolute inset-0 flex items-center justify-center text-slate-600 flex-col gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="font-medium">No Image Selected</p>
              </div>
            </div>
            
            <!-- Floating badge -->
            <div class="absolute -bottom-4 -right-4 px-6 py-2 bg-slate-900 border border-white/10 rounded-full text-xs font-bold text-slate-400 shadow-2xl">
              Preview Mode
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useQuotaManager } from '~/composables/useQuotaManager'

const { getRemainingQuota, consumeQuota, canConsume, MAX_DAILY_QUOTA } = useQuotaManager()

const canvas = ref(null)
const fileInput = ref(null)
const previewContainer = ref(null)
const imageSource = ref(null)
const loadedImage = ref(null)

const config = reactive({
  bg: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
  padding: 60,
  radius: 16,
  shadow: 40
})

const backgrounds = [
  { name: 'Indigo', value: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' },
  { name: 'Ocean', value: 'linear-gradient(135deg, #0ea5e9 0%, #22d3ee 100%)' },
  { name: 'Candy', value: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)' },
  { name: 'Dark', value: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }
]

const triggerUpload = () => fileInput.value.click()

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) loadImage(file)
}

const handleDrop = (e) => {
  const file = e.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) loadImage(file)
}

const handlePaste = (e) => {
  const item = e.clipboardData.items[0]
  if (item && item.type.indexOf('image') !== -1) {
    loadImage(item.getAsFile())
  }
}

const loadImage = (file) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    imageSource.value = e.target.result
    const img = new Image()
    img.onload = () => {
      loadedImage.value = img
      draw()
    }
    img.src = e.target.result
  }
  reader.readAsDataURL(file)
}

const draw = () => {
  if (!loadedImage.value || !canvas.value) return
  
  const ctx = canvas.value.getContext('2d')
  const p = parseInt(config.padding)
  const r = parseInt(config.radius)
  const s = parseInt(config.shadow)
  
  // Set canvas size
  const width = loadedImage.value.width + p * 2
  const height = loadedImage.value.height + p * 2
  canvas.value.width = width
  canvas.value.height = height
  
  // 1. Draw Background
  if (config.bg.includes('gradient')) {
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    // Simple gradient parser for the demo
    if (config.bg.includes('#6366f1')) {
      gradient.addColorStop(0, '#6366f1')
      gradient.addColorStop(1, '#a855f7')
    } else if (config.bg.includes('#0ea5e9')) {
      gradient.addColorStop(0, '#0ea5e9')
      gradient.addColorStop(1, '#22d3ee')
    } else if (config.bg.includes('#ec4899')) {
      gradient.addColorStop(0, '#ec4899')
      gradient.addColorStop(1, '#f43f5e')
    } else {
      gradient.addColorStop(0, '#1e293b')
      gradient.addColorStop(1, '#0f172a')
    }
    ctx.fillStyle = gradient
  } else {
    ctx.fillStyle = config.bg
  }
  ctx.fillRect(0, 0, width, height)
  
  // 2. Draw Shadow
  if (s > 0) {
    ctx.shadowColor = 'rgba(0, 0, 0, ' + (s / 100) * 0.5 + ')'
    ctx.shadowBlur = s
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = s / 2
  }
  
  // 3. Draw Image with Rounded Corners
  ctx.save()
  // Rounded rect path
  ctx.beginPath()
  ctx.moveTo(p + r, p)
  ctx.lineTo(p + loadedImage.value.width - r, p)
  ctx.quadraticCurveTo(p + loadedImage.value.width, p, p + loadedImage.value.width, p + r)
  ctx.lineTo(p + loadedImage.value.width, p + loadedImage.value.height - r)
  ctx.quadraticCurveTo(p + loadedImage.value.width, p + loadedImage.value.height, p + loadedImage.value.width - r, p + loadedImage.value.height)
  ctx.lineTo(p + r, p + loadedImage.value.height)
  ctx.quadraticCurveTo(p, p + loadedImage.value.height, p, p + loadedImage.value.height - r)
  ctx.lineTo(p, p + r)
  ctx.quadraticCurveTo(p, p, p + r, p)
  ctx.closePath()
  ctx.clip()
  
  ctx.drawImage(loadedImage.value, p, p)
  ctx.restore()
  
  // 4. Reset Shadow for Watermark
  ctx.shadowColor = 'transparent'
  ctx.shadowBlur = 0
  
  // 5. Draw Watermark
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
  ctx.font = 'bold 16px sans-serif'
  ctx.textAlign = 'right'
  ctx.fillText('Beautified by HitPaw', width - 20, height - 20)
}

const downloadImage = () => {
  if (!consumeQuota()) {
    alert('Daily quota exceeded!')
    return
  }
  
  const link = document.createElement('a')
  link.download = 'hitpaw-beautified.png'
  link.href = canvas.value.toDataURL('image/png')
  link.click()
}

watch(config, draw, { deep: true })

onMounted(() => {
  // Initial draw if possible
})
</script>

<style scoped>
canvas {
  filter: drop-shadow(0 25px 50px -12px rgb(0 0 0 / 0.5));
}
</style>
