<template>
   <!--慾望清單-->
  <div class="customerMain" style="flex-direction: column">

    <div class="customerFav_Top">
      <p class="customerFav-Title">慾望清單</p>
      <p class="customerFav-subTitle">{{favProducts.length}} Items</p>
      <p v-if="!favProducts[0]" class="emptyCart">咦，慾望清單沒有商品噢！</p>
    </div>
    <div class="customerFav-Main">
      <ul class="customerFav-Main-ul">
        <li class="customerFav-Main-li" 
        v-for="item in favProducts" 
        :key="item.id" >
          <div class="customerFav-Main-Left" :class="{'disabled': true,'deleteFavItem': deleteItem === item.id}">
            <img :src="item.imageUrl">
          </div>
          <div class="customerFav-Main-Right" :class="{'disabled': true,'deleteFavItem': deleteItem === item.id}">
            <div class="customerFav-Main-detail">
              <div class="customerFav-Main-category">{{item.category}}</div>
              <br>{{item.title}}
              <br>NT{{item.price|currency}}
              <div class="customerFav-Main-Btn">
                <div v-if="item.is_enabled" class="customerFav-Main-addtoCart" @click="addtoCart(item.id, 1)">
                  加入購物車
                  <i  v-if="isAddCart === item.id" class="fas fa-spinner fa-spin"></i>
                </div>
                <div v-else class="customerFav-Main-outOfStock">目前缺貨中</div>
              </div>
            </div>
            <img class="customerFav-Main-remove" :src="crossImg" @click="deleteFav(item)">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerFavorite',
  data(){
    return{
      crossImg: require("@/assets/img/other/cross_small_black.png"),
      addImg: require("@/assets/img/cart/add.png"),
      cutImg: require("@/assets/img/cart/sub.png"),
      favProducts: [],
      isAddCart: '',
      product: {},
      newFavProducts: [],
      isLoading: false,
      isAdding: false,
      deleteItem: '',
    }
  },
  methods:{
    //刪除我的最愛項目
    deleteFav(item){
      const vm = this;
      let arrIndex = vm.favProducts.findIndex(function(value){
        return value.id === item.id;
      })
      vm.deleteItem = item.id;
      window.setTimeout(function(){
        vm.favProducts.splice(arrIndex,1);
        this.$bus.$emit('favToNav',vm.favProducts);
      }, 1000);
    },
    //加至購物車
    addtoCart(id, qty=1){
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        const vm = this;
        vm.isAddCart = id;
        const cart = {
	        product_id: id,
	        qty,
        };
        this.$http.post(api, { data: cart }).then((res) => {
            console.log('加至購物車',res.data);
            if(res.data.success){
              console.log('加至購物車成功',res.data);
              vm.isAddCart = '';
              this.$bus.$emit('update:cart');
            }
        });
    },
  },
  created(){
    const vm = this;
    vm.$bus.$on('updateFavorite:fav', (item)=>{
      this.favProducts = item;
    });
  }
}

</script>

