import { defineStore } from 'pinia'

export interface SuggestedTool {
  id: string
  name: string
  description: string
  icon: string
}

export const useNexusStore = defineStore('nexus', {
  state: () => ({
    isLauncherOpen: false,
    currentContext: null as string | null,
    workspaceData: [] as any[],
    isAnalyzing: false,
    suggestedTool: null as SuggestedTool | null
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
    },
    setSuggestedTool(tool: SuggestedTool | null) {
      this.suggestedTool = tool
    }
  }
})
