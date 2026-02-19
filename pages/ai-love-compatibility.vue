<template>
  <div class="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 selection:bg-rose-500/30">
    <div class="w-full max-w-4xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-center">
      <!-- Heartbeat Background Glow -->
      <div class="absolute -top-24 -left-24 w-64 h-64 bg-rose-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-24 -right-24 w-64 h-64 bg-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
      
      <div class="relative z-10">
        <div class="inline-block px-4 py-1.5 mb-6 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-widest">
          AI Relationship Pulse
        </div>
        
        <h1 class="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-rose-200 to-pink-400 mb-6 tracking-tight leading-tight">
          AI Love Compatibility & <br/>
          <span class="text-white drop-shadow-[0_0_15px_rgba(244,63,94,0.5)] italic">Relationship Art</span>
        </h1>
        
        <p class="text-slate-400 text-xl max-w-2xl mx-auto mb-12 font-medium">
          Upload two photos or enter two birth dates to see your relationship's cosmic synergy visualized by HitPaw AI.
        </p>

        <!-- Interactive Comparison Input -->
        <div class="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div class="bg-white/5 border border-white/10 rounded-2xl p-6 transition-all hover:bg-white/10">
            <span class="text-rose-400 text-xs font-bold uppercase block mb-4">Partner A</span>
            <input type="date" class="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white mb-4" />
          </div>
          <div class="bg-white/5 border border-white/10 rounded-2xl p-6 transition-all hover:bg-white/10 relative">
            <div class="absolute -left-3 top-1/2 -translate-y-1/2 z-20 bg-rose-600 p-1.5 rounded-full border-4 border-slate-950">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
              </svg>
            </div>
            <span class="text-rose-400 text-xs font-bold uppercase block mb-4">Partner B</span>
            <input type="date" class="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white mb-4" />
          </div>
        </div>

        <button class="w-full max-w-md px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-black text-lg rounded-2xl transition-all active:scale-95 shadow-xl shadow-rose-500/20 mb-12">
          COMPUTE SYNERGY & GENERATE ART
        </button>

        <!-- Use Cases -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div class="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 class="text-white font-bold mb-2">Synastry Painting</h3>
            <p class="text-slate-400 text-sm">We blend both of your birth charts into a single artistic expression of your combined energy.</p>
          </div>
          <div class="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 class="text-white font-bold mb-2">Talking Compatibility</h3>
            <p class="text-slate-400 text-sm">Get an AI-voiced video analysis of your relationship strengths and challenges.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'AI Love Compatibility Test | Relationship Synergy Art | HitPaw AI',
  meta: [
    { name: 'description', content: 'Free AI Love Compatibility calculator. See your relationship energy visualized as custom AI art. Synastry and horoscope matching with HitPaw.' }
  ]
})
</script>
