<template>
    <div class="allsideBar">
        <div class="sidebarAdmin bigSizeUse">
            <span>Management</span>
            <ul class="sidebar_ul">
                <li class="sidebar_li">
                    <router-link to="/admin">   
                        Products
                    </router-link>
                </li>
                <li class="sidebar_li">
                    <router-link to="/admin/coupon">
                        Coupons
                    </router-link>
                </li>
                <li class="sidebar_li">
                    <router-link to="/admin/order">
                        Orders
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="smallSizeUse">
            <div id="hambar" @click="show = !show">
                <img src="../assets/img/sidebar/sidebar.png">
            </div>
            <transition name="ul">
                <div class="sidebarAdmin" v-if="show">
                    <span>Management</span>
                    <ul class="sidebar_ul">
                        <li class="sidebar_li">
                            <router-link to="/admin">   
                                產品列表
                            </router-link>
                        </li>
                        <li class="sidebar_li">
                            <router-link to="/admin/coupon">
                                優惠券列表
                            </router-link>
                        </li>
                        <li class="sidebar_li">
                            <router-link to="/admin/order">
                                訂單列表
                            </router-link>
                        </li>
                    </ul>
                </div>
            </transition>    
        </div>
    </div>
</template>

<script>



export default {
  name: 'SidebarAdmin',
  data(){
    return{
      show: true,
    }
  }
}
</script>

<style>
    .ul-enter-active,.ul-leave-active {
        transition: all 0.5s;
    }
    .ul-enter,.ul-leave-to {
        height: 0;
    }
</style>