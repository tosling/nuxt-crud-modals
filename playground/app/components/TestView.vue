<template>
  <UModal
    title="Test View"
    description="Showing Test Data on Playground"
  >
    <template #body>
      <p>{{ data }}</p>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const { data } = useTestModal()
</script>
