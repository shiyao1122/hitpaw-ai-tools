import { useNexusStore, type SuggestedTool } from '~/stores/nexus'

export const useContextAnalyzer = () => {
  const nexusStore = useNexusStore()

  const KEYWORD_MAP: Record<string, SuggestedTool> = {
    'video': {
      id: 'video-enhancer',
      name: 'Video Enhancer',
      description: 'Upscale and improve video quality with AI.',
      icon: 'video'
    },
    'upscale': {
      id: 'photo-enhancer',
      name: 'Photo Enhancer',
      description: 'Enlarge images without losing detail.',
      icon: 'image'
    },
    'watermark': {
      id: 'watermark-remover',
      name: 'Watermark Remover',
      description: 'Remove unwanted objects or text from media.',
      icon: 'image'
    },
    'background': {
      id: 'bg-remover',
      name: 'Background Remover',
      description: 'Automatically remove image backgrounds.',
      icon: 'image'
    },
    'photo': {
      id: 'photo-enhancer',
      name: 'Photo Enhancer',
      description: 'Enhance and repair your photos.',
      icon: 'image'
    },
    'image': {
      id: 'photo-enhancer',
      name: 'Photo Enhancer',
      description: 'Enhance and repair your photos.',
      icon: 'image'
    },
    'blur': {
      id: 'photo-enhancer',
      name: 'Photo Enhancer',
      description: 'Fix blurry images and improve clarity.',
      icon: 'image'
    }
  }

  const analyzeClipboard = async () => {
    nexusStore.setAnalyzing(true)
    nexusStore.setSuggestedTool(null)
    
    try {
      // Logic: Use browser navigator.clipboard.readText() API
      const text = await navigator.clipboard.readText()
      console.log('Successfully read clipboard context:', text)
      nexusStore.setContext(text)

      // Keywords: Map keywords to tool IDs
      const lowerText = text.toLowerCase()
      let matchedTool: SuggestedTool | null = null

      for (const [keyword, tool] of Object.entries(KEYWORD_MAP)) {
        if (lowerText.includes(keyword)) {
          matchedTool = tool
          break
        }
      }

      if (matchedTool) {
        nexusStore.setSuggestedTool(matchedTool)
      }
      
      return text
    } catch (error) {
      console.error('Clipboard analysis failed:', error)
      nexusStore.setContext('Clipboard access denied')
    } finally {
      nexusStore.setAnalyzing(false)
    }
  }

  return {
    analyzeClipboard
  }
}
