<template>
  <div class="nav">
    <div class="navLeft">
      <router-link to="/product/all">
        <span class="navLeft_btn">購買商品</span>
      </router-link>
      <router-link to="/admin">
        <span class="navLeft_btn">後台管理</span>
      </router-link>
    </div>
    <div class="navCenter">
      <router-link to="/"><img class="navbarImg" :src="logoImg"></router-link>
    </div>
    <div class="navRight">
      <a href="#" class="signout" @click.prevent="signout">SIGN OUT</a>
    </div>
  </div> 
</template>

<script>


export default {
  name: 'NavbarAdmin',
  components: {
    
  },
  data(){
    return{
      logoImg: require("../assets/img/logo.png"),
      loveImg: require("../assets/img/navbar/Love_icon.png"),
      cartImg: require("../assets/img/navbar/Cart_icon.png"),
      searchImg: require("../assets/img/navbar/Search_icon.png"),
      showSearch: false,
    }
  },
  methods:{
    signout(){
		  const api = `${process.env.APIPATH}/logout`;
		  const vm = this;
		  this.$http.post(api).then((res) => {
      	console.log(res.data);
			  if(res.data.success){
				  vm.$router.push('/login');
			  }
    	});
	  }
  }
}
</script>