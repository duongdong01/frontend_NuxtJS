<template>
  <div :class="[ openModal ? 'fixed flex' : 'hidden', 'modal-checkout' ]">
    <div class="modal-background" @click="closeModal(false)" />
    <div class="modal-wrapper-checkout modal-animation-close">
      <div class="bg-white flex items-center justify-between  p-5">
        <p class="text-xl font-semibold">
          {{ modalTitle }}
        </p>
        <button class="delete bg-[#efefef] w-10 h-10 rounded-[50%] " aria-label="close" @click="closeModal(false)">
          <i class="fa-regular fa-xmark text-[1.5rem] font-semibold" />
        </button>
      </div>
      <div class="overflow-y-auto h-[85vh]">
        <section class="p-5 rounded-b-2xl">
          <div v-if="!isCheckoutSection">
            <div v-for="product in products" :key="product.id" class="box">
              <div class="flex">
                <div class="w-24">
                  <img src="https://bulma.io/images/placeholders/1280x960.png" alt="photo">
                </div>
                <div class="flex flex-col justify-center pl-2 font-semibold">
                  <p>{{ product.title }}  </p>
                  <p>{{ product.quantity > 0 ? `${product.quantity}` : '' }} X {{ product.price }}$</p>
                </div>
              </div>
              <div class="flex justify-center items-center">
                <i class="fa-regular fa-trash-can text-red cursor-pointer text-lg mr-[10px]" @click="removeFromCart(product.id)" />
              </div>
              <!-- <button class="rounded-xl p-3 text-white bg-red" @click="removeFromCart(product.id)">
                {{ removeLabel }}
              </button> -->
            </div>
            <div v-if="products.length === 0">
              <p>{{ cartEmptyLabel }}</p>
            </div>
          </div>
          <div v-if="isCheckoutSection">
            <p>You bought it :-)</p>
          </div>
        </section>
        <div class="m-4">
          <button v-show="products.length > 0 && !isCheckoutSection" class="rounded-xl p-3 bg-blue text-white w-full" @click="onNextBtn">
            {{ buyLabel }}
          </button>
          <button v-if="isCheckoutSection" class="rounded-xl p-3 bg-blue text-white w-full" @click="closeModal(true)">
            {{ closeLabel }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkout',

  data () {
    return {
      modalTitle: 'Shopping Cart',
      removeLabel: 'Remove from cart',
      cartEmptyLabel: 'Your cart is empty',
      closeLabel: 'Close',
      isCheckoutSection: false
    }
  },

  computed: {
    products () {
      return this.$store.getters.productsAdded
    },
    openModal () {
      if (this.$store.getters.isCheckoutModalOpen) {
        return true
      } else {
        return false
      }
    },
    buyLabel () {
      const totalProducts = this.products.length
      const productsAdded = this.$store.getters.productsAdded
      const pricesArray = []
      let productLabel = ''
      let finalPrice = ''
      let quantity = 1

      productsAdded.forEach((product) => {
        if (product.quantity >= 1) {
          quantity = product.quantity
        }

        pricesArray.push((product.price * quantity)) // get the price of every product added and multiply quantity
      })

      finalPrice = pricesArray.reduce((a, b) => a + b, 0) // sum the prices

      if (totalProducts > 1) { // set plural or singular
        productLabel = 'products'
      } else {
        productLabel = 'product'
      }
      return `Buy ${totalProducts} ${productLabel} at ${finalPrice}$`
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    }
  },

  methods: {
    closeModal (reloadPage) {
      this.$store.commit('showCheckoutModal', false)

      if (reloadPage) {
        window.location.reload()
      }
    },
    removeFromCart (id) {
      const data = {
        id,
        status: false
      }
      this.$store.commit('removeFromCart', id)
      this.$store.commit('setAddedBtn', data)
    },
    onNextBtn () {
      if (this.isUserLoggedIn) {
        this.isCheckoutSection = true
      } else {
        this.$store.commit('showCheckoutModal', false)
        this.$store.commit('showLoginModal', true)
      }
    },
    onPrevBtn () {
      this.isCheckoutSection = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .box {
    @apply flex;
    @apply justify-between;
    @apply mb-3;
  }
</style>
