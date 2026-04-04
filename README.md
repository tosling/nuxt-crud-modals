[![MIT License][license-src]][license-href]
[![NuxtModules][modules-src]][modules-href]

# Nuxt CRUD Modals

Nuxt CRUD Modals is a lightweight module designed to streamline the creation, viewing and editing of (database) records through modal interfaces in Nuxt applications. It provides a simple and consistent way to handle CRUD-related UI patterns without repetitive boilerplate.

Built on top of Nuxt UI’s modal system, it leverages `UModal` and `useOverlay` under the hood to deliver a flexible and extensible modal experience. The module abstracts common interaction patterns, allowing developers to quickly scaffold modals for different record types while maintaining full control over behavior and presentation.

Whether you're building admin panels, dashboards or data-driven applications, Nuxt CRUD Modals module helps you reduce complexity and focus on your business logic by handling the modal lifecycle, state management and integration patterns for you.

## Features

- Open, view or edit modals based on record ID
- Loading overlay for long running data fetching operations
- `<UFormModal>` component for creating and editing data records
- Coming soon: delete modals

## Peer Dependencies

Requires Nuxt UI and Zod 4

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxt module add nuxt-crud-modals
```

That's it! You can now use CRUD Modals in your Nuxt app

## Options

```ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui', 'nuxt-crud-modals'],
  
  //...

  modals: {
    loadingDelay: 700, // hides the loading overlay for 700 ms
    prefix: 'U', // prefix for the components, e.g. UFormModal
  },
})
```

## Usage

First, define a modal for your specific record type. You configure which components should be used for creating, editing, and viewing records, and optionally provide a data-fetching function:

```ts
import JobForm from '~/components/JobForm.vue'
import JobView from '~/components/Job.vue'

export const useJobModal = defineCrudModals({
  components: {
    create: JobForm,
    edit: JobForm,
    view: JobView
  },
  fetchData: async (id) => {
    // your data fetching logic
    return {
      id,
      title: 'Sample job',
      status: 'In progress',
      comment: 'Additional briefing needed'
    }
  }
})
```

### Open modal to edit a record
To open the modal in edit mode, call `openToEdit` with the record ID:

```ts
const jobModal = useJobModal()
jobModal.openToEdit(123)
```

### Open modal with initial state to create a new record
To create a new record, use `openToCreate`. You can optionally pass an initial state:

```ts
const jobModal = useJobModal()
jobModal.openToCreate({ status: 'New' })
```

This will open the modal providing the initial state in the modal to prefill the form.

## Local development

```bash
# Install dependencies
npm install
  
# Generate type stubs
npm run dev:prepare
  
# Develop with the playground
npm run dev
  
# Build the playground
npm run dev:build
  
# Run ESLint
npm run lint
  
# Run Vitest
npm run test
npm run test:watch
  
# Release new version
npm run release
```

[license-src]: https://img.shields.io/github/license/tosling/nuxt-crud-modals
[license-href]: ./LICENSE

[modules-src]: https://img.shields.io/badge/Nuxt%20Module-gray?logo=nuxt
[modules-href]: https://nuxt.com/modules