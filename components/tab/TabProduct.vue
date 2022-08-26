<template>
  <div class="flex flex-col">
    <div class="mt-5 px-10 flex flex-col items-center justify-center">
      <h2 class="font-bold text-4xl mb-4">
        HOT PRODUCT
      </h2>
      <p class="font-medium">
        Mauris luctus nisi sapien tristique dignissim ornare
      </p>
    </div>
    <div>
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="NEW ARRIVAL" class="font-semibold">
          <ProductsList :products="products" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="BEST SELLER" class="font-semibold" force-render>
          <ProductsList :products="products" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="ON SALE">
          Content of Tab Pane 3
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
import ProductsList from '../products_list/ProductsListContainer.vue'
import { getByTitle } from '@/assets/filters'
export default {
  components: {
    ProductsList
  },
  data () {
    return {}
  },
  computed: {
    products () {
      const {
        products,
        userInfo: {
          hasSearched
        }
      } = this.$store.state

      if (hasSearched) {
        return this.getProductByTitle()
      } else {
        return products
      }
    }
  },
  methods: {
    callback (key) {
      console.log(key)
    },
    getProductByTitle () {
      const {
        products,
        userInfo: {
          productTitleSearched
        }
      } = this.$store.state

      return getByTitle(products, productTitleSearched)
    }
  }
}
</script>

<style lang="scss">
.ant-tabs-nav-wrap{
    @apply mt-3;
}
.ant-tabs-bar{
    @apply border-0
}
.ant-tabs-nav-scroll{
    @apply w-full flex justify-center;

}
.ant-tabs-nav .ant-tabs-tab-active{
    @apply text-orange;
}
.ant-tabs-tab{
    @apply font-semibold text-black text-[1rem] leading-6;
}
.ant-tabs-tab:hover {
    @apply text-orange
}
.ant-tabs-tab-active{
    @apply text-orange
}
.ant-tabs-ink-bar{
    @apply bg-orange
}
.ant-tabs-nav .ant-tabs-tab:hover{
    @apply text-orange
}
</style>
