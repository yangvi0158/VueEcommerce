<template>
  <!--顧客訂單頁面-->
  <div class="customerMain" style="flex-direction: column; justify-content: center; align-items: center;">
    <!--loading-->
    <loading 
      :active.sync="isLoading"
      color="#646159"
      :height="loadingScale"
      :width="loadingScale"
    ></loading> 
    <!--上方進度條-->
    <div class="customerOrder_Top">
      <div class="customerCart-process">
        <div class="customerCart-process-circle"></div>
        <p class="customerCart-process-title">① 購物車</p>
      </div>
      <div class="customerCart-process">
        <div class="customerCart-process-circle" :class="{'orderStatus': !order.is_paid}"></div>
        <p class="customerCart-process-title">② 訂單資訊確認</p>
      </div>
      <div class="customerCart-process">
        <div class="customerCart-process-circle" :class="{'orderStatus': order.is_paid}"></div>
        <p class="customerCart-process-title">③ 付款完成</p>
      </div>
    </div>
    <!--主要訂單資訊-->
    <div class="customerOrder-Main">
        <form class="customerOrder-form" @submit.prevent="payOrder">
            <table class="table table-borderless mb-5">
                <thead>
                    <th></th>
                    <th>品項</th>
                    <th>數量</th>
                    <th>單價</th>
                </thead>
                <tbody>
                    <tr class="customerOrder-border" v-for="item in order.products" :key="item.id">
                        <td><img :src="item.product.imageUrl" style="width: 60px"></td>
                        <td style="min-width: 100px">{{ item.product.title }}</td>
                        <td>{{ item.qty }}</td>
                        <td width="100">NT{{ Math.round(item.final_total)|currency}}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" class="text-right">折扣後總計</td>
                        <td >NT{{ Math.round(order.total)|currency }}</td>
                    </tr>
                </tfoot>
            </table>
            <p class="tableTitle mt-5">訂單資訊</p>
            <table class="table table-borderless mb-5">
                <tbody>
                    <tr class="customerOrder-border">
                        <th>Email</th>
                        <td>{{ order.user.email }}</td>
                    </tr>
                    <tr class="customerOrder-border">
                        <th>姓名</th>
                        <td>{{ order.user.name }}</td>
                    </tr>
                    <tr class="customerOrder-border">
                        <th>收件人電話</th>
                        <td>{{ order.user.tel }}</td>
                    </tr>
                    <tr class="customerOrder-border">
                        <th>收件人地址</th>
                        <td>{{ order.user.address }}</td>
                    </tr>
                    <tr class="customerOrder-border">
                        <th>付款狀態</th>
                        <td>
                        <span v-if="!order.is_paid">尚未付款</span>
                        <span v-else class="text-success">付款完成</span>
                        </td>
                    </tr>
                    <tr v-show="order.is_paid">
                        <th>訂單編號</th>
                        <td>{{ order.id}}</td>
                    </tr>
                </tbody>
            </table>
            <p v-show="order.is_paid" class="payRemark">提醒您：付款後，從備貨到寄出商品為 3 個工作天。（不包含假日）</p>
      
            <div class="customerOrder-pay mb-5" v-if="!order.is_paid">
                <button class="customerOrder-payBtn mb-5">前往付款</button>
            </div>
            <div class="customerOrder-pay mb-5" v-else>
                <router-link to="/product"><button class="customerOrder-payBtn mb-5">回首頁</button></router-link>
            </div>
        </form>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'CustomerOrder',
  data(){
    return{
      crossImg: require("@/assets/img/other/cross_small_black.png"),
      addImg: require("@/assets/img/cart/add.png"),
      cutImg: require("@/assets/img/cart/sub.png"),
      cartProducts: [],
      isDelete: false,
      isLoading: false,
      loadingScale: 50,
      tempProduct: {},
      orderId: '',
      order: {
        user: {},
      },
    }
  },
  methods:{
    //取得訂單資訊
    getOrder(){
        const vm = this;
        vm.isLoading = true;
        //console.log('getOrder')
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
        this.$http.get(api).then((res) => {
            vm.order = res.data.order;
            vm.isLoading = false;
            //console.log('取得訂單資料',res);
            this.$bus.$emit('update:cart');
        });
    },
    //進行付款
    payOrder(){
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
        this.$http.post(api).then((res) => {
            if(res.data.success){
                vm.getOrder();
                //console.log('付款完成',res);
                this.$bus.$emit('update:cart');
            }else{
                //console.log('付款失敗',res);
            }
        });
    },
    getCart(){
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        const vm = this;
        this.$http.get(api).then((res) => {
            vm.cartProducts = res.data.data;
            //console.log('getCarts!',res.data);
        });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId; //透過路由取得
	  //console.log(this.orderId);
    this.getOrder();
    this.getCart();
  }
}

</script>
