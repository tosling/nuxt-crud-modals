import TestForm from '~/components/TestForm.vue'
import TestView from '~/components/TestView.vue'

export const useTestModal = defineCrudModals({
  components: { create: TestForm, read: TestView, update: TestForm },
  fetchData: async (id) => {
    // delay for testing
    await new Promise(r => setTimeout(r, 1500))
    return { id, title: 'Basic test', status: 'In Progress', comment: 'More information needed' }
  },
})
