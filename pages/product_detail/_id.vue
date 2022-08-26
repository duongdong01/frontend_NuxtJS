<template>
  <div class="flex flex-col">
    <header class="banner_single mb-10">
      <div class="flex justify-center absolute items-center w-full flex-col">
        <h2 class="text-white text-3xl font-semibold">
          Shop
        </h2>
        <span class="text-orange text-lg">
          <nuxt-link tag="span" class="text-white text-lg cursor-pointer" to="/">
            Home
          </nuxt-link>
          / Product Single
        </span>
      </div>
    </header>
    <Product :detail="true" :product="product" />
  </div>
</template>

<script>
import Product from '@/components/Products.vue'
export default {
  name: 'ProductDetailId',

  components: {
    Product
  },

  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },

  data () {
    return {
      product: {},
      selected: 1,
      quantityArray: []
    }
  },

  computed: {
    isAddedBtn () {
      return this.product.isAddedBtn
    }
  },

  mounted () {
    this.product = this.$store.getters.getProductById(this.$route.params.id)
    this.selected = this.product.quantity

    for (let i = 1; i <= 20; i++) {
      this.quantityArray.push(i)
    }
  },

  methods: {
    addToCart (id) {
      const data = {
        id,
        status: true
      }
      this.$store.commit('addToCart', id)
      this.$store.commit('setAddedBtn', data)
    },
    removeFromCart (id) {
      const data = {
        id,
        status: false
      }
      this.$store.commit('removeFromCart', id)
      this.$store.commit('setAddedBtn', data)
    },
    onSelectQuantity (id) {
      const data = {
        id,
        quantity: this.selected
      }
      this.$store.commit('quantity', data)
    },
    saveToFavorite (id) {
      const isUserLogged = this.$store.state.userInfo.isLoggedIn

      if (isUserLogged) {
        this.$store.commit('addToFavourite', id)
      } else {
        this.$store.commit('showLoginModal', true)
      }
    },
    removeFromFavourite (id) {
      this.$store.commit('removeFromFavourite', id)
    }
  }
}
</script>

<style lang="scss">
.banner_single{
  background-image: url('@/static/banner/banner_single.png');
  position: relative;
  background-repeat: no-repeat;
  background-size: cover cover;
  padding: 100px 0 140px 0;
  width: 100%;
}
</style>
