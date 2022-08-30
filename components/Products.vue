<template>
  <div :class="[detail ? 'detail' : '']" class="rounded-2xl shadow-xl shadow-slate-300/60">
    <div class="img-wrapper rounded-t-2xl overflow-hidden relative thumb">
      <nuxt-link
        :to="{
          name: 'product_detail-id',
          params: {
            id: product.id,
            title: product.title,
            price: product.price,
            rating: product.ratings,
            reviews: product.reviews,
            isAddedBtn: product.isAddedBtn
          }
        }"
      >
        <div class="overflow-hidden relative">
          <img class="rounded-t-2xl img_show1" src="@/static/img_demo.png" alt="Placeholder image">
          <img class="rounded-t-2xl img_show2 absolute top-0 opacity-0" src="@/static/img_demo2.png" alt="Placeholder image">
        </div>

        <!-- <div v-show="product.isFavourite" class="button text-lg absolute top-0 w-8 h-8 bg-white" :title="removeFromFavouriteLabel" @click="removeFromFavourite(product.id)">
          <span class="icon">
            <i class="fas fa-heart" />
          </span>
        </div> -->
      </nuxt-link>
      <div class="m-4 icon_product top-0" :title="addToFavouriteLabel" @click="saveToFavorite(product.id)">
        <span class="icon">
          <i class="far fa-heart" />
        </span>
      </div>
      <div class=" icon_product  mx-4 top-16 my-1 item_hover" :title="quickView" @click="showQuickView">
        <i class="fa-solid fa-expand" />
      </div>
      <div class=" icon_product  mx-4 top-28 my-2 item_hover" title="100 views">
        <i class="far fa-eye" />
      </div>
      <div class="absolute w-full bottom-20 flex justify-center item_hover">
        <button class="rounded-md py-3 px-2 w-2/3 bg-white  hover:text-[#ff7004] transition-all text-black font-bold" @click="addToCart(product.id)">
          {{ addToCartLabel }}
        </button>
      </div>
      <div class="flex justify-center p-2 cursor-pointer">
        <nuxt-link
          class="text-[1rem] w-full font-normal"
          :to="{
            name: 'product_detail-id',
            params: {
              id: product.id,
              title: product.title,
              price: product.price,
              rating: product.ratings,
              reviews: product.reviews,
              isAddedBtn: product.isAddedBtn
            }
          }"
        >
          <div class="text-black flex justify-center font-semibold hover:text-[#ff7004] transition-all ease-in delay-150">
            <p>
              {{ product.title }} bla bla
            </p>
          </div>
          <div class="flex justify-center font-semibold text-black items-center">
            <p>
              ${{ product.price }}
            </p>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="text-wrapper  cursor-pointer" />
    <!-- <div class="text-wrapper p-4">
      <div class="flex items-center justify-between mb-3 relative">
        <div class="media-content">
          <nuxt-link
            :to="{
              name: 'product_detail-id',
              params: {
                id: product.id,
                title: product.title,
                price: product.price,
                rating: product.ratings,
                reviews: product.reviews,
                isAddedBtn: product.isAddedBtn
              }
            }"
          >
            <span :class="[detail ? 'text-3xl' : 'text-lg']">{{ product.title }}</span>
          </nuxt-link>
        </div>
        <div class="absolute">
          <button v-show="product.isFavourite" class="button text-lg" :title="removeFromFavouriteLabel" @click="removeFromFavourite(product.id)">
            <span class="icon">
              <i class="fas fa-heart" />
            </span>
          </button>
          <button v-show="!product.isFavourite" class="button text-lg" :title="addToFavouriteLabel" @click="saveToFavorite(product.id)">
            <span class="icon">
              <i class="far fa-heart" />
            </span>
          </button>
        </div>
      </div>
      <div class="content is-clearfix">
        <p :class="[detail ? 'text-2xl' : 'text-base text-black']">
          {{ product.description }}
        </p>
        <div class="flex justify-between">
          <div class="flex items-center">
            <i v-if="product.ratings === 1" class="fa fa-star" />
            <i v-if="product.ratings === 2" class="fa fa-star" />
            <i v-if="product.ratings === 2" class="fa fa-star" />
            <i v-if="product.ratings === 3" class="fa fa-star" />
            <i v-if="product.ratings === 3" class="fa fa-star" />
            <i v-if="product.ratings === 3" class="fa fa-star" />
            <i v-if="product.ratings === 4" class="fa fa-star" />
            <i v-if="product.ratings === 4" class="fa fa-star" />
            <i v-if="product.ratings === 4" class="fa fa-star" />
            <i v-if="product.ratings === 4" class="fa fa-star" />
            <i v-if="product.ratings === 5" class="fa fa-star" />
            <i v-if="product.ratings === 5" class="fa fa-star" />
            <i v-if="product.ratings === 5" class="fa fa-star" />
            <i v-if="product.ratings === 5" class="fa fa-star" />
            <i v-if="product.ratings === 5" class="fa fa-star" />
            <p class="ml-2 text-lg">
              {{ product.reviews > 0 ? `${product.reviews} Reviews` : 'No reviews' }}
            </p>
          </div>
          <p class="text-3xl font-medium">
            <strong>${{ product.price }}</strong>
          </p>
        </div>
        <div class="flex justify-between mt-5 items-center">
          <a-input-number
            v-if="detail"
            v-model="selected"
            :min="1"
            :max="100"
            :step="1"
            @change="onSelectQuantity(product.id)"
          />
          <button class="rounded-xl p-3 bg-blue text-white" @click="addToCart(product.id)">
            {{ addToCartLabel }}
          </button>
        </div>
      </div>
    </div> -->
    <quick-view ref="quickModal" />
  </div>
