export const useQuotaManager = () => {
  const MAX_DAILY_QUOTA = 5
  const QUOTA_KEY = 'hitpaw_sludge_quota'

  const getQuotaData = () => {
    if (process.server) return { count: 0, date: '' }
    const stored = localStorage.getItem(QUOTA_KEY)
    if (!stored) return { count: 0, date: new Date().toDateString() }
    
    const data = JSON.parse(stored)
    const today = new Date().toDateString()
    
    if (data.date !== today) {
      return { count: 0, date: today }
    }
    return data
  }

  const saveQuotaData = (data: { count: number, date: string }) => {
    if (process.client) {
      localStorage.setItem(QUOTA_KEY, JSON.stringify(data))
    }
  }

  const getRemainingQuota = () => {
    const data = getQuotaData()
    return Math.max(0, MAX_DAILY_QUOTA - data.count)
  }

  const consumeQuota = () => {
    const data = getQuotaData()
    if (data.count < MAX_DAILY_QUOTA) {
      data.count++
      saveQuotaData(data)
      return true
    }
    return false
  }

  const canConsume = () => {
    const data = getQuotaData()
    return data.count < MAX_DAILY_QUOTA
  }

  return {
    getRemainingQuota,
    consumeQuota,
    canConsume,
    MAX_DAILY_QUOTA
  }
}
