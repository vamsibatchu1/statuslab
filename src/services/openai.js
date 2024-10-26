// src/services/openai.js
import axios from 'axios'

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

export const generateStatusWithOpenAI = async (feeling, meeting, theme) => {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a creative status message generator. Generate exactly 10 unique, engaging status messages. 
                     Each status should reflect the given mood, meeting type, and be styled in the theme provided. 
                     Return only the array of 10 status messages, nothing else. Each status should be creative and different.`
          },
          {
            role: 'user',
            content: `Generate 10 status messages with the following parameters:
                     Feeling: ${feeling}
                     Meeting Type: ${meeting}
                     Theme Style: ${theme}
                     Make sure each status captures the essence of the theme while being professional and creative.`
          }
        ],
        temperature: 0.8,
        max_tokens: 500
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    // Parse the response to get array of status messages
    const statusMessages = JSON.parse(response.data.choices[0].message.content)
    return statusMessages
  } catch (error) {
    console.error('Error generating status:', error)
    throw error
  }
}
