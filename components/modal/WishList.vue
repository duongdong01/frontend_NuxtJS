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
          <div>
            <div v-for="product in productsInWishlist" :key="product.id" class="box">
              <div class="flex">
                <div class="w-24">
                  <img src="https://bulma.io/images/placeholders/1280x960.png" alt="photo">
                </div>
                <div class="flex flex-col justify-center pl-2 font-semibold">
                  <p>{{ product.title }}  </p>
                </div>
              </div>
              <div class="flex justify-center items-center">
                <i class="fa-regular fa-trash-can text-red cursor-pointer text-lg mr-[10px]" @click="removeFromFavourite(product.id)" />
              </div>
              <!-- <button class="rounded-xl p-3 text-white bg-red" @click="removeFromCart(product.id)">
                {{ removeLabel }}
              </button> -->
            </div>
            <!-- <div v-if="productsInWishlist.length === 0">
              <p>{{ wishEmptyLabel }}</p>
            </div> -->
          </div>
        </section>
        <div class="m-4">
          <!-- <button v-show="productsInWishlist.length > 0 && !isCheckoutSection" class="rounded-xl p-3 bg-blue text-white w-full">
            View Wishlish
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getByTitle } from '@/assets/filters'
export default {
  name: 'WishLish',

  data () {
    return {
      modalTitle: 'Wishlist',
      removeLabel: 'Remove from cart',
      wishEmptyLabel: 'Your wish list is empty',
      closeLabel: 'Close',
      isCheckoutSection: false
    }
  },

  computed: {
    products () {
      return this.$store.getters.productsAdded
    },
    openModal () {
      if (this.$store.getters.isWishlistModalOpen) {
        return true
      } else {
        return false
      }
    },
    productsInWishlist () {
      if (this.$store.state.userInfo.hasSearched) {
        return this.getProductByTitle()
      } else {
        return this.$store.getters.productsAddedToFavourite
      }
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    }
  },

  methods: {
    closeModal (reloadPage) {
      this.$store.commit('showWishlistModal', false)

      if (reloadPage) {
        window.location.reload()
      }
    },
    removeFromFavourite (id) {
      this.$store.commit('removeFromFavourite', id)
    },
    getProductByTitle () {
      const {
        getters: {
          productsAddedToFavourite
        },
        state: {
          userInfo: {
            productTitleSearched
          }
        }
      } = this.$store
      // eslint-disable-next-line no-return-assign
      return this.productsFiltered = getByTitle(productsAddedToFavourite, productTitleSearched)
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
