<template>
  <div class="customerMain" @click="showSortByul = false">
    <SidebarCustomer/>
    <!--loading-->
    <loading 
      :active.sync="isLoading"
      color="#646159"
      :height="loadingScale"
      :width="loadingScale"
    ></loading>
    <!--商品列表-->
    <div class="customerRight">
        <div class="customerMainContent-Top">
            <span v-if="filteredProducts[0]">搜尋關於 "{{searchKeyword}}" 的結果</span>
            <span v-else>查無關於 "{{searchKeyword}}" 的結果</span>
            <button class="customerSortBy" @click.stop="showSortByul = !showSortByul">
              SORT BY
            </button>
            <ul class="customerSortBy_ul" :class="{'showClass':showSortByul}">
              <li class="customerSortBy_li" @click="isReverse = false, sortBy = 'num'">最新推出</li>
              <li class="customerSortBy_li" @click="isReverse = true, sortBy = 'price'">價格低至高</li>
              <li class="customerSortBy_li" @click="isReverse = false, sortBy = 'price'">價格高至低</li>
            </ul>
        </div>
        <div class="customerMainContent row">
            <div class="col-md-4 col-sm-6 mb-5" v-for="item in sortdata" :key="item.id">
                <div class="card" @click="getProduct(item.id)">
                    <i class="fas fa-heart heartPosition" 
                    @click.stop="addFavorite(item)" 
                    :class="{'redheart': allFavorite.some((value)=>value.id === item.id)}"
                    ></i>
                    <div class="card-top" :style="{backgroundImage: `url(${item.imageUrl})`}">
                      <div class="card-top-nomask" v-if="item.is_enabled">
                        <div class="card-top-hover">CHECK</div>
                      </div>
                      <div class="card-top-mask" v-if="!item.is_enabled">
                        <div class="card-top-maskText">SOLD&nbsp&nbspOUT</div>
                      </div>
                    </div>
                    <div class="card-body">
                        <p class="card-title">{{ item.title }}</p>
                        <div class="card-price d-flex justify-content-center align-items-baseline">
                            <p v-if="item.price">NT{{item.price|currency}}&nbsp&nbsp</p>
                            <p v-if="!item.price">NT{{item.origin_price|currency}}</p>
                            <del v-if="item.price" style="color: grey;">NT{{item.origin_price|currency}}</del>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--單一商品Modal-->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header modalHeader border-0">
                      <p class="modal-title" id="exampleModalLabel" style="color: #F0EEE9;user-select: none;">{{product.title}}</p>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <img :src="crossImg" style="width:30%">
                      </button>
                </div>
                <div class="productModal-body">
                  <div class="productModal_Left">
                    <div class="productModal_img">
                      <vue-photo-zoom-pro 
                      :url="product.imageUrl"
                      type="circle"
                      :zoom-style="{'background-color': '#F0EEE9','border': 'solid 1px black'}"
                      ></vue-photo-zoom-pro>
                    </div>
                  </div>
                  <div class="productModal_Right">
                    <div class="productModal_Right_Top">
                      <p class="productModal-category">{{product.category}}</p>
                      <p class="productModal-title">{{product.title}}</p>
                      <p class="productModal-price">NT{{product.price|currency}}</p>
                    </div>
                    <div class="productModal_Right_Center">
                      <p class="productModal-ingredient">商品材料/成分：{{product.ingredient}}</p>
                      <p class="productModal-size">商品規格：{{product.size}}</p>
                    </div>
                    <div class="productModal_Right_Bottom">
                      <div class="productModal-num">
                        <img :src="cutImg" @click="countNum(1)">
                        <span :value="num" v-model="product.num">{{product.num}}</span>
                        <img :src="addImg"  @click="countNum(2)">
                      </div>
                      <button class="productModal-addtoCart" @click="addtoCart(product.id, product.num)"
                      :disabled="isLoading" :class="{'productModal-addtoCart-disabled':isLoading}">
                        <span v-if="isAddCart === product.id">已加入購物車&nbsp;</span>
                        <span v-else>ADD TO CART&nbsp;</span>
                        <i  v-if="isLoading" class="fas fa-spinner fa-spin"></i>
                      </button>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import SidebarCustomer from '@/components/SidebarCustomer';
