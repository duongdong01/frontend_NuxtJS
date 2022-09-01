<template>
  <div :class="[ openModal ? 'fixed flex ' : 'w-0 h-0', 'modal-login']">
    <div class="flex items-center justify-center modal-background_login w-full h-full" :class="closeForm ?'w-full h-0 -top-full modal-animation-cllogin duration-500':'' ">
      <div class="modal-wrapper-login grid md:grid-cols-2 lg:grid-cols-2  grid-cols-1 overflow-hidden drop-shadow-lg transition-all " :class="openModal ? 'lg:w-full lg:mb-0 lg:h-full h-[70%] w-[90%] modal-animation-login ease-in-out':''">
        <div class="img-login md:block hidden">
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
                <p class="font-medium text-blue hover:text-black cursor-pointer hover:transition-all lg:m-0 m-1">
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
            <div class="md:hidden flex right-0  w-full justify-center space-y-1">
              <button type="submit" :class="islogin ? '' : 'bg-btn_noclick hidden' " class="rounded-xl font-semibold px-2  py-3 bg-grey_dark text-white w-full" @click="changeIsLogin(false)">
                Register
              </button>
              <button type="submit" :class="!islogin ? '' : 'bg-btn_noclick hidden' " class="rounded-xl bg-grey_dark text-white font-semibold px-2 py-3 w-full" @click="changeIsLogin(true)">
                Login
              </button>
            </div>
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
  </div>
</template>

<script>
import Signup from './Signup.vue'
import { isValidEmail, isValidPassword } from '@/assets/validators'

export default {
  name: 'Login',
  components: {
    Signup
  },
  data () {
    return {
      islogin: true,
      closeForm: null,
      modalTitle: 'Login',
      modalTitleLoggedIn: 'Welcome!',
      loginBtnLabel: 'Log in',
      emailRequiredLabel: 'Email required',
      passwordRequiredLabel: 'Password required',
      emailNotValidLabel: 'Valid email required',
      passworNotValidLabel: 'Valid password required',
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
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.closeForm = false

        return true
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.closeForm = true
        return false
      }
    }
  },

  methods: {
    openNotificationWithIcon (type) {
      this.$notification[type]({
        // message: 'Notification Title',
        description:
          'Logged in successfully',
        duration: 1.5
        // top: '30'
      })
    },
    changeIsLogin (a) {
      this.islogin = a
      // console.log(this.islogin)
    },
    closeModal () {
      this.$store.commit('showLoginModal', false)
    },
    async checkForm (e) {
      e.preventDefault()
      try {
        if (!this.email) {
          this.highlightEmailWithError = true

          if (this.email && !isValidEmail(this.email)) {
            this.emailRequiredLabel = this.emailNotValidLabel
          }
        }
        if (!this.password || !isValidPassword(this.password)) {
          this.highlightPasswordWithError = true
        }
        if (isValidEmail(this.email) && isValidPassword(this.password)) {
          const resData = await this.$api.auth.signin(this.email, this.password)
          localStorage.setItem('token', resData.data.token)
          this.isFormSuccess = true
          this.$store.commit('showLoginModal', false)
          this.$store.commit('isUserLoggedIn', this.isFormSuccess)
          console.log(resData.data)
          this.$store.commit('setUserName', resData.data.user)
          this.openNotificationWithIcon('success')

          // this.$store.commit('showLoginModal', false)
          // this.$store.commit('isUserLoggedIn', this.isFormSuccess)
          // this.openNotificationWithIcon('success')
        }
      } catch (error) {
        this.highlightEmailWithError = true
        this.highlightPasswordWithError = true
        console.log(error)
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
      if (passwordValue && isValidPassword(passwordValue)) {
        this.highlightPasswordWithError = false
      } else {
        this.highlightPasswordWithError = true
      }
      if (!isValidEmail(passwordValue)) {
        this.passwordRequiredLabel = this.passworNotValidLabel
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
    @apply lg:w-[750px] lg:h-[550px] ;
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
  .ant-notification-notice-with-icon{
    @apply flex items-center font-medium
  }
  .ant-notification-notice {
    @apply py-5
  }
  .ant-notification-notice-description{
    @apply m-1 text-lg
  }
</style>
