<template>
  <UModal v-model:open="open">
    <template #body>
      <UForm
        ref="form"
        class="space-y-4"
        :state="state"
        :schema="schema"
        @submit="submit"
      >
        <slot
          name="fields"
          :state="state"
        />

        <UAlert
          v-if="error"
          :description="error"
          variant="subtle"
          color="error"
          icon="i-lucide-triangle-alert"
        />

        <div class="flex flex-row-reverse gap-2">
          <slot name="buttons">
            <UButton
              type="submit"
              loading-auto
            >
              Submit
            </UButton>
          </slot>
        </div>
      </UForm>
    </template>
  </UModal>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import type { ZodType } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { reactive, ref, useTemplateRef, watch } from 'vue'
import type { CrudModalResult } from '../utils/modalFactory'

const props = defineProps<{
  schema: ZodType<T>
  initialState: T
  onSubmit: (event: FormSubmitEvent<T>) => void | Promise<void>
}>()

const emit = defineEmits<{
  close: [value: CrudModalResult]
}>()

const error = ref<string>()
const open = defineModel<boolean>('open')

const form = useTemplateRef('form')

const state = reactive<T>({ ...props.initialState })

function setError(message: string) {
  error.value = message
}

defineExpose({ setError })

async function submit(event: FormSubmitEvent<T>) {
  // close and error handling - parent needs only happy flow
  try {
    await props.onSubmit(event)
    emit('close', { success: true })
    open.value = false
  }
  catch (err: unknown) {
    error.value = 'Unknown error'

    if (err instanceof Error)
      error.value = err.message
  }
}

// reset initial state when form opened
watch(open, (newVal) => {
  if (newVal) {
    Object.assign(state, props.initialState)
    error.value = undefined
  }
})

// reset error when form changed again
watch(
  () => form.value?.dirty,
  (newVal) => {
    if (newVal) {
      error.value = undefined
    }
  },
)
</script>
