<template>
  <div class="customerMain" style="flex-direction: column">
    <div class="customerFav_Top">
      <p class="customerFav-Title">慾望清單</p>
      <p class="customerFav-subTitle">{{favProducts.length}} Items</p>
    </div>
    <div class="customerFav-Main">
      <ul class="customerFav-Main-ul">
        <li class="customerFav-Main-li" v-for="item in favProducts" :key="item.id" :class="{'disabled': true}">
          <div class="customerFav-Main-Left">
            <img :src="item.imageUrl">
          </div>
          <div class="customerFav-Main-Right">
            <div class="customerFav-Main-detail">
              <div class="customerFav-Main-category">{{item.category}}</div>
              <br>{{item.title}}
              <br>NT{{item.price|currency}}
              <div class="customerFav-Main-NumAndAdd">
                <!--div class="customerFav-Main-num">
                  <img :src="cutImg" @click="countNum(1)">
                      <span :value="num" v-model="item.num">{{item.num}}</span>
                  <img :src="addImg" @click="countNum(2)">
                </div-->
                <div v-if="item.is_enabled" class="customerFav-Main-addtoCart" @click="addtoCart(item.id, 1),deleteFav(item)">加入購物車</div>
                <div v-else class="customerFav-Main-addtoCart" @click="deleteFav(item)">缺貨，到貨提醒我</div>
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
  components: {
  },
  data(){
    return{
      crossImg: require("@/assets/img/cross_small_black.png"),
      addImg: require("@/assets/img/cart/add.png"),
      cutImg: require("@/assets/img/cart/sub.png"),
      favProducts: [],
      isAddCart: '',
      product: {},
      newFavProducts: [],
    }
  },
  methods:{
    deleteFav(item){
      const vm = this;
      let arrIndex = vm.favProducts.findIndex(function(value){
        return value.id === item.id;
      })
      vm.favProducts.splice(arrIndex,1);
      this.$bus.$emit('favToNav',vm.favProducts);
    },
    // getProduct(id){
    //     const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
    //     const vm = this;
    //     this.$http.get(api).then((res) => {
    //         vm.product = res.data.product;
    //         //vm.product.num = 1;
    //     });
    // },
    addtoCart(id, qty=1){
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        const vm = this;
        //vm.isLoading = true;
        const cart = {
	        product_id: id,
	        qty,
        };
        this.$http.post(api, { data: cart }).then((res) => {
            vm.isLoading = false;
            console.log('加至購物車',res.data);
            if(res.data.success){
              console.log('加至購物車成功',res.data);
              vm.isAddCart = res.data.data.product.id;
              this.$bus.$emit('update:cart');
            }
        });
    },
    // countNum(operator){
    //   if(operator === 1 && this.item.num>0){
    //     this.item.num -= 1;
    //     console.log('數量',this.item.num,item.num);

    //   }else if(operator === 2 && item.num.num<9){
    //     item.num += 1;
    //     console.log('數量',this.item.num,this.item);
    //   }
    // },
  },
  created(){
    const vm = this;
    vm.$bus.$on('updateFavorite:fav', (item)=>{
      this.favProducts = item;
    });
    this.favProducts = this.favProducts.forEach(function(item,index,arr){
      arr[index].num = 1;
    });
    console.log('arr',arr);
  },
  beforeDestory() {
   //this.$bus.$off('updateFavorite');

  },
}

</script>

<style>
@import url(http://weloveiconfonts.com/api/?family=entypo);
@font-face {
  font-family: 'entypo';
  src: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-90/entypo.woff') format('woff');
}

.entypo-heart:before{
  content:"\2665";
}


[class*="entypo-"]:before {
  font-family: 'entypo', sans-serif;
  color: grey;
  opacity: .5;
  position: absolute;
  right: 0;
}
</style>
