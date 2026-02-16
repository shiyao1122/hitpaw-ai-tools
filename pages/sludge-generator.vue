<script setup lang="ts">
const quotaManager = useQuotaManager()

const selectedFootage = ref('minecraft')
const isGenerating = ref(false)
const showQuotaModal = ref(false)
const uploadedFile = ref<File | null>(null)
const generatedVideoUrl = ref<string | null>(null)

const footageOptions = [
  { id: 'minecraft', name: 'Minecraft Parkour', preview: 'https://placehold.co/400x225/1a1a1a/ffffff?text=Minecraft' },
  { id: 'sand', name: 'Satisfying Sand', preview: 'https://placehold.co/400x225/1a1a1a/ffffff?text=Sand' },
  { id: 'hydraulic', name: 'Hydraulic Press', preview: 'https://placehold.co/400x225/1a1a1a/ffffff?text=Hydraulic' }
]

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    uploadedFile.value = target.files[0]
  }
}

const handleGenerate = async () => {
  if (!uploadedFile.value) {
    alert('Please upload a video first!')
    return
  }

  if (!quotaManager.canConsume()) {
    showQuotaModal.value = true
    return
  }

  isGenerating.value = true
  generatedVideoUrl.value = null
  
  try {
    const formData = new FormData()
    formData.append('video', uploadedFile.value)
    formData.append('footage', selectedFootage.value)

    const response = await fetch('/api/generate', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error('Failed to generate video')
    }

    const blob = await response.blob()
    generatedVideoUrl.value = URL.createObjectURL(blob)
    
    quotaManager.consumeQuota()
  } catch (error) {
    console.error('Generation error:', error)
    alert('Failed to generate video. Please try again.')
  } finally {
    isGenerating.value = false
  }
}

const downloadVideo = () => {
  if (!generatedVideoUrl.value) return
  const a = document.createElement('a')
  a.href = generatedVideoUrl.value
  a.download = 'sludge-video.mp4'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
</script>

<template>
  <div class="min-h-screen bg-black text-white font-sans selection:bg-purple-500">
    <!-- Navigation -->
    <nav class="p-6 border-b border-white/10 flex justify-between items-center backdrop-blur-md sticky top-0 z-50">
      <NuxtLink to="/" class="text-2xl font-black tracking-tighter hover:opacity-80 transition-opacity">
        HITPAW<span class="text-purple-500">.AI</span>
      </NuxtLink>
      <div class="flex items-center gap-4">
        <span class="text-sm text-gray-400">Daily Quota: {{ quotaManager.getRemainingQuota() }}/{{ quotaManager.MAX_DAILY_QUOTA }}</span>
      </div>
    </nav>

    <main class="max-w-6xl mx-auto py-12 px-6">
      <div class="text-center mb-16">
        <h1 class="text-5xl md:text-7xl font-black mb-6 tracking-tight">SLUDGE<br/><span class="text-purple-500">GENERATOR</span></h1>
        <p class="text-gray-400 text-xl max-w-2xl mx-auto">Upload your video and we'll pair it with brain-rotting, satisfying footage for maximum retention.</p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Step 1: Upload -->
        <div class="space-y-6">
          <div class="flex items-center gap-3 mb-2">
            <span class="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-bold">1</span>
            <h2 class="text-2xl font-bold">Upload Your Content</h2>
          </div>
          
          <label class="group relative block aspect-video rounded-3xl border-2 border-dashed border-white/20 hover:border-purple-500/50 transition-all cursor-pointer overflow-hidden bg-white/5">
            <input type="file" class="hidden" @change="handleFileUpload" accept="video/*" />
            <div class="absolute inset-0 flex flex-col items-center justify-center space-y-4">
              <div class="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div class="text-center">
                <p class="font-bold text-lg">{{ uploadedFile ? uploadedFile.name : 'Drop video here' }}</p>
                <p class="text-sm text-gray-400">MP4, MOV up to 500MB</p>
              </div>
            </div>
          </label>
        </div>

        <!-- Step 2: Select Footage -->
        <div class="space-y-6">
          <div class="flex items-center gap-3 mb-2">
            <span class="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-bold">2</span>
            <h2 class="text-2xl font-bold">Select Satisfying Background</h2>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <button 
              v-for="option in footageOptions" 
              :key="option.id"
              @click="selectedFootage = option.id"
              :class="[
                'relative aspect-video rounded-2xl overflow-hidden border-2 transition-all group',
                selectedFootage === option.id ? 'border-purple-500 ring-4 ring-purple-500/20' : 'border-transparent hover:border-white/20'
              ]"
            >
              <img :src="option.preview" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                <span class="font-bold text-sm">{{ option.name }}</span>
              </div>
              <div v-if="selectedFootage === option.id" class="absolute top-2 right-2 bg-purple-500 rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Generate Button -->
      <div class="mt-16 flex flex-col items-center gap-8">
        <button 
          @click="handleGenerate"
          :disabled="isGenerating"
          class="relative group px-12 py-5 bg-purple-600 rounded-full font-black text-xl hover:bg-purple-500 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_40px_rgba(147,51,234,0.3)]"
        >
          <span v-if="isGenerating" class="flex items-center gap-2">
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            GENERATING...
          </span>
          <span v-else>GENERATE SLUDGE</span>
        </button>

        <!-- Result Preview -->
        <div v-if="generatedVideoUrl" class="w-full max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div class="relative aspect-[9/16] max-h-[600px] mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <video :src="generatedVideoUrl" controls class="w-full h-full object-cover"></video>
          </div>
          <button 
            @click="downloadVideo"
            class="w-full py-5 bg-white text-black font-black text-xl rounded-2xl hover:bg-gray-200 transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            DOWNLOAD SLUDGE
          </button>
        </div>
      </div>
    </main>

    <!-- Quota Modal -->
    <Transition name="fade">
      <div v-if="showQuotaModal" class="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-black/60">
        <div class="bg-zinc-900 border border-white/10 p-10 rounded-[40px] max-w-md w-full text-center shadow-2xl">
          <div class="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-3xl font-black mb-4">QUOTA EXCEEDED</h3>
          <p class="text-gray-400 mb-8 leading-relaxed">You've reached your daily limit of 5 generations. Upgrade to Pro for unlimited sludge.</p>
          <div class="space-y-3">
            <button class="w-full py-4 bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition-colors">UPGRADE TO PRO</button>
            <button @click="showQuotaModal = false" class="w-full py-4 bg-white/5 text-gray-400 font-bold rounded-2xl hover:bg-white/10 transition-colors">MAYBE LATER</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