</template>

<script>
import QuickView from '@/components/modal/QuickView.vue'
export default {
  name: 'Products',
  components: {
    QuickView
  },
  props: ['product', 'detail'],
  data () {
    return {
      addToCartLabel: 'Add To Cart',
      viewDetailsLabel: 'Details',
      removeFromCartLabel: 'Remove from cart',
      addToFavouriteLabel: 'Add to favourite',
      removeFromFavouriteLabel: 'Remove from favourite',
      selected: 1,
      quickView: 'Quick view'
      // quantityArray: []
    }
  },

  computed: {
    isUserLogged () {
      return this.$store.getters.isUserLoggedIn
    }
  },

  mounted () {
    // for (let i = 1; i <= 20; i++) {
    //   this.quantityArray.push(i)
    // }

    if (this.$props.product.quantity > 1) {
      this.selected = this.$props.product.quantity
    }
  },

  methods: {
    showQuickView () {
      this.$refs.quickModal.showModal()
    },
    addToCart (id) {
      if (this.isUserLogged) {
        const data = {
          id,
          status: true
        }
        this.$store.commit('addToCart', id)
        this.$store.commit('setAddedBtn', data)
      } else {
        this.$store.commit('showLoginModal', true)
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
    },
    onSelectQuantity (id) {
      const data = {
        id,
        quantity: this.selected
      }
      this.$store.commit('quantity', data)
    }
    // onChange (value) {
    //   console.log(value)
    //   this.selected = value
    // }
  }
}
</script>

<style lang="scss" scoped>
  .detail {
    @apply flex;
    @apply flex-col;
    @apply lg:flex-row;
    @apply m-5;
    @apply shadow-2xl;

    .img-wrapper {
      flex: 1;

      img {
        @apply lg:rounded-none;
        @apply lg:rounded-tl-2xl;
        @apply lg:rounded-bl-2xl;
      }
    }

    .text-wrapper {
      flex: 2;
    }

  }
   .icon_product{
      @apply  text-lg absolute  w-10 h-10 bg-white rounded-full cursor-pointer flex justify-center items-center right-0;
    }
    .icon_product:hover{
      @apply bg-[#ff7004] text-white transition-all
    }
    .item_hover{
      display: none;
    }
    .thumb:hover{
        .item_hover{
          @apply animate-[slideBottom_0.4s_ease-out] flex;
        }
        .img_show2{
            opacity: 1;
            transform: scale(1.1) rotate(3deg);
            transition: all 0.5s ease-in-out;
        }
        .img_show1{
          opacity: 0;
            transform: scale(1.1) rotate(3deg);

          transition: all 0.5s ease-in-out;

        }

    }
    .img_show1{
      opacity: 1;
     transition: all .3s ease 0s;

    }
      .img_show2{
            opacity: 0;
            // transform: scale(0.9);
            transition: all .3s ease 0s;
        }
</style>
