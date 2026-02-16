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
        
        <NexusLauncher />
      </div>
    </div>
  </div>
</template>

<script setup>
import NexusLauncher from '~/components/nexus/NexusLauncher.vue'
</script>
