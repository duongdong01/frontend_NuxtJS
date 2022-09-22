<template>
  <div class="flex flex-col mt-5 px-14">
    <div class="tab_order">
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="All Transactions">
          <div v-for="(item,index) in allTransaction" :key="index" class="mb-4">
            <ItemOrder
              :item-order="item"
              :status="item.status"
              :cancel="item.cancel"
            />
            <hr class="text-[#e8e8e8]">
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Wait For Confirmation" force-render>
          <div v-if="waitForComfirm.length<1" class="flex justify-center">
            <p class="text-black font-medium sm:text-xl mx-0 my-10">
              There are no bills waiting
            </p>
          </div>
          <div v-for="(item,index) in waitForComfirm" :key="index" class="mb-4">
            <ItemOrder
              :item-order="item"
              :status="item.status"
              :cancel="item.cancel"
            />
            <hr class="text-[#e8e8e8]">
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="Successful Delivery">
          <div v-if="itemSuccessful.length<1" class="flex justify-center">
            <p class="text-black font-medium sm:text-xl mx-0 my-10">
              You have not had any successful orders yet
            </p>
          </div>
          <div v-for="(item,index) in itemSuccessful" :key="index" class="mb-4">
            <ItemOrder
              :item-order="item"
              :status="item.status"
              :cancel="item.cancel"
            />
            <hr class="text-[#e8e8e8]">
          </div>
        </a-tab-pane>
        <a-tab-pane key="4" tab="Order Has Been Canceled">
          <div v-if="itemCanceled.length<1" class="flex justify-center">
            <p class="text-black font-medium sm:text-xl mx-0 my-10">
              No orders have been canceled
            </p>
          </div>
          <div v-for="(item,index) in itemCanceled" :key="index" class="mb-4">
            <ItemOrder
              :item-order="item"
              :status="item.status"
              :cancel="item.cancel"
            />
            <hr class="text-[#e8e8e8]">
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
import ItemOrder from '@/components/order/ItemOrder.vue'
export default {
  components: {
    ItemOrder
  },
  data () {
    return {
      allTransaction: [],
      waitForComfirm: [],
      itemSuccessful: [],
      itemCanceled: []
    }
  },
  mounted () {
    this.getAllTransaction()
    this.getWaitForComfirm()
    this.getSuccessful()
    this.getCanceled()
  },
  methods: {
    callback (key) {
      console.log(key)
    },
    async getAllTransaction () {
      try {
        const token = localStorage.getItem('token')
        const userData = await this.$api.auth.secret(token)
        const dataOrder = await this.$api.order.getOrder({ user: userData.data._id, cancel: 0 })
        this.allTransaction = dataOrder.listOrder
        // console.log('allTran: ', this.allTransaction)
      } catch (error) {
        console.log(error)
      }
    },
    async getWaitForComfirm () {
      try {
        const token = localStorage.getItem('token')
        const userData = await this.$api.auth.secret(token)
        const dataOrder = await this.$api.order.getOrder({ user: userData.data._id, cancel: 0, status: 0 })
        this.waitForComfirm = dataOrder.listOrder
        // console.log('waitForComfirm: ', this.waitForComfirm)
      } catch (error) {
        console.log(error)
      }
    },
    async getSuccessful () {
      try {
        const token = localStorage.getItem('token')
        const userData = await this.$api.auth.secret(token)
        const dataOrder = await this.$api.order.getOrder({ user: userData.data._id, cancel: 0, status: 1 })
        this.itemSuccessful = dataOrder.listOrder
        // console.log('itemSuccessful: ', this.itemSuccessful)
      } catch (error) {
        console.log(error)
      }
    },
    async getCanceled () {
      try {
        const token = localStorage.getItem('token')
        const userData = await this.$api.auth.secret(token)
        const dataOrder = await this.$api.order.getOrder({ user: userData.data._id, cancel: 1 })
        this.itemCanceled = dataOrder.listOrder
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss">
.tab_order{

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
}
</style>
