export const jobs = [ { id: '1', title: 'Test Job' } ]

export default {
  get: () => Promise.resolve({
    data: {
      data: jobs,
      // data: [ { id: '1' } ],
      len: 1
    }
  })
}
