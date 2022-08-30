<template>
  <div :class="[ openModal ? 'fixed flex ' : 'hidden', 'modal-login' ]">
    <div class="modal-background" />
    <div class="modal-wrapper-login grid grid-cols-2 overflow-hidden drop-shadow-lg  modal-animation-login">
      <div class="img-login ">
        <div class="flex  flex-col absolute right-0 w-1/4 h-full justify-center space-y-1">
          <button type="submit" :class="islogin ? 'bg-btn_click' : 'bg-btn_noclick' " class="rounded-l-full font-semibold px-2 py-3 bg-black text-white w-full" @click="changeIsLogin(true)">
            {{ loginBtnLabel }}
          </button>
          <button type="submit" :class="!islogin ? 'bg-btn_click' : 'bg-btn_noclick' " class="rounded-l-full font-semibold px-2 py-3 w-full" @click="changeIsLogin(false)">
            Register
          </button>
        </div>
      </div>

      <div class="overflow-y-auto">
        <div class=" flex items-center justify-between py-5 px-8">
          <div v-if="islogin">
            <p class="text-2xl text-black font-semibold">
              {{ modalTitle }}
            </p>
            <p class="font-medium">
              Log in to continue in our website
            </p>
          </div>
          <div v-else>
            <p class="text-2xl font-semibold text-black">
              Register
            </p>
            <p class="font-medium">
              Create an account free and enjoy it
            </p>
          </div>
          <!-- <p v-if="isUserLoggedIn" class="text-xl">
            {{ modalTitleLoggedIn }}
          </p> -->
          <button class="delete" aria-label="close" @click="closeModal">
            <i class="fa-regular fa-xmark text-[1.25rem] font-semibold hover:text-red" />
          </button>
        </div>
        <form v-if="islogin" action="#" method="post" @submit="checkForm">
          <section class="px-5 pt-5 rounded-b-2xl">
            <div v-if="!isUserLoggedIn">
              <div class="m-4">
                <input
                  v-model="email"
                  :class="[highlightEmailWithError ? 'input border-red' : 'input']"
                  type="email"
                  placeholder="Email Address"
                  name="emailName"
                  @keyup="checkEmailOnKeyUp(email)"
                >
                <p v-if="highlightEmailWithError" class="text-red">
                  {{ emailRequiredLabel }}
                </p>
              </div>
              <div class="m-4">
                <input
                  v-model="password"
                  :class="[highlightPasswordWithError ? 'input border-red' : 'input']"
                  type="password"
                  placeholder="Password"
                  name="passwordName"
                  @keyup="checkPasswordOnKeyUp(password)"
                >
                <p v-if="highlightPasswordWithError" class="text-red">
                  {{ passwordRequiredLabel }}
                </p>
              </div>
            </div>
            <div v-if="isUserLoggedIn" class="level">
              <div class="text-center">
                <div>
                  <p class="title">
                    Welcome back!
                  </p>
                  <p class="heading">
                    Now you are logged in
                  </p>
                </div>
              </div>
            </div>
            <div class="m-4 flex lg:justify-between lg:flex-row flex-col items-center">
              <button v-if="!isUserLoggedIn" type="submit" class="rounded-xl p-3 font-semibold bg-yellow hover:bg-yellow_hover text-white lg:w-1/3 w-full">
                {{ loginBtnLabel }}
              </button>
              <p class="font-medium text-blue hover:text-black cursor-pointer hover:transition-all">
                Forgot Password
              </p>
              <!-- <button v-if="isUserLoggedIn" type="button" class="rounded-xl p-3 bg-grey_light text-grey_dark" @click="closeModal">
                {{ btnLoggedInLabel }}
              </button> -->
            </div>
          </section>
        </form>
        <!-- signup  -->
        <Signup v-else />

        <div class="mx-4 flex-col px-5">
          <p class="text-base font-medium text-black" style="color:black">
            Or Login With:
          </p>
          <div class="flex mt-2 mr-1 space-x-2">
            <a class="icon_face w-10 h-10 rounded-full bg-blue_lights  transition-all flex justify-center items-center">
              <i class="fab fa-facebook-f text-base text-white " />
            </a>
            <a class="icon_twitter bg-[#00acee] w-10 h-10 rounded-full flex justify-center items-center">
              <i class="fab fa-twitter text-base text-white" />
            </a>
            <a class="icon_google bg-[#CC3333] w-10 h-10 rounded-full flex justify-center items-center">

              <i class="fab fa-google-plus-g text-base text-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Signup from './Signup.vue'
import { isValidEmail } from '@/assets/validators'

export default {
  name: 'Login',
  components: {
    Signup
  },
  data () {
    return {
      islogin: true,
      modalTitle: 'Login',
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
      isFormSuccess: false,
      primaryBtnLabel: 'Register',
      btnRegisteredLabel: 'Close'
    }
  },

  computed: {
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    openModal () {
      if (this.$store.getters.isLoginModalOpen) {
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    changeIsLogin (a) {
      this.islogin = a
      // console.log(this.islogin)
    },
    closeModal () {
      this.$store.commit('showLoginModal', false)
    },
    async checkForm (e) {
      e.preventDefault()
      // alert('thanh cong')
      // eslint-disable-next-line no-unused-expressions
      await this.$api.auth.signin(this.email, this.password).then(() => {
        console.log(this.email)
        alert('thanh cong')
        console.log('thanh cong')
        this.isFormSuccess = true
      }).catch((error) => {
        console.log('loi', error)
        this.highlightEmailWithError = false
        this.highlightPasswordWithError = false
      })

      // this.$store.commit('isUserLoggedIn', this.isFormSuccess)

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
  .modal-wrapper-login {
    @apply bg-white;
    @apply z-20;
    @apply rounded-2xl;
    @apply w-[750px] h-[550px] ;
  }
  .img-login{
     background-image: url(@/static/banner/bg_login.jpg);
     background-position: center;
      background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden;
  }

  .bg-btn_click{
    @apply bg-black text-white
  }
  .bg-btn_noclick{
    @apply bg-white text-black
  }

  .icon_face:hover{
      @apply bg-white border-[1px] transition-all;
    .fa-facebook-f{
      @apply text-[#3b5998];
     }
  }
.icon_twitter:hover{
      @apply bg-white border-[1px] transition-all;
    .fa-twitter{
      @apply text-[#00acee];
     }
  }
  .icon_google:hover{
      @apply bg-white border-[1px] transition-all border-[#CC3333];
    .fa-google-plus-g{
      @apply text-[#CC3333];
     }
  }
</style>
