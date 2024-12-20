<!-- src/components/StatusGenerator/StatusGenerator.vue -->
<template>
  <div class="min-h-screen bg-gray-50 relative">
    <div class="transition-all duration-300 ease-in-out" :class="{ 'pr-96': showSidebar }">
      <div class="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <!-- Welcome Section -->
        <div class="text-center mb-12">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Welcome to Status Lab</h1>
          <p class="text-gray-600">
            Select your preferences to generate a personalized slack status
          </p>
        </div>

        <!-- Emoji GIF -->
        <div class="mt-8 flex justify-center">
          <img
            src="/emojis/dolphin.gif"
            alt="Emoji Animation"
            class="h-16 w-auto"
            style="padding-right: 25px"
          />
          <img
            src="/emojis/cowboy.gif"
            alt="Emoji Animation"
            class="h-16 w-auto"
            style="padding-right: 25px"
          />
          <img
            src="/emojis/eyes.gif"
            alt="Emoji Animation"
            class="h-16 w-auto"
            style="padding-right: 25px"
          />
          <img
            src="/emojis/cat.gif"
            alt="Emoji Animation"
            class="h-16 w-auto"
            style="padding-right: 25px"
          />
        </div>

        <br />
        <br />

        <!-- Feeling Section -->
        <SelectionGroup title="How are you feeling today?">
          <SelectionChip
            v-for="feeling in feelings"
            :key="feeling"
            :isSelected="selectedFeeling === feeling"
            @click="selectFeeling(feeling)"
          >
            {{ feeling }}
          </SelectionChip>
          <!-- Sarcasm Checkbox -->
          <div class="mt-4 flex items-center space-x-2">
            <input
              type="checkbox"
              id="sarcasmCheck"
              v-model="isSarcastic"
              class="h-4 w-4 text-black rounded border-gray-300 focus:ring-black"
            />
            <label for="sarcasmCheck" class="text-sm text-gray-700 flex items-center">
              Make it sarcastic
              <span class="ml-2 text-gray-500 text-xs">(Warning: Extra snark incoming)</span>
            </label>
          </div>
        </SelectionGroup>

        <!-- Meetings Section -->
        <SelectionGroup title="What are you dealing with today at work?">
          <SelectionChip
            v-for="meeting in meetings"
            :key="meeting"
            :isSelected="selectedMeeting === meeting"
            @click="selectMeeting(meeting)"
          >
            {{ meeting }}
          </SelectionChip>
        </SelectionGroup>

        <!-- Theme Section -->
        <SelectionGroup title="Pick a fun theme for your status">
          <SelectionChip
            v-for="theme in themes"
            :key="theme"
            :isSelected="selectedTheme === theme"
            @click="selectTheme(theme)"
          >
            {{ theme }}
          </SelectionChip>
        </SelectionGroup>

        <!-- Generate Button -->
        <div class="text-center mt-8">
          <button
            @click="generateStatusRecommendations"
            :disabled="!isFormValid || isLoading"
            :class="[
              'px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center space-x-2 mx-auto',
              isFormValid && !isLoading
                ? 'bg-black hover:bg-gray-900 shadow-md'
                : 'bg-gray-400 cursor-not-allowed'
            ]"
          >
            <svg
              v-if="isLoading"
              class="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>{{ isLoading ? 'Generating...' : 'Generate my status' }}</span>
          </button>
        </div>

        <div class="bottom-4 mt-8 flex justify-center">
          <p class="text-sm group cursor-pointer">
            <span class="group-hover:hidden">Made with ❤️ by Vamsi Batchu</span>
            <span class="hidden group-hover:inline">Thanks for visiting Status Lab! 👋</span>
          </p>
        </div>

        <!-- Error Message -->
        <div
          v-if="error"
          class="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center"
        >
          {{ error }}
        </div>
      </div>
    </div>

    <!-- Sidebar -->
    <div
      v-if="showSidebar"
      class="fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 overflow-y-auto"
      :class="{ 'translate-x-0': showSidebar, 'translate-x-full': !showSidebar }"
    >
      <!-- Sidebar Header -->
      <div
        class="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10"
      >
        <h2 class="text-lg font-semibold">Status Recommendations</h2>
        <button @click="closeSidebar" class="text-gray-500 hover:text-gray-700">
          <span class="text-xl">×</span>
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="p-8 flex flex-col items-center justify-center">
        <div
          class="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"
        ></div>
        <p class="mt-4 text-gray-600">Crafting your perfect status...</p>
      </div>

      <!-- Status Cards -->
      <div v-else class="p-4 space-y-4">
        <div
          v-for="(status, index) in statusRecommendations"
          :key="index"
          class="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow relative group"
        >
          <p class="text-gray-800 pr-8">{{ status }}</p>
          <button
            @click="copyStatus(status)"
            class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-100 rounded"
          >
            <svg
              class="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { FEELINGS, MEETINGS, THEMES } from './constants'
