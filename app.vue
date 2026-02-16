<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-900">
    <div class="text-center p-8 bg-white/5 backdrop-blur-md rounded-lg shadow-xl border border-white/10">
      <h1 class="text-4xl font-bold text-white mb-4">HitPaw AI Tools</h1>
      <p class="text-xl text-white/70 font-medium">Ready for Nexus</p>
      <div class="mt-6">
        <span class="inline-block px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold border border-blue-500/30">
          Nuxt 3 + Tailwind CSS
        </span>
      </div>
    </div>
    
    <!-- Nexus Launcher Component -->
    <NexusLauncher />
  </div>
</template>

<script setup>
import NexusLauncher from '~/components/nexus/NexusLauncher.vue'
</script>


<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
