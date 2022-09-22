export const state = () => ({
  carts: [],
  userInfo: {
    isLoggedIn: false,
    isSignedUp: false,
    isAdmin: false,
    hasSearched: false,
    name: '',
    productTitleSearched: ''
  },
  systemInfo: {
    openLoginModal: false,
    openSignupModal: false,
    openCheckoutModal: false,
    openWishlistModal: false,
    openSearchModal: false
  }
})

export const getters = {
  carts: (state) => {
    return state.carts
  },
  isAdmin: (state) => {
    return state.userInfo.isAdmin
  },
  isUserLoggedIn: (state) => {
    return state.userInfo.isLoggedIn
  },
  isUserSignedUp: (state) => {
    return state.userInfo.isSignedUp
  },
  getUserName: (state) => {
    return state.userInfo.name
  },
  isLoginModalOpen: (state) => {
    return state.systemInfo.openLoginModal
  },
  isSignupModalOpen: (state) => {
    return state.systemInfo.openSignupModal
  },
  isCheckoutModalOpen: (state) => {
    return state.systemInfo.openCheckoutModal
  },
  isWishlistModalOpen: (state) => {
    return state.systemInfo.openWishlistModal
  },
  isSearchModalOpen: (state) => {
    return state.systemInfo.openSearchModal
  }
}

export const mutations = {
  setCart: (state, data) => {
    state.carts.push(...data)
  },
  resetCart: (state) => {
    state.carts = []
  },
  isUserLoggedIn: (state, isUserLoggedIn) => {
    state.userInfo.isLoggedIn = isUserLoggedIn
  },
  isAdmin: (state, isAdmin) => {
    state.userInfo.isAdmin = isAdmin
  },
  isUserSignedUp: (state, isSignedUp) => {
    state.userInfo.isSignedUp = isSignedUp
  },
  setUserName: (state, name) => {
    state.userInfo.name = name
  },
  showLoginModal: (state, show) => {
    state.systemInfo.openLoginModal = show
  },
  showSignupModal: (state, show) => {
    state.systemInfo.openSignupModal = show
  },
  showCheckoutModal: (state, show) => {
    state.systemInfo.openCheckoutModal = show
  },
  showWishlistModal: (state, show) => {
    state.systemInfo.openWishlistModal = show
  },
  showSearchModal: (state, show) => {
    state.systemInfo.openSearchModal = show
  }
}

export const actions = {
  // async nuxtServerInit({ commit }) {
  //   const res = await this.$axios.get("/api/current_user")
  //   commit("SET_USER", res.data)
  // },

  // async logout({ commit }) {
  //   const { data } = await this.$axios.get("/api/logout")
  //   if (data.ok) commit("SET_USER", null)
  // },

  // async handleToken({ commit }, token) {
  //   const res = await this.$axios.post("/api/stripe", token)
  //   commit("SET_USER", res.data)
  // }
  async dataCart ({ commit }) {
    commit('resetCart')
    const token = localStorage.getItem('token')
    const userData = await this.$api.auth.secret(token)
    const dataCart = await this.$api.cart.getCarts(userData.data._id)
    commit('setCart', dataCart.data.carts)
    console.log(dataCart.data.carts)
  }

}
