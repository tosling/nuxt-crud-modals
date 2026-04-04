import { createError } from '#app'
import { useLoadingOverlay } from '#imports'
import { useOverlay } from '@nuxt/ui/runtime/composables/useOverlay.js'
import { useToast } from '@nuxt/ui/runtime/composables/useToast.js'
import { ref, type Component } from 'vue'

type BaseRecord = { id: string | number }
type CrudModalMode = 'create' | 'read' | 'update'
export type CrudModalResult = { success: boolean }

type CrudModalConfig<TRecord extends BaseRecord> = {
  components: Partial<Record<CrudModalMode, Component>>
  fetchData?: (id: TRecord['id']) => Promise<TRecord>
}

type CrudModalPayload<TRecord extends BaseRecord,
  TMode extends CrudModalMode>
  = TMode extends 'create'
    ? { initialState?: Partial<TRecord> } & { id?: never } // id forbidden
    : { id: TRecord['id'] }

export function defineCrudModals<TRecord extends BaseRecord>(
  config: CrudModalConfig<TRecord>,
) {
  const overlay = useOverlay()
  const data = ref<TRecord | null>(null)
  const error = ref<string | null>(null)
  const isLoading = ref(false)
  const isOpen = ref(false)

  function resolveComponent(mode: CrudModalMode) {
    if (!config.components[mode])
      throw createError({
        status: 500,
        statusText: `No component registered for modal mode '${mode}'`,
      })

    return config.components[mode]
  }

  async function fetchData(id: TRecord['id']) {
    if (!config.fetchData) return

    setLoading(true)

    try {
      data.value = await config.fetchData(id)
    }
    catch (err) {
      const toast = useToast()
      toast.add({
        title: 'Failed to fetch record',
        description: err instanceof Error ? err.message : 'Unknown error',
        color: 'error',
      })
    }
    finally {
      setLoading(false)
    }
  }

  async function open<TMode extends CrudModalMode>(
    mode: TMode,
    payload: CrudModalPayload<TRecord, TMode>,
  ): Promise<CrudModalResult | undefined> {
    reset()

    const component = resolveComponent(mode)

    if (mode !== 'create') {
      const { id } = payload as { id: TRecord['id'] }
      if (!id) throw new Error(`Mode '${mode}' requires an id`)

      await fetchData(id)
      if (!data.value) return
    }
    else if (mode === 'create') {
      const { initialState } = payload as { initialState: Partial<TRecord> }
      data.value = initialState
    }

    isOpen.value = true
    const promise = overlay.create(component).open({ mode, ...payload })
    promise.finally(() => (isOpen.value = false))
    return promise
  }

  function openToRead(id: TRecord['id']) {
    return open('read', { id })
  }

  function openToUpdate(id: TRecord['id']) {
    return open('update', { id })
  }

  function openToCreate(initialState?: Partial<TRecord>) {
    return open('create', { initialState })
  }

  async function refresh() {
    if (!data.value?.id) return
    return fetchData(data.value.id)
  }

  function reset() {
    data.value = null
    error.value = null
    isOpen.value = false
  }

  function setLoading(loading: boolean) {
    isLoading.value = loading

    // show loading overlay only if modal is not open yet
    if (!isOpen.value) {
      const loadingOverlay = useLoadingOverlay()
      if (loading) loadingOverlay.show()
      else loadingOverlay.hide()
    }
  }

  return () => ({
    data,
    error,
    isLoading,
    isOpen,
    openToCreate,
    openToRead,
    openToUpdate,
    refresh,
    reset,
  })
}
