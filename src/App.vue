<!-- src/App.vue -->
<template>
  <div>
    <StatusGenerator @generate="handleStatusGeneration" />
  </div>
</template>

<script>
import StatusGenerator from './components/StatusGenerator/StatusGenerator.vue'

export default {
  name: 'App',
  components: {
    StatusGenerator
  },
  methods: {
    handleStatusGeneration(data) {
      console.log('Generated status data:', data)
      // Handle the status generation here
    }
  }
}
</script>
