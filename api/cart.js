// eslint-disable-next-line arrow-parens
export default (axios) => ({
  getCarts (userId) {
    return axios.get(`/carts/${userId}`)
  },
  addToCart (cartItem) {
    return axios.post('/carts', cartItem)
  }
})
