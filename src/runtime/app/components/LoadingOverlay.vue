<template>
  <Teleport to="body">
    <Transition
      appear
      enter-active-class="transition-opacity duration-150 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="state.isActive && state.blocking"
        class="fixed inset-0 z-100 flex items-center justify-center cursor-progress"
        :class="{
          'bg-elevated/75': state.backdrop,
        }"
      >
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-200 ease-in"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="state.isVisible"
            class="bg-default rounded-lg shadow-lg ring ring-default p-4 sm:p-6 flex flex-col items-center gap-2 min-w-30"
          >
            <UIcon
              name="i-lucide-loader-circle"
              class="size-8 text-primary animate-spin"
            />
            <span
              v-if="state.label"
              class="text-sm text-muted font-medium"
            >
              {{ state.label }}
            </span>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useLoadingOverlay } from '../composables/useLoadingOverlay'

const { state } = useLoadingOverlay()
</script>
