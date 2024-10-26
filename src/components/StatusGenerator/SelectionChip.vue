<!-- src/components/StatusGenerator/SelectionChip.vue -->
<template>
  <button
    @click="$emit('click')"
    :class="[
      'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
      isSelected
        ? 'bg-black text-white shadow-md'
        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
    ]"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'SelectionChip',
  props: {
    isSelected: {
      type: Boolean,
      default: false
    }
  }
}
</script>
