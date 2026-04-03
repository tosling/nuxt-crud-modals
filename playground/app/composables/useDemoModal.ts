import DemoModal from '~/components/DemoModal.vue'

export const useDemoModal = defineCrudModals({
  components: { create: DemoModal, read: DemoModal, update: DemoModal },
  fetchData: async (id) => {
    // delay for testing
    await new Promise(r => setTimeout(r, 2000))
    return { id, data: 'Demo data' }
  },
})
