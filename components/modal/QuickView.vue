<template>
  <div>
    <a-modal
      v-model="visible"
      :title="null"
      :footer="null"
      class="w-full"
      width="840px"
      @ok="handleOk"
    >
      <div class="grid lg:grid-cols-8 grid-cols-2 gap-2 w-full h-2/3">
        <div class="col-span-3 h-full">
          <img src="@/static/img_demo.png" class="h-full pb-7 pt-1 w-full" alt="photo">
        </div>
        <div class="col-span-5 flex flex-col space-y-2 px-2 ml-3">
          <h2 class="text-2xl font-semibold text-black">
            Blue Dress For Woman
          </h2>
          <div class="flex items-center space-x-1">
            <i class="fa fa-star text-orange" />
            <i class="fa fa-star text-orange" />
            <i class="fa fa-star text-orange" />
            <i class="fa fa-star" />
            <i class="fa fa-star" />
            <h2 class="text-back">(3 Customer Review)</h2>
          </div>
          <h2 class="text-lg text-black font-semibold">
            $98
          </h2>
          <p class="text-lg text-black">
            Vivamus suscipit tortor eget felis porttitor volutpat. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Proin eget tortor risus. Nulla porttitoraccumsan tincidunt.
            Pellentesque in ipsum id orci porta dapibus.
          </p>
          <h2 class="text-lg text-black font-semibold">
            Color
          </h2>
          <div class="flex space-x-2">
            <li class="bg-blue w-6 h-6" />
            <li class="bg-green w-6 h-6" />
          </div>
          <div class="flex justify-between">
            <a-input-number :min="1" :max="100000" :default-value="1" @change="onChange" />
            <button class="py-3 px-2 w-1/3 bg-black  hover:opacity-90 transition-all text-white font-semibold">
              ADD TO CART
            </button>
          </div>
          <div>
            <h2 class="text-lg text-black font-semibold">
              SHARE THIS PRODUCT
            </h2>
          </div>
          <div class="flex space-x-2">
            <div class=" icon_quickview">
              <i class="fab fa-facebook-f" />
            </div>
            <div class="icon_quickview">
              <i class="fab fa-google-plus-g" />
            </div>
            <div class="icon_quickview">
              <i class="fab fa-instagram" />
            </div>
            <div class="icon_quickview">
              <i class="fab fa-twitter" />
            </div>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleOk (e) {
      console.log(e)
      this.visible = false
    },
    onChange (value) {
      console.log('changed', value)
    }
  }
}
</script>

<style>
.ant-modal{
    @apply h-auto w-2/3;
}
.ant-input-number {
  margin-right: 10px;
}
.icon_quickview{
    @apply bg-white border rounded-full text-black w-7 h-7 flex justify-center items-center transition-all ease-in-out;
}
.icon_quickview:hover{
    @apply text-orange border-orange cursor-pointer;
}
</style>
