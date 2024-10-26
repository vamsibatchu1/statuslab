<!-- src/components/StatusGenerator/SelectionGroup.vue -->
<template>
  <div class="mb-8">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">{{ title }}</h2>
    <div class="flex flex-wrap gap-3"><slot></slot></div>
  </div>
</template>
<script>
export default { name: 'SelectionGroup', props: { title: { type: String, required: true } } }
</script>
