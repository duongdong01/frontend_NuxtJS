<template>
  <div class="flex flex-col w-full justify-center ">
    <div>
      <nuxt-link to="/admin" class="text-black font-semibold text-lg">
        Admin
      </nuxt-link>
      <span class="text-grey_dark/60 font-semibold text-lg">
        / Orders
      </span>
    </div>
    <hr class="text-[#ccc] mt-2">
    <TabOrder class="w-full" />
  </div>
</template>

<script>
import TabOrder from '../../../components/admin/orders/TabOrder.vue'
export default {
  components: { TabOrder },
  layout: 'admin'
}
</script>
