import { useRuntimeConfig, useState } from '#app'
import { readonly } from 'vue'

let timer: ReturnType<typeof setTimeout> | null = null

export const useLoadingOverlay = () => {
  const config = useRuntimeConfig()

  const loadingDelay = config.public.modals.loadingDelay

  const state = useState<{
    isActive: boolean
    isVisible: boolean
    backdrop: boolean
    blocking: boolean
    delay: number
    label: string | null
  }>('loading-overlay', () => ({
    isActive: false,
    isVisible: false,
    backdrop: false,
    blocking: true,
    delay: loadingDelay,
    label: 'Loading...',
  }))

  function show(options?: {
    backdrop?: boolean
    blocking?: boolean
    delay?: number
    label?: string | null
  }) {
    state.value.backdrop = options?.backdrop === true ? true : false
    state.value.blocking = options?.blocking === false ? false : true
    state.value.delay = options?.delay ?? loadingDelay
    state.value.label = options?.label === null ? null : 'Loading...'

    state.value.isActive = true
    timer = setTimeout(() => (state.value.isVisible = true), state.value.delay)
  }

  function hide() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    state.value.isActive = false
    state.value.isVisible = false
  }

  return {
    state: readonly(state),
    show,
    hide,
  }
}
