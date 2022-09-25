<template>
  <div :class="[ openModal ? 'fixed flex modal-animation ' : 'hidden', 'modal' ]">
    <div class="modal-background" />
    <div class="modal-wrapper-search flex flex-col">
      <div class=" right-0 absolute p-5">
        <button class="delete bg-white w-10 h-10 rounded-[50%] " aria-label="close" @click="closeModal">
          <i class="fa-regular fa-xmark text-[1.5rem] font-semibold" />
        </button>
      </div>
      <div class="flex justify-center items-center h-full input-search">
        <a-input
          v-model="valueSearch"
          placeholder="Type keyword here"
          class="w-2/3 mt-5 rounded-none font-medium text-white text-xl bg-transparent border-l-0 border-r-0 border-t-0 border-b-2"
          @keyup="onSearch(valueSearch)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',

  data () {
    return {
      valueSearch: ''
    }
  },

  computed: {

    openModal () {
      if (this.$store.getters.isSearchModalOpen) {
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    closeModal () {
      this.$store.commit('showSearchModal', false)
    },
    onSearch (value) {
      console.log(value)
    }
  }
}
</script>

<style lang="scss">
  .fa-exclamation-circle {
    @apply text-red;
  }
  .fa-check {
    @apply text-green;
  }
  .input-search{
    .ant-input{
      @apply text-center;
    }
    .ant-input:hover{
      @apply border-x-0 border-t-0 bg-transparent border-b-[yellow];
      border-right-width: 0px !important;

    }
    .ant-input:focus {
      @apply border-l-0 border-r-0 border-t-0 border-b-2 border-yellow shadow-none outline-0;
        border-right-width: 0px !important;
    }
  }
</style>
