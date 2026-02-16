<script setup lang="ts">
import { useNexusStore } from '~/stores/nexus'
import { useContextAnalyzer } from '~/composables/useContextAnalyzer'

const nexusStore = useNexusStore()
const { analyzeClipboard } = useContextAnalyzer()

const handleLaunch = async () => {
  await analyzeClipboard()
  if (!nexusStore.isLauncherOpen) {
    nexusStore.toggleLauncher()
  }
}

const launchTool = (toolId: string) => {
  console.log(`Launching tool: ${toolId}`)
  // Implementation for tool launching would go here
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
        class="absolute bottom-20 right-0 w-80 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl p-6"
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
          <!-- Context Display -->
          <div class="p-4 rounded-xl bg-white/5 border border-white/10">
            <p class="text-xs text-white/50 uppercase tracking-wider mb-1">Clipboard Content</p>
            <p class="text-sm text-white font-medium truncate">
              {{ nexusStore.isAnalyzing ? 'Analyzing...' : (nexusStore.currentContext || 'No context detected') }}
            </p>
          </div>

          <!-- Suggested Tool Card -->
          <div 
            v-if="nexusStore.suggestedTool"
            class="p-4 rounded-xl bg-blue-600/10 border border-blue-500/20 animate-in fade-in slide-in-from-bottom-2"
          >
            <div class="flex items-start gap-3 mb-3">
              <div class="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                <svg v-if="nexusStore.suggestedTool.icon === 'video'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 class="text-white font-semibold text-sm">Suggested Tool</h4>
                <p class="text-xs text-white/70">{{ nexusStore.suggestedTool.name }}</p>
              </div>
            </div>
            <p class="text-xs text-white/50 mb-4">{{ nexusStore.suggestedTool.description }}</p>
            <button 
              @click="launchTool(nexusStore.suggestedTool.id)"
              class="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors"
            >
              Launch Now
            </button>
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