import $ from 'jquery';
export default {
  name: 'CustomerProduct-Search',
  components: {
    SidebarCustomer,
  },
  data(){
    return{
      crossImg: require("@/assets/img/modal/cross_black.png"),
      addImg: require("@/assets/img/modal/add.png"),
      cutImg: require("@/assets/img/modal/cut.png"),
      allProducts: [],
      product: {},
      getPagination: {},
      nowPage: '',
      showSortByul: false,
      sortBy: "num",
      isReverse: false,
      isLoading: false,
      loadingScale: 50,
      isFavorite: false,
      allFavorite: [],
      isAddCart: '',
      searchKeyword: '',
    }
  },
  methods:{
    //取得產品資訊
    getProducts(){
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
        const vm = this;
        //vm.isLoading = true;
        this.$http.get(api).then((res) => {
            vm.allProducts = res.data.products;
            vm.getPagination = res.data.pagination;
            //vm.isLoading = false;
            //console.log('拿取商品列表',res.data);
            //console.log('我是allproducts',vm.allProducts);
        });
    },
    //取得單一產品資訊
    getProduct(id){
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
        const vm = this;
        this.$http.get(api).then((res) => {
            vm.product = res.data.product;
            vm.product.num = 1;
            //console.log(res.data);
            //console.log('我是product',vm.product);
            if(res.data.success){
              $('#productModal').modal('show');
            }
        });
    },
    //加入購物車
    addtoCart(id, qty=1){
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        const vm = this;
        vm.isLoading = true;
        const cart = {
	        product_id: id,
	        qty,
        };
        this.$http.post(api, { data: cart }).then((res) => {
            vm.isLoading = false;
            if(res.data.success){
              vm.isAddCart = res.data.data.product.id;
              //console.log('加至購物車成功',res.data);
              //$('#productModal').modal('hide');
              this.$bus.$emit('update:cart');
            }
        });
    },
    //設置產品數量上限
    countNum(operator){
      if(operator === 1 && this.product.num>0){
        this.product.num -= 1;
        //console.log('數量',this.product.num,this.product);

      }else if(operator === 2 && this.product.num<9){
        this.product.num += 1;
        //console.log('數量',this.product.num,this.product);
      }
    },
    //加入我的最愛
    addFavorite(item){
      const vm = this;
      let arrIndex = vm.allFavorite.findIndex(function(value,index,array){
        return value.id === item.id;
      })
      if(arrIndex === -1){
        vm.allFavorite.push(item);
      }else{
        vm.allFavorite.splice(arrIndex,1);
      }
      this.$bus.$emit('updateFavtoNav',this.allFavorite);
      //console.log('我是allfavorite',vm.allFavorite);
    }
  },
  computed:{
    //商品排序
    sortdata(){
      let vm = this;
      let key = vm.sortBy;
      return vm.filteredProducts.sort(function(a,b){
          if(vm.isReverse){
            return a[key] - b[key]
          }else{
            return b[key] - a[key]
          }
      })
    },
    //根據搜尋顯示商品
    filteredProducts(){
      const vm = this;
      const product = this.allProducts;
      let filtered = '';
      filtered = this.allProducts.filter((el) => {
        return el.title.includes(vm.searchKeyword);
      })
      return filtered;
    },
  },
  created() {
    const vm = this;
    this.getProducts();
    this.searchKeyword = this.$route.params.keyword; //透過路由取得
    vm.$bus.$on('update:search', (value) => {
      this.searchKeyword = value;
    });
    vm.$bus.$on('updateProductSearch:fav', (item) => {
      this.allFavorite = item;
      //console.log('item',item);
      //console.log('this.allFavorite1',this.allFavorite);
    });
    //console.log('this.allFavorite2',this.allFavorite);
  },
}

</script>

<style>
.heartPosition{
  font-size: 1.5rem;
  color: grey;
  opacity: .5;
  position: absolute;
  right: 0;
  z-index: 100;
}

.redheart{
  color: red !important;
  animation: heartTransform .5s;
}
@keyframes heartTransform{
  0%{
    transform: scale(1);
  }
  50%{
    transform: scale(1.3);
  }
  100{
    transform: scale(1);
  }

}


</style>
