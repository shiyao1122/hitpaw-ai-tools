import { defineStore } from 'pinia'

export const useNexusStore = defineStore('nexus', {
  state: () => ({
    isLauncherOpen: false,
    currentContext: null as string | null,
    workspaceData: [] as any[],
    isAnalyzing: false
  }),
  actions: {
    toggleLauncher() {
      this.isLauncherOpen = !this.isLauncherOpen
    },
    setContext(context: string) {
      this.currentContext = context
    },
    setAnalyzing(status: boolean) {
      this.isAnalyzing = status
    }
  }
})
