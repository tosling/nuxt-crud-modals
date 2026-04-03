<template>
  <UFormModal
    title="Test Form"
    description="Test on Playground"
    :schema="schema"
    :initial-state="initialState"
    @submit="submit"
  >
    <template #fields="{ state }">
      <UFormField
        label="Title"
        name="title"
        required
      >
        <UInput
          v-model="state.title"
          class="w-full"
        />
      </UFormField>

      <UFormField
        label="Status"
        name="status"
        required
      >
        <USelect
          v-model="state.status"
          :items="steps"
          class="w-full"
        />
      </UFormField>

      <UFormField
        label="Comment"
        name="comment"
        required
      >
        <UInput
          v-model="state.comment"
          class="w-full"
        />
      </UFormField>
    </template>
  </UFormModal>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const { data } = useTestModal()

const steps = ref(['New', 'In Progress', 'Done'])

const schema = z
  .object({
    title: z.string(),
    status: z.string(),
    comment: z.string(),
  })

export type Schema = z.infer<typeof schema>

const initialState = computed(() => ({
  title: data.value?.title || '',
  status: data.value?.status || 'New',
  comment: data.value?.comment || '' }))

async function submit(event: FormSubmitEvent<Schema>) {
  console.log('Submit:', event.data)
}
</script>
