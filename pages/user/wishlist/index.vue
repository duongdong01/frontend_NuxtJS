<!-- <template>
  <div class="p-5">
    <h3 class="text-2xl mb-4">
      {{ pageTitle }}
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="product in productsInWishlist" :key="product.id">
        <VmProductsList :product="product" />
      </div>
      <div v-if="productsInWishlist.length === 0" class="section">
        <p>{{ noProductLabel }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import VmProductsList from '@/components/Products'
import { getByTitle } from '@/assets/filters'

export default {
  name: 'UserWishlist',

  components: { VmProductsList },

  data () {
    return {
      pageTitle: 'Your Wishlist',
      noProductLabel: 'Your wishlist is empty'
    }
  },

  computed: {
    productsInWishlist () {
      if (this.$store.state.userInfo.hasSearched) {
        return this.getProductByTitle()
      } else {
        return this.$store.getters.productsAddedToFavourite
      }
    }
  },

  methods: {
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
    }
  }
}
</script> -->
