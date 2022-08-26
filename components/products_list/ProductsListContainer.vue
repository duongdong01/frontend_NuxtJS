<template>
  <div class="m-5 lg:px-8 px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div v-for="product in products" :key="product.id">
        <Products :detail="false" :product="product" />
      </div>
    </div>
    <div v-if="products.length === 0" class="text-center">
      <h2 class="text-2xl">
        {{ noProductLabel }}
      </h2>
    </div>
  </div>
</template>

<script>
import Products from '../Products'
// import { getByTitle } from '@/assets/filters'

export default {
  name: 'ProductsList',

  components: {
    Products
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    products: {
      type: Array
    }
  },

  data () {
    return {
      id: '',
      noProductLabel: 'No product found'
    }
  }

  // computed: {
  //   products () {
  //     const {
  //       products,
  //       userInfo: {
  //         hasSearched
  //       }
  //     } = this.$store.state

  //     if (hasSearched) {
  //       return this.getProductByTitle()
  //     } else {
  //       return products
  //     }
  //   }
  // },

  // methods: {
  //   getProductByTitle () {
  //     const {
  //       products,
  //       userInfo: {
  //         productTitleSearched
  //       }
  //     } = this.$store.state

  //     return getByTitle(products, productTitleSearched)
  //   }
  // }

}
</script>
