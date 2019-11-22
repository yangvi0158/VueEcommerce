<template>
  <div class="customerMain" style="flex-direction: column; justify-content: center; align-items: center;">
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
                        <td style="min-width: 200px">{{ item.product.title }}</td>
                        <td width="100">{{ item.qty }}</td>
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
  components: {
  },
  data(){
    return{
      crossImg: require("@/assets/img/cross_small_black.png"),
      addImg: require("@/assets/img/cart/add.png"),
      cutImg: require("@/assets/img/cart/sub.png"),
      cartProducts: [],
      isDelete: false,
      tempProduct: {},
      orderId: '',
      order: {
        user: {},
      },
    }
  },
  methods:{
    getOrder(){
        const vm = this;
        console.log('getOrder')
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
        this.$http.get(api).then((res) => {
            vm.order = res.data.order;
            console.log('取得訂單資料',res);
            this.$bus.$emit('update:cart');
        });
    },
    payOrder(){
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
        //vm.isLoading = true;
        this.$http.post(api).then((res) => {
            if(res.data.success){
                vm.getOrder();
                console.log('付款完成',res);
                this.$bus.$emit('update:cart');
            }else{
                console.log('付款失敗',res);
            }
            //vm.isLoading = false;
            //vm.getPagination = res.data.pagination;
        });
    },
    getCart(){
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        const vm = this;
        this.$http.get(api).then((res) => {
            vm.cartProducts = res.data.data;
            console.log('getCarts!',res.data);
        });
    },
  },
  computed:{

  },
  created() {
    this.orderId = this.$route.params.orderId; //透過路由取得
	  console.log(this.orderId);
    this.getOrder();
    this.getCart();
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
