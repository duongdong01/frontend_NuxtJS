<template>
  <div class="flex flex-col px-2">
    <div class="tab_order-admin">
      <a-tabs default-active-key="2a" @change="callback">
        <!-- <a-tab-pane key="1a" tab="All Transactions">
          <div v-if="allTransaction.totalItem<1" class="flex justify-center">
            <p class="text-black font-medium sm:text-xl mx-0 my-10">
              There are no bills waiting
            </p>
          </div>
          <div v-for="(item,index) in allTransaction.listOrder" :key="index" class="mb-4">
            <ItemOrder
              :item-order="item"
            />
            <hr class="text-[#e8e8e8]">
          </div>
          <div v-if="allTransaction.totalItem>=1" class="flex justify-center">
            <a-pagination v-model="current" :total="allTransaction.pages*8" show-less-items :page-size="8" @change="onChangeAll" />
          </div>
        </a-tab-pane> -->
        <a-tab-pane key="2a" tab="Wait For Confirmation">
          <div v-if="waitForComfirm.totalItem<1" class="flex justify-center">
            <p class="text-black font-medium sm:text-xl mx-0 my-10">
              There are no bills waiting
            </p>
          </div>
          <div v-for="(item,index) in waitForComfirm.listOrder" :key="index" class="mb-4">
            <ItemOrder
              :item-order="item"
              :comfirm="true"
            />
            <hr class="text-[#e8e8e8]">
          </div>
          <div v-if="waitForComfirm.totalItem >=1" class="flex justify-center">
            <a-pagination v-model="currentComfirm" :total="waitForComfirm.pages*8" show-less-items :page-size="8" @change="onChangeComfirm" />
          </div>
        </a-tab-pane>
        <a-tab-pane key="3a" tab="Successful Delivery">
          <div v-if="itemSuccessful.totalItem<1" class="flex justify-center">
            <p class="text-black font-medium sm:text-xl mx-0 my-10">
              You have not had any successful orders yet
            </p>
          </div>
          <div v-for="(item,index) in itemSuccessful.listOrder" :key="index" class="mb-4">
            <ItemOrder
              :item-order="item"
            />
            <hr class="text-[#e8e8e8]">
          </div>
          <div v-if="itemSuccessful.totalItem>=1" class="flex justify-center">
            <a-pagination v-model="currentSuccess" :total="itemSuccessful.pages*8" show-less-items :page-size="8" @change="onChangeSuccess" />
          </div>
        </a-tab-pane>
        <a-tab-pane key="4a" tab="Order Canceled">
          <div v-if="itemCanceled.totalItem<1" class="flex justify-center">
            <p class="text-black font-medium sm:text-xl mx-0 my-10">
              No orders have been canceled
            </p>
          </div>
          <div v-for="(item,index) in itemCanceled.listOrder" :key="index" class="mb-4">
            <ItemOrder
              :item-order="item"
            />
            <hr class="text-[#e8e8e8]">
          </div>
          <div v-if="itemCanceled.totalItem >=1" class="flex justify-center">
            <a-pagination v-model="currentCancel" :total="itemCanceled.pages*8" show-less-items :page-size="8" @change="onChangeCancel" />
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
import ItemOrder from '@/components/admin/orders/TableOrder.vue'
export default {
  components: {
    ItemOrder
  },
  data () {
    return {
      current: 1,
      currentComfirm: 1,
      currentSuccess: 1,
      currentCancel: 1,
      allTransaction: {},
      waitForComfirm: {},
      itemSuccessful: {},
      itemCanceled: {}
    }
  },
  mounted () {
    // this.getAllTransaction(8, 1)
    this.getWaitForComfirm(8, 1)
    this.getSuccessful(8, 1)
    this.getCanceled(8, 1)
  },
  methods: {
    callback (key) {
      console.log(key)
    },
    // async getAllTransaction (limit, page) {
    //   try {
    //     const dataOrder = await this.$api.order.getOrderAdmin({ cancel: 0, limit, page })

    //     this.allTransaction = dataOrder.listOrder
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },
    async getWaitForComfirm (limit, page) {
      try {
        const dataOrder = await this.$api.order.getOrderAdmin({ cancel: 0, status: 0, limit, page })
        this.waitForComfirm = dataOrder.listOrder
      } catch (error) {
        console.log(error)
      }
    },
    async getSuccessful (limit, page) {
      try {
        const dataOrder = await this.$api.order.getOrderAdmin({ cancel: 0, status: 1, limit, page })
        this.itemSuccessful = dataOrder.listOrder
      } catch (error) {
        console.log(error)
      }
    },
    async getCanceled (limit, page) {
      try {
        const dataOrder = await this.$api.order.getOrderAdmin({ cancel: 1, limit, page })
        this.itemCanceled = dataOrder.listOrder
      } catch (error) {
        console.log(error)
      }
    },
    // onChangeAll (value) {
    //   // getAllTransaction()
    //   console.log('page: ', value)
    //   this.getAllTransaction(8, value)
    // },
    onChangeComfirm (value) {
      console.log('page: ', value)
      this.getWaitForComfirm(8, value)
    },
    onChangeSuccess (value) {
      console.log('page: ', value)
      this.getSuccessful(8, value)
    },
    onChangeCancel (value) {
      console.log('page: ', value)
      this.getCanceled(8, value)
    }
  }
}
</script>

  <style lang="scss">
  .tab_order-admin{

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
