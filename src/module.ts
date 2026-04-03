import {
  defineNuxtModule,
  addImports,
  addComponentsDir,
  createResolver,
} from '@nuxt/kit'

import { defu } from 'defu'

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    modals: {
      loadingDelay: number
    }
  }
}

// Module options TypeScript interface definition
export interface ModuleOptions {
  loadingDelay: number
  prefix: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-crud-modals',
    configKey: 'modals',
    compatibility: {
      nuxt: '>=4.0.0',
    },
  },

  // default configuration options of the module
  defaults: {
    prefix: 'U',
    loadingDelay: 500, // ms
  },

  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // public runtimeConfig
    nuxt.options.runtimeConfig.public.modals = defu(
      nuxt.options.runtimeConfig.public.modals,
      {
        loadingDelay: options.loadingDelay,
      },
    )

    // add components
    addComponentsDir({
      path: resolve('runtime/app/components'),
      prefix: options.prefix,
    })

    // add loading composable
    addImports({
      name: 'useLoadingOverlay',
      from: resolve('runtime/app/composables/useLoadingOverlay'),
    })

    // add factory util
    addImports({
      name: 'defineCrudModals',
      from: resolve('runtime/app/utils/modalFactory'),
    })
  },
})
