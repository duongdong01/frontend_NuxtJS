export const state = () => ({
  products: [
    {
      id: 1,
      title: 'DAZY Two Tone Drop Shoulder Teddy Jacket',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 50,
      ratings: 3,
      reviews: 5,
      isAddedToCart: false,
      isAddedBtn: false,
      isFavourite: false,
      quantity: 1
    },
    {
      id: 2,
      title: 'Letter Graphic Colorblock Raglan Sleeve Tee',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 35,
      ratings: 5,
      reviews: 10,
      isAddedToCart: false,
      isAddedBtn: false,
      isFavourite: false,
      quantity: 1
    },
    {
      id: 3,
      title: 'Product 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 110,
      ratings: 2,
      reviews: 3,
      isAddedToCart: false,
      isAddedBtn: false,
      isFavourite: false,
      quantity: 1
    },
    {
      id: 4,
      title: 'Product 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 50,
      ratings: 1,
      reviews: 0,
      isAddedToCart: false,
      isAddedBtn: false,
      isFavourite: false,
      quantity: 1
    },
    {
      id: 5,
      title: 'Product 5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 35,
      ratings: 4,
      reviews: 2,
      isAddedToCart: false,
      isAddedBtn: false,
      isFavourite: false,
      quantity: 1
    },
    {
      id: 6,
      title: 'Product 6',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 110,
      ratings: 5,
      reviews: 1,
      isAddedToCart: false,
      isAddedBtn: false,
      isFavourite: false,
      quantity: 1
    },
    {
      id: 7,
      title: 'Product 7',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 50,
      ratings: 5,
      reviews: 7,
      isAddedToCart: false,
      isAddedBtn: false,
      isFavourite: false,
      quantity: 1
    },
    {
      id: 8,
      title: 'Product 8',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 35,
      ratings: 3,
      reviews: 0,
      isAddedToCart: false,
      isAddedBtn: false,
      isFavourite: false,
      quantity: 1
    }
  ],
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
  productsAdded: (state) => {
    return state.products.filter((el) => {
      return el.isAddedToCart
    })
  },
  productsAddedToFavourite: (state) => {
    return state.products.filter((el) => {
      return el.isFavourite
    })
  },
  getProductById: state => (id) => {
    // eslint-disable-next-line eqeqeq
    return state.products.find(product => product.id == id)
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
  },
  quantity: (state) => {
    return state.products.quantity
  }
}

export const mutations = {
  addToCart: (state, id) => {
    state.products.forEach((el) => {
      if (id === el.id) {
        el.isAddedToCart = true
      }
    })
  },
  setCart: (state, data) => {
    state.carts.push(...data)
  },
  resetCart: (state) => {
    state.carts = []
  },
  setAddedBtn: (state, data) => {
    state.products.forEach((el) => {
      if (data.id === el.id) {
        el.isAddedBtn = data.status
      }
    })
  },
  removeFromCart: (state, id) => {
    state.products.forEach((el) => {
      if (id === el.id) {
        el.isAddedToCart = false
      }
    })
  },
  removeProductsFromFavourite: (state) => {
    // eslint-disable-next-line array-callback-return
    state.products.filter((el) => {
      el.isFavourite = false
    })
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
  setHasUserSearched: (state, hasSearched) => {
    state.userInfo.hasSearched = hasSearched
  },
  setUserName: (state, name) => {
    state.userInfo.name = name
  },
  setProductTitleSearched: (state, titleSearched) => {
    state.userInfo.productTitleSearched = titleSearched
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
  },
  addToFavourite: (state, id) => {
    state.products.forEach((el) => {
      if (id === el.id) {
        el.isFavourite = true
      }
    })
  },
  removeFromFavourite: (state, id) => {
    state.products.forEach((el) => {
      if (id === el.id) {
        el.isFavourite = false
      }
    })
  },
  quantity: (state, data) => {
    state.products.forEach((el) => {
      if (data.id === el.id) {
        el.quantity = data.quantity
      }
    })
  },
  SET_USER (state, authUser) {
    state.authUser = authUser
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
