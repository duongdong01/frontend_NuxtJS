// eslint-disable-next-line arrow-parens
export default (axios) => ({

  signin (email, password) {
    return axios.get('/users/signin', { email, password })
  }
  // signin: (email, password) => axios.post('/users/signin', { email, password })
})
