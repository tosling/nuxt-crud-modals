<template>
  <UApp>
    <ULoadingOverlay />

    <div class="p-4 space-y-4">
      <p class="space-x-4">
        <UButton
          label="Create with Status: New"
          @click="test.openToCreate({ status: 'New' })"
        />
        <UButton
          label="Create with Status: Done"
          @click="test.openToCreate({ status: 'Done' })"
        />
        <UButton
          label="View Entity"
          @click="test.openToRead('123')"
        />
        <UButton
          label="Update Form"
          @click="test.openToUpdate('233')"
        />
      </p>

      <p class="space-x-4">
        <UButton
          label="Demo Create"
          @click="demo.openToCreate({ message: 'No id on create' })"
        />
        <UButton
          label="Demo Read"
          @click="demo.openToRead('789')"
        />
        <UButton
          label="Demo Update"
          @click="demo.openToUpdate('899')"
        />
      </p>
    </div>
  </UApp>
</template>

<script setup>
const demo = useDemoModal()
const test = useTestModal()
</script>
