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
    <!-- <Product :detail="true" :product="product" /> -->
    <div class="px-8 flex sm:flex-row flex-col  gap-6 lg:my-10 my-5">
      <div class="img_detail mx-auto">
        <Carousel :img="product.images" class="cursor-move" />
      </div>
      <div class="flex flex-col space-y-5 pl-4">
        <h2 class="text-black font-medium text-2xl">
          {{ product.name }} <span class="text-black text-[1rem]"><i class="far fa-eye ml-2" /> {{ product.view }} views</span>
        </h2>
        <p class="text-black font-medium text-[1rem]">
          <a-rate v-model="product.rating" disabled allow-half />  (Rating {{ product.rating }}/5)
        </p>
        <p class="text-black font-medium text-2xl">
          ${{ product.price }} <span class="text-orange line-through ml-2">${{ product.price*1.2 }}</span>
        </p>
        <p class="des_detail  text-[1rem] font-normal">
          {{ product.description }}
        </p>
        <div class="flex flex-col">
          <p class="text-black font-medium text-[1rem] mb-2">
            Size
          </p>
          <div>
            <a-radio-group v-model="value" class="space-x-2" @change="onChangeRadio">
              <a-radio-button value="L">
                L
              </a-radio-button>
              <a-radio-button value="M">
                M
              </a-radio-button>
              <a-radio-button value="S">
                S
              </a-radio-button>
            </a-radio-group>
            <p v-if="value!=''" class="pt-2 text-black">
              {{ number }} products available
            </p>
          </div>
        </div>
        <div class="flex flex-col">
          <p class="text-black font-medium text-[1rem] mb-2">
            Number
          </p>
          <a-input-number v-model="valueNumber" :min="1" :max="number > 0? number : 1" @change="onChange" />
        </div>
        <div class="flex cursor-pointer">
          <i class="fa-regular hover_item fa-heart lg:text-xl text-lg text-black transition-all hover:text-orange" />
          <p class="text-black font-medium text-[1rem] ml-2">
            Add To Wishlist
          </p>
        </div>
        <button class="bg-black text-white font-medium w-32 py-2 px-1 transition-all hover:opacity-80" @click="addToCart">
          ADD TO CART
        </button>
      </div>
    </div>
    <Comment class="my-10 px-12" />
  </div>
</template>

<script>
// import Product from '@/components/Products.vue'
import Carousel from '@/components/carousel/Carousel.vue'
import Comment from '@/components/comment/Comment.vue'
// import RadioSize from '@/components/radio/Radio.vue'
export default {
  name: 'ProductDetailId',

  components: {
    // Product
    Carousel, Comment
  },
  data () {
    return {
      product: {},
      selected: 1,
      quantityArray: [],
      value: '',
      number: 0,
      valueNumber: 1
    }
  },
  computed: {
    // isAddedBtn () {
    //   return this.product.isAddedBtn
    // }
    // images () {
    //   console.log('img', this.$route.params.images)
    //   return this.$route.params.images
    // },
    // product () {
    //   console.log(this.$route.params)
    //   return this.$route.params
    // }
  },
  mounted () {
    this.productId()
  },

  methods: {
    addToCart () {
      if (!this.value) {
        alert('vui long chon Size')
      }
    },
    onChangeRadio (e) {
      console.log(`checked = ${e.target.value}`)
      // eslint-disable-next-line eqeqeq
      if (e.target.value == 'L') {
        const sizes = [...this.product.size]
        sizes.forEach((size) => {
          if (size.name.toUpperCase() === 'L') {
            this.number = size.numberInStock
          }
        })
      }

      // eslint-disable-next-line eqeqeq
      if (e.target.value == 'M') {
        const sizes = [...this.product.size]
        sizes.forEach((size) => {
          if (size.name.toUpperCase() === 'M') {
            this.number = size.numberInStock
          }
        })
      }
      // eslint-disable-next-line eqeqeq
      if (e.target.value == 'S') {
        const sizes = [...this.product.size]
        sizes.forEach((size) => {
          if (size.name.toUpperCase() === 'S') {
            this.number = size.numberInStock
          }
        })
      }
    },
    onChange (value) {
      console.log('changed', value)
      console.log('valueNumber', this.valueNumber)
    },
    async productId () {
      const restData = await this.$api.product.getProductId(this.$route.params.id)
      console.log(restData.data.result)
      this.product = { ...restData.data.result }
      // console.log(this.product.images)
    }
    // addToCart (id) {
    //   const data = {
    //     id,
    //     status: true
    //   }
    //   this.$store.commit('addToCart', id)
    //   this.$store.commit('setAddedBtn', data)
    // },
    // removeFromCart (id) {
    //   const data = {
    //     id,
    //     status: false
    //   }
    //   this.$store.commit('removeFromCart', id)
    //   this.$store.commit('setAddedBtn', data)
    // },
    // onSelectQuantity (id) {
    //   const data = {
    //     id,
    //     quantity: this.selected
    //   }
    //   this.$store.commit('quantity', data)
    // },
    // saveToFavorite (id) {
    //   const isUserLogged = this.$store.state.userInfo.isLoggedIn

    //   if (isUserLogged) {
    //     this.$store.commit('addToFavourite', id)
    //   } else {
    //     this.$store.commit('showLoginModal', true)
    //   }
    // },
    // removeFromFavourite (id) {
    //   this.$store.commit('removeFromFavourite', id)
    // }
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
.ant-input-number {
  margin-right: 10px;
}
.ant-radio-button-wrapper{
        @apply px-5
      }
.ant-radio-button-wrapper:last-child{
        @apply rounded-none;
    }
.ant-radio-button-wrapper:first-child{
        @apply rounded-none;
    }
</style>
