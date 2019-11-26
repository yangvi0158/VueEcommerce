<template>
    <!--訂單列表-->
    <div class="adminMainContent">
        <!--loading-->
        <loading 
          :active.sync="isLoading"
          color="#646159"
          height="50"
          width="50"
        ></loading> 
        <div class="adminMainContent-Top">
            <span class="adminBreadcrumbs">訂單列表</span>
        </div>
        <table class="tableClass">
            <thead class="tableHead">
                <tr class="mt-4">
                    <th class="tableHead_th mt-4">購買時間</th>
                    <th class="tableHead_th">訂單編號</th>
                    <th class="tableHead_th">Email</th>
                    <th class="tableHead_th">購買款項</th>
                    <th class="tableHead_th">應付金額</th>
                    <th class="tableHead_th">是否付款</th>
                </tr>
            </thead>
            <tbody class="tableBody">
                <tr v-for="order in orders" :key="order.create_at" class="tableRow mt-4">
                    <td>{{order.create_at | leadingZero}}</td>
                    <td>{{ order.create_at }}</td>
                    <td>{{ order.user.email }}</td>
                    <td>
                        <div v-for="item in order.products" :key="item.id" style="list-style:none;">
                            <span>{{ item.product.title}} {{ item.qty }}個</span>
                        </div>
                    </td>
                    <td>NT{{ Math.round(order.total)|currency }}</td>
                    <td>
                        <span v-if="order.is_paid" class="text-success">付款成功</span>
                        <span v-else>尚未付款</span>
                    </td>
                </tr>
            </tbody>
        </table>

        <!--pagination-->
        <Pagination @updatepage="getOrders" :pages="getPagination"></Pagination>
    </div>
</template>

<script>
import Pagination from '@/components/Pagination';

export default {
  name: 'AdminOrder',
  components: {
    Pagination,
  },
  data(){
    return{
      orders: [],
      getPagination: {},
      isLoading: false,
    }
  },
  filters: {
    //設定時間格式與補上時間的"0"
    leadingZero(value) {
      let yy = new Date(value*1000).getFullYear();
      let mm = (new Date(value*1000).getMonth()+1<10 ? '0' : '')+(new Date(value*1000).getMonth()+1);
      let dd = (new Date(value*1000).getDate()<10 ? '0' : '')+new Date(value*1000).getDate();
      let h = (new Date(value*1000).getHours()<10 ? '0' : '')+new Date(value*1000).getHours();
      let m = (new Date(value*1000).getMinutes()<10 ? '0' : '')+new Date(value*1000).getMinutes();
      return `${yy}-${mm}-${dd} ${h}:${m}`;
    }
  },
  methods: {
    getOrders(page = 1){
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/orders?page=${page}`;
        vm.isLoading = true;
        this.$http.get(api).then((res) => {
            vm.orders = res.data.orders;
            vm.getPagination = res.data.pagination;
            vm.isLoading = false;
            //console.log('取得訂單資料',res);
        });
    },
  },
  created() {
    this.getOrders();
  },
}
</script>

