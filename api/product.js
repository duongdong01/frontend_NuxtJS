import { valiQuery } from '@/assets/validators'
// eslint-disable-next-line arrow-parens
export default (axios) => ({
  addProduct (form) {
    return axios.post('/products', form)
  },
  searchProduct (datas) {
    const query = valiQuery(datas)
    return axios.get(`/products/?${query}`).then(_ => _.data)
  },
  getProductId (productId) {
    return axios.get(`/products/${productId}`)
  }
})
