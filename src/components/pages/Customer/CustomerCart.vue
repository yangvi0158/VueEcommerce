<template>
    <!--顧客購物車頁面-->
    <div class="customerMain" style="flex-direction: column; justify-content: center; align-items: center;">
      <!--loading-->
      <loading 
        :active.sync="isLoading"
        color="#646159"
        :height="loadingScale"
        :width="loadingScale"
      ></loading>  
      <!--上方進度條-->
      <div class="customerCart_Top">
        <div class="customerCart-process">
          <div class="customerCart-process-circle" style="background-color: #646159"></div>
          <p class="customerCart-process-title">① Cart</p>
        </div>
        <div class="customerCart-process">
          <div class="customerCart-process-circle"></div>
          <p class="customerCart-process-title">② Information Confirm</p>
        </div>
        <div class="customerCart-process">
          <div class="customerCart-process-circle"></div>
          <p class="customerCart-process-title">③ Payment</p>
        </div>
      </div>

      <div class="customerCart-Main" v-if="cartProducts.total">
        <!--購物車內產品列表-->
        <div class="customerCart-Left">
          <ul class="customerCart-ul">
            <li class="customerCart-li" v-for="item in cartProducts.carts">
              <img :src="item.product.imageUrl" width="30%" 
              :class="{'disabled': true,'deleteFavItem': deleteItem === item.id}">
              <div class="customerCart-li-detail" :class="{'disabled': true,'deleteFavItem': deleteItem === item.id}">
                <div class="customerCart-li-top">
                  <div class="customerCart-li-title">{{item.product.title}}</div>
                  <img :src="crossImg" @click="deleteCartItem(item.id)">
                </div>
                NT{{item.product.price|currency}}
                <div class="customerCart-li-bottom">
                  <span>Count: {{item.qty}}</span>
                  <div class="customerCart-li-total">NT{{item.total|currency}}</div>
                </div>
              </div>

            </li>
          </ul>
        </div>
        <!--訂購資訊填寫-->
        <div class="customerCart-Right">
          <div class="customerCart-detail">
            <p class="customerCart-title">Shopping Cart</p>
            <div class="customerCart-coupon" :class="{'cartOpacity': couponAdd}">
              <input type="text" class="customerCart-coupon-input"
              placeholder="Please enter a coupon code"
              v-model="coupon_code"
              @keyup.enter="addCoupon">
              <button class="customerCart-coupon-btn" @click="addCoupon">Add</button>
            </div>
            <p v-show="couponAddSuccess === 'true'" class="couponStatus text-success">已套入優惠券</p>
            <p v-show="couponAddSuccess === 'false'" class="couponStatus text-muted">查無此優惠券</p>
            <div class="customerCart-total">
              <div>Total</div>
              <div>NT{{cartProducts.total|currency}}</div>
            </div>
            <div v-if="cartProducts.final_total !== cartProducts.total"
            class="customerCart-total text-success">
              <div>Total</div>
              <div>NT{{ Math.round( cartProducts.final_total ) |currency}}</div>
            </div>
          </div>
          <div class="customerCart-form">
            <p class="customerCart-title">Order Information</p>
            <form class="customerCart-formMain" @submit.prevent="createOrder">
              <div class="form-group">
                  <label for="useremail">Email<span class="text-danger">*</span></label>
                  <input type="email" class="form-control" name="email" id="useremail"
                  placeholder="Email" v-model="form.user.email" v-validate="'required|email'">
                  <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
              </div>

              <div class="form-group">
                  <label for="username">Name<span class="text-danger">*</span></label>
                  <input type="text" class="form-control" name="name" id="username"
                  placeholder="Name" v-model="form.user.name" v-validate="'required'">
                  <span class="text-danger" v-if="errors.has('name')">Name Required</span>
              </div>

              <div class="form-group">
                  <label for="usertel">Phone Number<span class="text-danger">*</span></label>
                  <input type="tel" class="form-control" name="tel" id="usertel"
                  placeholder="Phone Number" v-model="form.user.tel" v-validate="'required|digits:10'">
                  <span class="text-danger" v-if="errors.has('tel')">
                      {{ errors.first('tel').replace(/tel/,'電話') }}
                  </span>
              </div>

              <div class="form-group">
                  <label for="useraddress">Address<span class="text-danger">*</span></label>
                  <input type="address" class="form-control" name="address" v-validate="'required'"
                  id="useraddress" placeholder="Address" v-model="form.user.address">
                  <span class="text-danger" v-if="errors.has('address')">Address Required</span>
              </div>

              <div class="form-group">
              <label for="message">Note</label>
              <textarea name="message" id="message" class="form-control" 
              cols="30" rows="4" v-model="form.message"></textarea>
              </div>

              <button class="customerCart-form-submit">Check Out</button>
            </form>
          </div>
        </div>
      </div>
      <p v-else class="emptyCart">There is no item in cart.</p>
    </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'CustomerCart',
  data(){
    return{
      crossImg: require("@/assets/img/other/cross_small_black.png"),
      addImg: require("@/assets/img/cart/add.png"),
      cutImg: require("@/assets/img/cart/sub.png"),
      cartProducts: [],
      isLoading: false,
      loadingScale: 50,
      tempProduct: {},
      coupon_code: '',
      couponAdd: false,
      couponAddSuccess: '',
      deleteItem: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    }
  },
  methods:{
    //取得購物車資訊
    getCart(){
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        const vm = this;
        vm.isLoading = true;
        this.$http.get(api).then((res) => {
            vm.cartProducts = res.data.data;
            vm.isLoading = false;
            console.log('getCarts!',res.data);
        });
    },
    //刪除購物車項目
    deleteCartItem(id){
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
        const vm = this;
        vm.deleteItem = id;
        vm.$http.delete(api).then((res) => {
          console.log('delete一筆商品',res.data);
          vm.getCart();
          vm.$bus.$emit('update:cart');
        });
    },
    //加入優惠券
    addCoupon(){
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
        const vm = this;
        const coupon = {
          code: vm.coupon_code,
        };
        this.couponAdd = true;
        this.$http.post(api,{data: coupon}).then((res) => {
            vm.couponAdd = false;
            vm.coupon_code = '';
            console.log(res.data);
            if(res.data.success){
              vm.couponAddSuccess = 'true';
              console.log('套用優惠券');
              vm.getCart();
            }else{
              vm.couponAddSuccess = 'false';
            }
        });
    },
    //送出&建立訂單
    createOrder(){
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
        const vm = this;
        const order = vm.form;
        console.log('order',order);
        //進行驗證
        this.$validator.validate().then(result=>{
          //如果驗證通過
          if(result){
            console.log('驗證成功',order);
            //送出表單
            this.$http.post(api, { data: order }).then((res) => {
                    console.log(res.data)
                    if(res.data.success){
                        console.log('新增訂單！',res.data);
                        vm.$router.push(`/order/${res.data.orderId}`);
                        console.log('vm.form',vm.form);
                    }else{
                        console.log('新增訂單失敗',res.data);
                    }
                });
          //如果驗證不通過
          }else{
                console.log('欄位不完整',order);
            }
        });	
    },
  },
  created() {
    this.getCart();
  },
}

</script>