import SelectionChip from './SelectionChip.vue'
import SelectionGroup from './SelectionGroup.vue'

export default {
  name: 'StatusGenerator',
  components: {
    SelectionChip,
    SelectionGroup
  },
  setup() {
    const isLoading = ref(false)
    const error = ref(null)
    const isSarcastic = ref(false)

    const generateAIStatus = async (feeling, meeting, theme, sarcastic) => {
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: sarcastic
                  ? "You are a witty and sarcastic status message generator specializing in creating themed statuses for Slack. Your responses should be clever, ironic, and subtly sarcastic while remaining workplace-appropriate. Generate exactly 10 unique, engaging status messages that match the user's current feeling, meeting type, and requested theme style. Return the response as a simple array of strings."
                  : "You are a creative status message generator specialized in creating themed statuses for Slack. Generate exactly 10 unique, engaging status messages that match the user's current feeling, meeting type, and requested theme style. Return the response as a simple array of strings."
              },
              {
                role: 'user',
                content: `Create 10 unique ${sarcastic ? 'sarcastic ' : ''}status messages with:
                         Feeling: ${feeling}
                         Meeting Type: ${meeting}
                         Theme Style: ${theme}
                         
                         Each status should:
                         1. Reference the theme in a clever way
                         2. Indicate the meeting type
                         3. Reflect the current feeling
                         4. ${sarcastic ? 'Include subtle sarcasm and wit' : 'Be engaging and creative'}
                         5. Be appropriate for a professional setting
                         
                         Important: Return ONLY an array of 10 strings in this exact format:
                         [
                           "Status 1",
                           "Status 2",
                           ...and so on
                         ]`
              }
            ],
            temperature: sarcastic ? 0.8 : 0.7,
            max_tokens: 1000
          },
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        )

        const content = response.data.choices[0].message.content

        try {
          return JSON.parse(content)
        } catch (parseError) {
          if (typeof content === 'string') {
            const lines = content
              .split('\n')
              .map((line) => line.trim())
              .filter((line) => line.length > 0)
              .map((line) => line.replace(/^\d+[\)\.]\s*/, ''))
              .map((line) => line.replace(/^["']|["']$/g, ''))
              .filter((line) => line !== '[' && line !== ']')
              .slice(0, 10)

            return lines
          }
          throw new Error('Unable to parse API response')
        }
      } catch (error) {
        console.error('API Error:', error)
        throw error
      }
    }

    return {
      isLoading,
      error,
      generateAIStatus,
      isSarcastic
    }
  },
  data() {
    return {
      feelings: FEELINGS,
      meetings: MEETINGS,
      themes: THEMES,
      selectedFeeling: '',
      selectedMeeting: '',
      selectedTheme: '',
      showSidebar: false,
      statusRecommendations: []
    }
  },
  computed: {
    isFormValid() {
      return this.selectedFeeling && this.selectedMeeting && this.selectedTheme
    }
  },
  methods: {
    selectFeeling(feeling) {
      this.selectedFeeling = feeling
    },
    selectMeeting(meeting) {
      this.selectedMeeting = meeting
    },
    selectTheme(theme) {
      this.selectedTheme = theme
    },
    async generateStatusRecommendations() {
      if (!this.isFormValid) return

      this.isLoading = true
      this.error = null
      this.showSidebar = true

      try {
        const statuses = await this.generateAIStatus(
          this.selectedFeeling,
          this.selectedMeeting,
          this.selectedTheme,
          this.isSarcastic
        )

        if (Array.isArray(statuses) && statuses.length > 0) {
          this.statusRecommendations = statuses
        } else {
          throw new Error('Invalid response format')
        }
      } catch (err) {
        console.error('Error generating status:', err)
        this.error = 'Failed to generate status messages. Please try again.'
        this.statusRecommendations = []
      } finally {
        this.isLoading = false
      }
    },
    async copyStatus(status) {
      try {
        await navigator.clipboard.writeText(status)
      } catch (err) {
        console.error('Failed to copy status:', err)
      }
    },
    closeSidebar() {
      this.showSidebar = false
      this.error = null
    }
  }
}
</script>
