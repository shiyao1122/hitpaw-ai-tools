<template>
  <div class="min-h-screen bg-slate-950 flex flex-col items-center justify-start py-8 px-4 sm:py-12 sm:px-6 lg:px-8 selection:bg-purple-500/30 overflow-x-hidden">
    <!-- Main Container: Adjusted max-width for ultra-wide screens and flex layout -->
    <div class="w-full max-w-[1600px] backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl relative overflow-hidden">
      <!-- Cosmic Background Glows -->
      <div class="absolute -top-24 -left-24 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
      
      <div class="relative z-10 flex flex-col xl:flex-row gap-12 xl:items-start lg:justify-between">
        
        <!-- Left Column: Content & Input (Takes more space on large screens) -->
        <div class="flex-1 xl:max-w-[55%] text-center xl:text-left">
          <div class="inline-block px-4 py-1.5 mb-6 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest">
            AI Cosmic Oracle
          </div>
          
          <h1 class="text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-purple-200 to-indigo-400 mb-6 tracking-tight leading-tight">
            Don't Just Read Your Future.<br class="hidden sm:block"/>
            <span class="text-white drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] uppercase italic">See It.</span>
          </h1>
          
          <p class="text-slate-400 text-lg sm:text-xl xl:text-2xl mb-12 font-medium leading-relaxed max-w-2xl xl:mx-0 mx-auto">
            The world's first AI tool that turns your birth chart into a masterpiece. Visualize your cosmic identity with HitPaw AI.
          </p>

          <!-- Interactive Birthday Input -->
          <div class="max-w-md mx-auto xl:mx-0 bg-white/5 border border-white/10 rounded-2xl p-6 mb-12 group transition-all hover:bg-white/10 text-left">
            <label class="block text-slate-400 text-sm font-bold uppercase mb-4">Your Birth Date</label>
            <div class="flex flex-col sm:flex-row gap-4">
              <input 
                v-model="birthDate"
                type="date" 
                class="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
              <button 
                @click="generateArt"
                :disabled="loading"
                class="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all active:scale-95 whitespace-nowrap shadow-lg shadow-purple-500/20 disabled:opacity-50 flex items-center justify-center min-w-[140px]"
              >
                <span v-if="!loading">Generate Art</span>
                <span v-else class="flex items-center gap-2">
                  <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Creating...
                </span>
              </button>
            </div>
          </div>

          <!-- Features Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div class="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all group">
              <div class="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-white font-bold mb-2">Birth Chart Art</h3>
              <p class="text-slate-400 text-sm leading-snug">Blend placements into a unique digital avatar.</p>
            </div>

            <div class="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all group">
              <div class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 class="text-white font-bold mb-2">AI Tarot Cards</h3>
              <p class="text-slate-400 text-sm leading-snug">AI draws your reading in real-time. No repeats.</p>
            </div>

            <div class="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all group">
              <div class="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-white font-bold mb-2">Video Horoscope</h3>
              <p class="text-slate-400 text-sm leading-snug">Cinematic 15s video for social media.</p>
            </div>
          </div>
        </div>

        <!-- Right Column: Result Area -->
        <div class="flex-1 xl:max-w-[40%]">
          <div v-if="resultImage" class="rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-500 text-left bg-slate-900 sticky top-8">
            <div ref="captureArea" class="bg-slate-950 relative overflow-hidden flex flex-col max-h-[70vh] xl:max-h-[80vh]">
              <div class="p-4 flex justify-between items-center relative z-20 bg-slate-950/80 backdrop-blur-md">
                <div class="text-white font-black tracking-tighter text-lg">HitPaw <span class="text-purple-500">AI</span></div>
                <div v-if="zodiacSign" class="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-white text-[9px] font-bold uppercase tracking-widest">
                  {{ zodiacSign }}
                </div>
              </div>
              <div class="overflow-y-auto custom-scrollbar relative z-10 flex-1">
                <div class="absolute inset-0 opacity-10 pointer-events-none">
                  <div class="absolute -top-24 -left-24 w-48 h-48 bg-purple-600 rounded-full blur-3xl"></div>
                  <div class="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-600 rounded-full blur-3xl"></div>
                </div>
                <img :src="resultImage" crossorigin="anonymous" class="w-full h-auto" alt="AI Generated Destiny" />
                <div v-if="fortuneReport" class="p-6 sm:p-8 bg-slate-900/50 backdrop-blur-sm">
                  <h2 class="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-4 tracking-tight">2026 Cosmic Fortune Report</h2>
                  <div class="text-slate-300 whitespace-pre-wrap leading-relaxed text-sm font-medium">
                    {{ fortuneReport }}
                  </div>
                  <div class="mt-8 pt-6 border-t border-white/10 text-center">
                    <p class="text-slate-500 text-[9px] uppercase font-bold tracking-[0.2em] mb-1">Generated by HitPaw AI Astrology</p>
                    <p class="text-purple-400/50 text-[9px]">www.hitpaw.ai | Discover Your Cosmic Identity</p>
                  </div>
                </div>
              </div>
              <div class="p-4 bg-white/5 backdrop-blur-xl flex flex-wrap gap-4 justify-between items-center border-t border-white/10 relative z-20">
                <span class="text-[10px] text-slate-400 uppercase font-bold tracking-widest">2026 Vision Ready</span>
                <div class="flex gap-3">
                  <button @click="saveAsLongImage" :disabled="savingImage" class="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50">
                    <span v-if="!savingImage">DOWNLOAD</span>
                    <span v-else>...</span>
                  </button>
                  <button @click="shareArt" class="text-slate-400 text-[10px] font-bold hover:text-white transition-colors uppercase">Source</button>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="h-[400px] sm:h-[600px] border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center p-12 text-center group">
             <div class="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
               <svg class="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
             </div>
             <h3 class="text-slate-500 font-bold text-lg mb-2">Visualize Your Destiny</h3>
             <p class="text-slate-600 text-sm max-w-[240px]">Enter your birth date above to generate your custom AI cosmic art and 2026 report.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="max-w-[1600px] w-full mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 sm:px-12 py-8 border-t border-white/5 opacity-50 hover:opacity-100 transition-opacity">
      <div>
        <h4 class="text-white font-bold mb-3 uppercase tracking-tighter">About HitPaw AI Astrology</h4>
        <p class="text-slate-400 text-sm sm:text-base leading-relaxed">
          HitPaw is pioneering the intersection of spiritual intelligence and generative AI. Our Birth Chart Art Generator uses proprietary prompt engineering to create one-of-a-kind digital assets. Whether you're a 1k, 2k, or 4k screen user, our platform visualizes your cosmic destiny in ultra-high resolution.
        </p>
      </div>
      <div>
        <h4 class="text-white font-bold mb-3 uppercase tracking-tighter text-right lg:text-left">Top AI Mystic Keywords</h4>
        <div class="flex flex-wrap gap-3 justify-end lg:justify-start">
          <span class="text-slate-500 text-xs px-3 py-1 bg-white/5 border border-white/5 rounded-full italic hover:text-purple-400 transition-colors">#AIastrology</span>
          <span class="text-slate-500 text-xs px-3 py-1 bg-white/5 border border-white/5 rounded-full italic hover:text-purple-400 transition-colors">#AItarotArt</span>
          <span class="text-slate-500 text-xs px-3 py-1 bg-white/5 border border-white/5 rounded-full italic hover:text-purple-400 transition-colors">#BirthChartVisualization</span>
          <span class="text-slate-500 text-xs px-3 py-1 bg-white/5 border border-white/5 rounded-full italic hover:text-purple-400 transition-colors">#HitPawAI</span>
          <span class="text-slate-500 text-xs px-3 py-1 bg-white/5 border border-white/5 rounded-full italic hover:text-purple-400 transition-colors">#2026HoroscopeArt</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 20px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
