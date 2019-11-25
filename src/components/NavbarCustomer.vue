｀<template>
  <div class="allnav">
    <div class="nav navbigSize">
      <div class="navLeft">
        <router-link to="/product/all">
          <span class="navLeft_btn" @click="sendtoProduct">購買商品</span>
        </router-link>
        <router-link to="/admin">
          <span class="navLeft_btn backend">後台管理</span>
        </router-link>
      </div>
      <div class="navCenter">
        <router-link to="/"><img class="navbarImg" :src="logoImg"></router-link>
      </div>
      <div class="navRight">
        <div class="nav-favorite">
          <router-link to="/favorites"><img class="navbarImg" :src="loveImg" @click="sendtoFavorite"></router-link>
          <span class="navImg-span">({{favProducts.length}})</span>
        </div>
        <div class="dropdown">
          <img class="navbarImg dropdown-toggle" :src="cartImg"
          id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="navImg-span" id="dropdownMenuButton" data-toggle="dropdown">({{cartProducts.carts.length}})</span>
          <div class="dropdown-menu dropdown-menu-right scrollable-menu" aria-labelledby="dropdownMenuButton">
            <ul>
              <li class="dropdown-item dropdown-flex" v-for="item in cartProducts.carts" href="#">
                <img class="item-img" :src="item.product.imageUrl">
                <p class="item-detail">
                {{item.product.title}}<br>
                NT${{item.product.price}}<br>
                qty:{{item.qty}}<br>
                total:NT{{item.total|currency}}<br>
                </p>
              </li>
            </ul>
            <div class="dropdown-bottom">
              <div class="dropdown-totalPrice">
                <span>Total</span>
                <span>NT{{cartProducts.total|currency}}</span>
              </div>
              <router-link to="/cart">
                <button class="dropdown-checkout">CHECKOUT</button>
              </router-link>
            </div>
          </div>
        </div>
        <img class="navbarImg navbarImg_nomMargin" :src="searchImg" @click="showSearch = !showSearch">
        <input type="text" class="search" placeholder="search" :class="{'searching': showSearch}" 
        v-model="searchKeyword" @keyup.enter="goSearch">
      </div>
    </div> 

    <div class="nav navSmallSize">
      <div class="navTop">
        <router-link to="/"><img class="navbarImg" :src="logoImg"></router-link>
        <div class="navLeft">
          <router-link to="/product/all">
            <span class="nav_btn" @click="sendtoProduct">購買商品</span>
          </router-link>
          <router-link to="/admin">
            <span class="nav_btn backend">後台管理</span>
          </router-link>
        </div>
      </div>
      <div class="navBottom">
        <div class="navRight">
          <div class="nav-favorite">
            <router-link to="/favorites"><img class="navbarImg" :src="loveImg" @click="sendtoFavorite"></router-link>
            <span class="navImg-span">({{favProducts.length}})</span>
          </div>
          <div class="dropdown">
            <img class="navbarImg dropdown-toggle" :src="cartImg"
            id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="navImg-span" id="dropdownMenuButton" data-toggle="dropdown">({{cartProducts.carts.length}})</span>
            <div class="dropdown-menu dropdown-menu-right scrollable-menu" aria-labelledby="dropdownMenuButton">
              <ul>
                <li class="dropdown-item dropdown-flex" v-for="item in cartProducts.carts" href="#">
                  <img class="item-img" :src="item.product.imageUrl">
                  <p class="item-detail">
                  {{item.product.title}}<br>
                  NT${{item.product.price}}<br>
                  qty:{{item.qty}}<br>
                  total:NT{{item.total|currency}}<br>
                  </p>
                </li>
              </ul>
              <div class="dropdown-bottom">
                <div class="dropdown-totalPrice">
                  <span>Total</span>
                  <span>NT{{cartProducts.total|currency}}</span>
                </div>
                <router-link to="/cart">
                  <button class="dropdown-checkout">CHECKOUT</button>
                </router-link>
              </div>
            </div>
          </div>
          <img class="navbarImg navbarImg_nomMargin" :src="searchImg" @click="showSearch = !showSearch">
          <input type="text" class="search" placeholder="search" :class="{'searching': showSearch}" 
          v-model="searchKeyword" @keyup.enter="goSearch">
        </div>
      </div>
    </div> 
  </div> 
</template>

<script>


export default {
  name: 'NavbarCustomer',
  components: {
    
  },
  data(){
    return{
      logoImg: require("../assets/img/logo.png"),
      loveImg: require("../assets/img/navbar/Love_icon.png"),
      cartImg: require("../assets/img/navbar/Cart_icon.png"),
      searchImg: require("../assets/img/navbar/Search_icon.png"),
      showSearch: false,
      cartProducts: [],
      searchKeyword: '',
      favProducts: [],
    }
  },
  methods:{
    getCart(){
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        const vm = this;
        this.$http.get(api).then((res) => {
            vm.cartProducts = res.data.data;
            console.log('getCarts!',res.data);
        });
    },
    goSearch(){
      const vm = this;
      vm.$router.push(`/products/${vm.searchKeyword}`);
      console.log('goSearch');
      vm.$bus.$emit('update:search',vm.searchKeyword);
    },
    sendtoFavorite(){
      const vm = this;
      window.setTimeout(function(){
        vm.$bus.$emit('updateFavorite:fav',vm.favProducts);
      }, 1000);
    },
    sendtoProduct(){
      const vm = this;
      window.setTimeout(function(){
        vm.$bus.$emit('updateProduct:fav',vm.favProducts);
      }, 1000);
    },
  },
  created() {
    const vm = this;
    this.getCart();
    //更新購物車
    vm.$bus.$on('update:cart', () => {
      vm.getCart();
      console.log('目前購物車',vm.cartProducts);
    });
    //接收從product傳來的favorites
    vm.$bus.$on('updateFavtoNav', (item)=>{
      vm.favProducts = item;
    });
    //接收從fav回傳的favorites
    vm.$bus.$on('favToNav', (item)=>{
      vm.favProducts = item;
    });
  },
}
</script>
