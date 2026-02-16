<script setup lang="ts">
import { useNexusStore } from '~/stores/nexus'
import { useContextAnalyzer } from '~/composables/useContextAnalyzer'

const nexusStore = useNexusStore()
const { analyzeClipboard } = useContextAnalyzer()

const handleLaunch = async () => {
  await analyzeClipboard()
  nexusStore.toggleLauncher()
}
</script>

<template>
  <div class="fixed bottom-8 right-8 z-50">
    <!-- Floating Action Button -->
    <button 
      @click="handleLaunch"
      class="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform active:scale-95 group"
    >
      <div class="relative">
        <span class="absolute inset-0 rounded-full bg-white/20 animate-ping group-hover:hidden"></span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
    </button>

    <!-- Glassmorphic Panel -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0 translate-y-10"
      enter-to-class="transform scale-100 opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100 translate-y-0"
      leave-to-class="transform scale-95 opacity-0 translate-y-10"
    >
      <div 
        v-if="nexusStore.isLauncherOpen"
        class="absolute bottom-20 right-0 w-80 overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl p-6"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-white font-bold text-lg">HitPaw Nexus</h3>
          <button @click="nexusStore.toggleLauncher" class="text-white/60 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <div class="space-y-4">
          <div class="p-4 rounded-xl bg-white/5 border border-white/10">
            <p class="text-xs text-white/50 uppercase tracking-wider mb-1">Current Context</p>
            <p class="text-sm text-white font-medium">
              {{ nexusStore.isAnalyzing ? 'Analyzing...' : (nexusStore.currentContext || 'No context detected') }}
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <button class="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
              <div class="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span class="text-xs text-white">Enhancer</span>
            </button>
            <button class="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
              <div class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <span class="text-xs text-white">Voicebox</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
