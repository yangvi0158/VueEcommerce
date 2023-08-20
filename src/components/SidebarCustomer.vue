<template>
    <div class="allsideBar">
        <div class="sidebarCustomer bigSizeUse">
            <span>Coupons</span>
            <ul class="sidebar_ul">
                <li class="sidebar_li">
                    <router-link to="/coupon">   
                        Christmas Sale
                    </router-link>
                </li>
            </ul>
            <span>Special Promotion</span>
            <ul class="sidebar_ul">
                <li class="sidebar_li">
                    <router-link to="/product/christmas">   
                        Christmas Specials
                    </router-link>
                </li>
                <li class="sidebar_li">
                    <router-link to="/product/halloween">
                        Halloween Specials
                    </router-link>
                </li>
            </ul>
            <span>Categories</span>
            <ul class="sidebar_ul">
                <li class="sidebar_li">
                    <router-link to="/product/all">   
                        All
                    </router-link>
                </li>
                <li class="sidebar_li">
                    <router-link to="/product/items">
                        Items
                    </router-link>
                </li>
                <li class="sidebar_li">
                    <router-link to="/product/foods">
                        Foods
                    </router-link>
                </li>
                <li class="sidebar_li">
                    <router-link to="/product/toys">
                        Toys
                    </router-link>
                </li>
                <li class="sidebar_li">
                    <router-link to="/product/decorations">
                        Decorations
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="smallSizeUse">
            <div id="hambar" @click="show = !show">
                <img src="../assets/img/sidebar/sidebar.png">
            </div>
            <transition name="ul">
                <div class="sidebarCustomer" v-if="show">
                    <span>Coupons</span>
                    <ul class="sidebar_ul">
                        <li class="sidebar_li">
                            <router-link to="/coupon">   
                                Christmas Sale
                            </router-link>
                        </li>
                    </ul>
                    <span>Special Promotion</span>
                    <ul class="sidebar_ul">
                        <li class="sidebar_li">
                            <router-link to="/product/christmas">   
                                Christmas Specials
                            </router-link>
                        </li>
                        <li class="sidebar_li">
                            <router-link to="/product/halloween">
                                Halloween Specials
                            </router-link>
                        </li>
                    </ul>
                    <span>Categories</span>
                    <ul class="sidebar_ul">
                        <li class="sidebar_li">
                            <router-link to="/product/all">   
                                All
                            </router-link>
                        </li>
                        <li class="sidebar_li">
                            <router-link to="/product/items">
                                Items
                            </router-link>
                        </li>
                        <li class="sidebar_li">
                            <router-link to="/product/foods">
                                Foods
                            </router-link>
                        </li>
                        <li class="sidebar_li">
                            <router-link to="/product/toys">
                                Toys
                            </router-link>
                        </li>
                        <li class="sidebar_li">
                            <router-link to="/product/decorations">
                                Decorations
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
  name: 'SidebarCustomer',
  data(){
    return{
      show: false,
    }
  },
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