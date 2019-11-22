<template>
   <div class="sidebarAdmin">
        <span>管理列表</span>
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
</template>

<script>



export default {
  name: 'SidebarAdmin',
  components: {
  },
  data(){
    return{
      
    }
  }
}
</script>

