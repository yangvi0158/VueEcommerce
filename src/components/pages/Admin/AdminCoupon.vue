<template>
    <!--優惠券列表-->  
    <div class="adminMainContent">
        <!--loading-->
        <loading 
          :active.sync="isLoading"
          color="#646159"
          :height="loadingScale"
          :width="loadingScale"
        ></loading>   
        
        <div class="adminMainContent-Top">
            <span class="adminBreadcrumbs">優惠券列表</span>
            <button class="adminBtn" @click="openModal(true)">建立新優惠券</button>
        </div>
        <table class="tableClass">
            <thead class="tableHead">
                <tr class="mt-4">
                    <th class="tableHead_th mt-4">標題</th>
                    <th class="tableHead_th" width="100">折數</th>
                    <th class="tableHead_th" width="100">優惠代碼</th>
                    <th class="tableHead_th" width="100">是否啟用</th>
                    <th class="tableHead_th" width="100">編輯</th>
                </tr>
            </thead>
            <tbody class="tableBody">
                <tr v-for="coupon in coupons" :key="coupon.due_date" class="tableRow mt-4">
                    <td>{{coupon.title}}</td>
                    <td>{{coupon.percent}}折</td>
                      <td>{{coupon.code}}</td>
                    <td>
                        <span v-if="coupon.is_enabled" class="text-success">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm" @click="openModal(false, coupon)">編輯</button>
                        <button class="btn btn-outline-danger btn-sm" @click="openDeleteModal(coupon)">刪除</button>
                    </td>

                </tr>
            </tbody>
        </table>

        <!--pagination-->
        <Pagination @updatepage="getCoupons" :pages="getPagination"></Pagination>

        <!--修改/新增Modal-->  
        <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
          aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-md" role="document">
              <div class="modal-content border-0">
                  <div class="modal-header  bg-secondary text-white modalHeader">
                      <p class="modal-title" id="exampleModalLabel">
                          新增優惠券
                      </p>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <img :src="crossImg" style="width:50%">
                      </button>
                  </div>
                  <div class="modal-body">
                      <div class="modal_right">
                          <div>
                              <label for="title">優惠券標題</label>
                              <input type="text" class="modalInput" id="title" placeholder="請輸入標題" v-model="tempCoupon.title">
                          </div>
                          <div>
                              <label for="code">優惠代碼</label>
                              <input type="text" class="modalInput" id="code" placeholder="請輸入代碼" v-model="tempCoupon.code">
                          </div>
                          <div>
                              <label for="percent">優惠折數</label>
                              <input type="text" class="modalInput" id="percent" placeholder="請輸入折數百分比(ex:85)" v-model="tempCoupon.percent">
                          </div>
                          <div>
                              <div>
                                  <input type="checkbox" id="is_enabled" v-model="tempCoupon.is_enabled" :true-value="1" :false-value="0">
                                  <label class="form-check-label" for="is_enabled">
                                  是否啟用
                                  </label>
                              </div>
                          </div>
                          <div class="modal_footer">
                              <div class="modal_footerBtn">
                                  <button type="button" class="btn btn-secondary" @click="updateCoupon">確認</button>
                              </div>
                              <div class="modal_footerBtn">
                                  <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>


    <!--刪除Modal-->
    <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white modalHeader">
                <p class="modal-title">刪除優惠券</p>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <img :src="crossImg" style="width:50%">
                </button>
            </div>
            <div class="modal-body">
                是否刪除 <strong class="text-danger">{{tempCoupon.title}}</strong> 優惠券(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" @click="deleteCoupon">確認刪除</button>
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            </div>
            </div>
        </div>
    </div>


  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '@/components/Pagination';

export default {
  name: 'AdminCoupon',
  components: {
    Pagination,
  },
  data(){
    return{
      crossImg: require("@/assets/img/modal/cross.png"),
      coupons: [],
      tempCoupon: {},
      isNew: false,
      isLoading: false,
      getPagination: {},
      loadingScale: 50,
    }
  },
  methods:{
    //拿取優惠券資料
    getCoupons( page=1 ){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((res)=>{
        vm.isLoading = false;
        vm.getPagination = res.data.pagination;
        //console.log('優惠券列表',res.data);
        vm.coupons = res.data.coupons;
        //console.log('拿到優惠券列表！',vm.coupons);
      })
    },
    //「新增&修改」優惠券
    updateCoupon(){
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
      let httpMethod = 'post';
      const vm = this;
      if(!vm.isNew){
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = 'put';
      }
      //console.log('我是temp',this.tempCoupon);
      this.$http[httpMethod](api, {data: vm.tempCoupon}).then((res)=>{
        //console.log('更新優惠券列表',res.data);
        if(res.data.success){
          $('#couponModal').modal('hide');
          vm.getCoupons();
        }else{
          $('#couponModal').modal('hide');
          vm.getCoupons();
          //console.log('更新優惠券列表失敗');
        }
      })
    },
    //刪除單筆優惠券
    deleteCoupon(){
      //console.log(this.tempCoupon);
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
      vm.isLoading = true;
      $('#delCouponModal').modal('hide');
      this.$http.delete(api).then((res)=>{
        vm.isLoading = false;
        //console.log('刪除優惠券',res.data);
        vm.getCoupons();
      })
    },


    //打開「新增&修改」互動視窗
    openModal(isNew, item){
      if(isNew){
        this.tempCoupon = {};
        this.isNew = true;
        //console.log('新',this.tempProduct);
      }else{
        this.tempCoupon = Object.assign({}, item);
        this.isNew = false;
        //console.log('舊',this.tempProduct);
      }
      $('#couponModal').modal('show');
    },
    //打開「刪除」互動視窗
    openDeleteModal(item){
      this.tempCoupon = Object.assign({}, item);
      $('#delCouponModal').modal('show');
    },
  },
  created(){
    this.getCoupons();
  }
}
</script>

