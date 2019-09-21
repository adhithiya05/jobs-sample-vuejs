import { createLocalVue, mount } from '@vue/test-utils'
import JobsTable from '@/components/JobsTable.vue'

import BootstrapVue from 'bootstrap-vue'

import { jobs } from './__mocks__/axios'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe('JobsTable.vue', () => {
  const wrapper = mount(JobsTable, {
    localVue
  })

  it('returns jobs array when getJobs method is called', done => {

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.getJobs).toBe(jobs)
      done()
    })
  })
})