</style>

<script setup>
import html2canvas from 'html2canvas'
const birthDate = ref('')
const loading = ref(false)
const resultImage = ref('')
const fortuneReport = ref('')
const zodiacSign = ref('')
const savingImage = ref(false)
const captureArea = ref(null)

const generateArt = async () => {
  if (!birthDate.value) return
  loading.value = true
  resultImage.value = ''
  fortuneReport.value = ''
  zodiacSign.value = ''
  try {
    const response = await fetch('/api/oracle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ birthDate: birthDate.value })
    })
    const data = await response.json()
    if (data.url) resultImage.value = data.url
    if (data.fortuneReport) fortuneReport.value = data.fortuneReport
    if (data.zodiac) zodiacSign.value = data.zodiac
  } catch (e) {
    console.error('Generation failed', e)
  } finally {
    loading.value = false
  }
}

const saveAsLongImage = async () => {
  if (!captureArea.value) return
  savingImage.value = true
  try {
    const canvas = await html2canvas(captureArea.value, {
      useCORS: true,
      scale: 2,
      backgroundColor: '#020617',
      logging: false,
    })
    const link = document.createElement('a')
    link.download = `HitPaw-AI-Fortune-2026-${zodiacSign.value}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  } catch (e) {
    console.error('Failed to save image', e)
  } finally {
    savingImage.value = false
  }
}

const shareArt = () => { window.open(resultImage.value, '_blank') }

useHead({
  title: 'AI Astrology & Tarot Art Generator | Visualize Your Destiny | HitPaw AI',
  meta: [
    { name: 'description', content: 'Transform your birth chart and tarot readings into stunning AI-generated art. Experience the first visual-first AI astrology tool on HitPaw.ai.' },
    { property: 'og:title', content: 'AI Astrology & Tarot Art Generator | HitPaw AI' },
    { property: 'og:image', content: 'https://www.hitpaw.ai/og-astrology.jpg' }
  ]
})
</script>
