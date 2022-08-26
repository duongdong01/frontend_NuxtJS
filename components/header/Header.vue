<template>
  <nav
    ref="menu"
    class="flex justify-between sticky top-0 bg-base z-10 shadow-md lg:px-10 px-4"
    role="navigation"
    aria-label="main navigation"
  >
    <nuxt-link :to="{ name: 'index' }" class="navbar-item">
      <h1 class=" title w-60 h-20" />
    </nuxt-link>
    <Menu />
    <div class="flex items-center">
      <div class="mr-7 cursor-pointer" @click="showWishlistModal">
        <!-- <nuxt-link :to="{ name: 'user-wishlist' }" tag="span" class="icon">
        </nuxt-link> -->
        <span class="item_count absolute border-2">{{ numberProductAddedToFav }}</span>
        <i class="fa-regular hover_item fa-heart text-lg  text-black" />
      </div>
      <div class="mr-7">
        <div class="cursor-pointer" @click="showCheckoutModal">
          <span class="icon">
            <!-- :class="[numProductsAdded > 0 ? 'p-2 bg-blue text-white rounded-md' : '']" -->
            <span class="item_count absolute border-2">{{ numProductsAdded }}</span>
            <i class="fa fa-shopping-cart text-lg text-black hover_item " />
          </span>
        </div>
      </div>
      <div class="mr-7" @click="showSearchModal">
        <i class="fa-solid hover_item fa-magnifying-glass text-lg cursor-pointer text-black" />
      </div>
      <div class="mr-2">
        <span class="icon">
          <!-- <i class="fa fa-user text-lg" /> -->
          <i v-if="!isUserLoggedIn" class="fa-solid fa-right-to-bracket text-lg text-black hover_item cursor-pointer" @click="showLoginModal" />
          <!-- <a-icon type="login" /> -->
        </span>
        <span>
          <i v-if="isUserLoggedIn" class="cursor-pointer fa-solid fa-circle-user text-lg text-black" @click="onShowDropdown" />
          <i v-if="isUserLoggedIn" class="fa-solid fa-caret-down absolute mt-2 ml-1 cursor-pointer text-black" />
        </span>
        <div v-if="showDropdown && isUserLoggedIn" class="dropdown w-52 h-28">
          <button class="button">
            {{ getUserName }}
          </button>
          <button class="button" @click="logout">
            <span class="text-lg">{{ logoutLabel }}</span>
          </button>
        </div>
        <div v-if="showDropdown && !isUserLoggedIn" class="dropdown">
          <button v-if="!isUserLoggedIn" class="button" @click="showLoginModal">
            <span class="text-lg">Already registered?<br> {{ loginLabel }}</span>
            <i class="fa fa-sign-in" />
          </button>
          <button v-if="!isUserLoggedIn" class="button" @click="showSignupModal">
            <span class="text-lg">New User?<br> {{ signupLabel }}</span>
            <i class="fa fa-user-plus" />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Menu from '../menu/Menu.vue'
export default {
  name: 'VmHeader',
  components: {
    Menu
  },
  data () {
    return {
      isCheckoutActive: false,
      showDropdown: false,
      logoutLabel: 'Log out',
      loginLabel: 'Log in',
      signupLabel: 'Sign up',
      wishlistLabel: 'Wishlist'
    }
  },

  computed: {
    numProductsAdded () {
      return this.$store.getters.productsAdded.length
    },
    numberProductAddedToFav () {
      return this.$store.getters.productsAddedToFavourite.length
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    getUserName () {
      const name = this.$store.getters.getUserName

      if (name === '') {
        return 'user'
      } else {
        return name
      }
    }
  },

  mounted () {
    // eslint-disable-next-line no-sequences, no-unused-expressions
    window.addEventListener('blur', this.closeDropdown, true),
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('blur', this.closeDropdown)
  },

  methods: {
    handleScroll () {
      if (window.scrollY > 100) {
        this.$refs.menu.classList.add('fixeds')
        console.log('ok')
      } else {
        this.$refs.menu.classList.remove('fixeds')
      }
    },
    closeDropdown () {
      setTimeout(() => {
        this.showDropdown = false
      }, 100)
    },
    showCheckoutModal () {
      if (this.isUserLoggedIn) {
        this.$store.commit('showCheckoutModal', true)
      } else {
        this.$store.commit('showLoginModal', true)
      }
    },
    showWishlistModal () {
      if (this.isUserLoggedIn) {
        this.$store.commit('showWishlistModal', true)
      } else {
        this.$store.commit('showLoginModal', true)
      }
    },
    showLoginModal () {
      this.$store.commit('showLoginModal', true)
    },
    showSignupModal () {
      this.$store.commit('showSignupModal', true)
    },
    showSearchModal () {
      console.log('show search')
      this.$store.commit('showSearchModal', true)
    },
    onShowDropdown () {
      this.showDropdown = !this.showDropdown
    },
    logout () {
      this.$store.commit('isUserLoggedIn', false)
      this.$store.commit('isUserSignedUp', false)
      this.$store.commit('removeProductsFromFavourite')

      // redirect to homepage
      this.$router.push({ name: 'index' })
    }
  }
}
</script>

<style lang="scss" scoped>
 .fixeds {
    @apply animate-[fadeInOut_0.5s_ease-out]

}
.hover_item{
  @apply hover:text-[#f79837] hover:transition-all hover:duration-300 hover:ease-in-out
}
.item_count{
  width: 20px;
    height: 20px;
    /* left: -40px; */
    border-radius: 50%;
    margin-left: 10px;
    top: 19px;
    /* line-height: 17px; */
    background: #f79837;
    text-align: center;
    color: white;
    border: none;
}
.item_count:hover{
  background:#f79837 ;
}
.title {
    background: url('../../static/logo/logoAndShop.png') no-repeat;
    background-position: 50% 50%;
    background-size: 220px;
  }

.dropdown {
    @apply absolute;
    @apply p-3;
    @apply bg-white;
    @apply right-0;
    @apply shadow-lg;
    @apply rounded-xl;
    @apply flex;
    @apply flex-col;
    @apply border-2;
    @apply border-grey_light;
  }

  .button {
    @apply w-full;
    @apply hover:bg-grey_light;
    @apply p-2;
    @apply rounded-lg;
  }
</style>
