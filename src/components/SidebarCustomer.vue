<template>
   <div class="sidebarCustomer">
        <span>優惠券</span>
        <ul class="sidebar_ul">
            <li class="sidebar_li">
                <router-link to="/coupon">   
                    歡慶聖誕優惠
                </router-link>
            </li>
        </ul>
        <span>特別企劃</span>
        <ul class="sidebar_ul">
            <li class="sidebar_li">
                <router-link to="/product/christmas">   
                    溫馨過聖誕
                </router-link>
            </li>
            <li class="sidebar_li">
                <router-link to="/product/halloween">
                    調皮萬聖節特輯
                </router-link>
            </li>
        </ul>
        <span>商品分類</span>
        <ul class="sidebar_ul">
            <li class="sidebar_li">
                <router-link to="/product/all">   
                    全部
                </router-link>
            </li>
            <li class="sidebar_li">
                <router-link to="/product/groceries">
                    雜貨
                </router-link>
            </li>
            <li class="sidebar_li">
                <router-link to="/product/foods">
                    食品
                </router-link>
            </li>
            <li class="sidebar_li">
                <router-link to="/product/toys">
                    玩具
                </router-link>
            </li>
            <li class="sidebar_li">
                <router-link to="/product/decorations">
                    裝飾
                </router-link>
            </li>
        </ul>
  </div>
</template>

<script>



export default {
  name: 'SidebarCustomer',
  components: {
  },
  data(){
    return{
      
    }
  }
}
</script>

