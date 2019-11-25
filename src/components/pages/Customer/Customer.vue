<template>
  <!--顧客主要頁面-->
  <div class="customer">
    <NavbarCustomer/>
      <transition name="slide" mode="out-in">
        <router-view/>
      </transition>
    <Footer/>
  </div>
</template>

<script>
import NavbarCustomer from '@/components/NavbarCustomer';
import Footer from '@/components/Footer';
export default {
  name: 'Customer',
  components: {
    NavbarCustomer,
    Footer,
  },
}
</script>


<style lang="sass">
.slide-enter
  transform: translateX(-10px)
  opacity: 0

.slide-leave-to
  transform: translateX(10px)
  opacity: 0

.slide-enter-active, .slide-leave-active
  transition: all .4s
</style>

