<template>
  <div class="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-4xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
      <!-- Background Glow -->
      <div class="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>
      
      <div class="relative z-10 text-center">
        <h1 class="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-4">
          HitPaw Nexus
        </h1>
        <p class="text-slate-400 text-lg max-w-xl mx-auto mb-12">
          Intelligent clipboard analysis and tool orchestration for the next generation of AI-powered media creation.
        </p>
        
        <div class="flex flex-col items-center gap-6">
          <NexusLauncher />
          
          <div class="flex flex-wrap justify-center gap-4">
            <NuxtLink 
              to="/beautifier" 
              class="group relative px-8 py-4 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 rounded-2xl transition-all duration-300"
            >
              <div class="flex items-center gap-3">
                <span class="text-indigo-400 font-bold tracking-wide text-sm uppercase">Priority: Evidence Beautifier</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-indigo-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </NuxtLink>

            <NuxtLink 
              to="/sludge-generator" 
              class="group relative px-8 py-4 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-2xl transition-all duration-300"
            >
              <div class="flex items-center gap-3">
                <span class="text-purple-400 font-bold tracking-wide text-sm uppercase">Sludge Generator</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </NuxtLink>

            <NuxtLink 
              to="/ai-astrology" 
              class="group relative px-8 py-4 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-2xl transition-all duration-300"
            >
              <div class="flex items-center gap-3">
                <span class="text-blue-400 font-bold tracking-wide text-sm uppercase">AI Astrology Art</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </NuxtLink>

            <NuxtLink 
              to="/ai-love-compatibility" 
              class="group relative px-8 py-4 bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 rounded-2xl transition-all duration-300"
            >
              <div class="flex items-center gap-3">
                <span class="text-rose-400 font-bold tracking-wide text-sm uppercase">AI Love Synergy</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-rose-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NexusLauncher from '~/components/nexus/NexusLauncher.vue'
</script>
