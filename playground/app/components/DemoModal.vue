<template>
  <UModal
    title="Demo Modal"
    description="Demo on Playground"
  >
    <template #body>
      <p>{{ data }}</p>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const { data } = useDemoModal()
</script>
