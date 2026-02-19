import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { birthDate, type = 'image' } = body

  if (!birthDate) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Birth date is required',
    })
  }

  // Basic logic to derive a prompt from birth date
  // In a real app, this would involve more complex astrology calculations
  const dateObj = new Date(birthDate)
  const month = dateObj.getMonth() + 1
  const day = dateObj.getDate()
  
  let zodiac = ''
  if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) zodiac = 'Aquarius'
  else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) zodiac = 'Pisces'
  else if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) zodiac = 'Aries'
  else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) zodiac = 'Taurus'
  else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) zodiac = 'Gemini'
  else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) zodiac = 'Cancer'
  else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) zodiac = 'Leo'
  else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) zodiac = 'Virgo'
  else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) zodiac = 'Libra'
  else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) zodiac = 'Scorpio'
  else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) zodiac = 'Sagittarius'
  else zodiac = 'Capricorn'

  const prompt = `A cosmic, ethereal masterpiece representing the zodiac sign ${zodiac}, digital art, 8k, cinematic lighting, astrology theme`

  const serverUrl = process.env.ORACLE_SERVER_URL || 'http://localhost:5001/api/oracle'

  try {
    const response = await fetch(serverUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, type })
    })
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error calling oracle server:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
