// eslint-disable-next-line arrow-parens
export default (axios) => ({
  getComments (productId) {
    return axios.get(`/comments/${productId}`).then(_ => _.data)
  },
  addComment (comments) {
    return axios.post('/comments', comments)
  }
})
