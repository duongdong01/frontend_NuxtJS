<template>
  <div :class="[ openModal ? 'fixed flex modal-animation ' : 'hidden', 'modal' ]">
    <div class="modal-background" />
    <div class="modal-wrapper-search ">
      <div class=" flex float-right p-8">
        <button class="delete bg-white w-10 h-10 rounded-[50%] " aria-label="close" @click="closeModal">
          <i class="fa-regular fa-xmark text-[1.5rem] font-semibold" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { isValidEmail } from '@/assets/validators'

export default {
  name: 'Search',

  data () {
    return {
      modalTitle: 'Log in',
      modalTitleLoggedIn: 'Welcome!',
      loginBtnLabel: 'Log in',
      emailRequiredLabel: 'Email required',
      passwordRequiredLabel: 'Password required',
      emailNotValidLabel: 'Valid email required',
      btnLoggedInLabel: 'Close',
      email: '',
      password: '',
      highlightEmailWithError: null,
      highlightPasswordWithError: null,
      isFormSuccess: false
    }
  },

  computed: {
    // isUserLoggedIn () {
    //   return this.$store.getters.isUserLoggedIn
    // },
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
    checkForm (e) {
      e.preventDefault()

      if (this.email && this.password) {
        this.highlightEmailWithError = false
        this.highlightPasswordWithError = false
        this.isFormSuccess = true
        this.$store.commit('isUserLoggedIn', this.isFormSuccess)
      }

      if (!this.email) {
        this.highlightEmailWithError = true

        if (this.email && !isValidEmail(this.email)) {
          this.emailRequiredLabel = this.emailNotValidLabel
        }
      } else {
        this.highlightEmailWithError = false
      }

      if (!this.password) {
        this.highlightPasswordWithError = true
      } else {
        this.highlightPasswordWithError = false
      }
    },
    checkEmailOnKeyUp (emailValue) {
      if (emailValue && isValidEmail(emailValue)) {
        this.highlightEmailWithError = false
      } else {
        this.highlightEmailWithError = true

        if (!isValidEmail(emailValue)) {
          this.emailRequiredLabel = this.emailNotValidLabel
        }
      }
    },
    checkPasswordOnKeyUp (passwordValue) {
      if (passwordValue) {
        this.highlightPasswordWithError = false
      } else {
        this.highlightPasswordWithError = true
      }
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
</style>
