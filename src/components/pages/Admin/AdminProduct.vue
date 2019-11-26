<template>
    <!--產品列表-->  
    <div class="adminMainContent">
        <!--loading-->
        <loading 
          :active.sync="isLoading"
          color="#646159"
          height="50"
          width="50"
        ></loading>   
        <div class="adminMainContent-Top">
            <span class="adminBreadcrumbs">產品列表</span>
            <button class="adminBtn" @click="openModal(true)">建立新商品</button>
        </div>
        <table class="tableClass">
            <thead class="tableHead">
                <tr class="mt-4">
                    <th class="tableHead_th mt-4" width="80">分類</th>
                    <th class="tableHead_th">產品名稱</th>
                    <th class="tableHead_th" width="80">原價</th>
                    <th class="tableHead_th" width="80">售價</th>
                    <th class="tableHead_th" width="80">是否啟用</th>
                    <th class="tableHead_th" width="100">編輯</th>
                </tr>
            </thead>
            <tbody class="tableBody">
                <tr v-for="product in products" :key="product.id" class="tableRow mt-4">
                    <td>{{product.category}}</td>
                    <td>{{product.title}}</td>
                    <td>
                        {{product.origin_price|currency}}
                    </td>
                    <td>
                        {{product.price|currency}}
                    </td>
                    <td>
                        <span v-if="product.is_enabled" class="text-success">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm" @click="openModal(false, product)">編輯</button>
                        <button class="btn btn-outline-danger btn-sm" @click="openDeleteModal(product)">刪除</button>
                    </td>

                </tr>
            </tbody>
        </table>

        <!--pagination-->
        <Pagination @updatepage="getProducts" :pages="getPagination"></Pagination>

        <!--修改/新增Modal-->  
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
          aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content border-0">
                  <div class="modal-header  bg-secondary text-white modalHeader">
                      <p class="modal-title" id="exampleModalLabel">新增產品</p>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <img :src="crossImg" style="width:50%">
                      </button>
                  </div>
                  <div class="modal-body">
                      <div class="modal_left">
                          <div>
                              <label for="image">輸入圖片網址</label>
                              <input type="text" class="modalInput" id="image" placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                          </div>
                          <div>
                              <label for="customFile">
                                  或上傳圖片
                                  <i class="fas fa-spinner fa-pulse" v-if="fileUploading"></i>
                              </label>
                              <input type="file" id="customFile" class="modalInput" ref="files" @change="uploadFile">
                          </div>
                          <img :src="tempProduct.imageUrl" class="img-fluid" alt="">
                      </div>
                      <div class="modal_right">
                          <div>
                              <label for="title">產品名稱</label>
                              <input type="text" class="modalInput" id="title" placeholder="請輸入標題" v-model="tempProduct.title">
                          </div>
                          <div class="modal_row">
                              <div class="modal_inputAria">
                                  <label for="category">產品分類</label>
                                  <input type="text" class="modalInput" id="category" placeholder="請輸入分類" v-model="tempProduct.category">
                              </div>
                              <div class="modal_inputAria">
                                  <label for="unit">企劃類別</label>
                                  <input type="unit" class="modalInput" id="unit" placeholder="請輸入企劃類別" v-model="tempProduct.unit">
                              </div>
                          </div>
                          <div class="modal_row">
                              <div class="modal_inputAria">
                                  <label for="origin_price">原價</label>
                                  <input type="text" class="modalInput" id="origin_price" placeholder="請輸入原價" v-model="tempProduct.origin_price">
                              </div>
                              <div class="modal_inputAria">
                                  <label for="price">售價</label>
                                  <input type="text" class="modalInput" id="price" placeholder="請輸入售價" v-model="tempProduct.price">
                              </div>
                          </div>
                          <div class="modal_row">
                              <div class="modal_inputAria">
                                  <label for="size">產品規格</label>
                                  <input type="text" class="modalInput" id="size" placeholder="請輸入產品尺寸" v-model="tempProduct.size">
                              </div>
                              <div class="modal_inputAria">
                                  <label for="ingredient">產品材質/成分</label>
                                  <input type="text" class="modalInput" id="ingredient" placeholder="請輸入產品材質或成分" v-model="tempProduct.ingredient">
                              </div>
                          </div>
                          <div>
                              <div>
                                  <input type="checkbox" id="is_enabled" v-model="tempProduct.is_enabled" :true-value="1" :false-value="0">
                                  <label class="form-check-label" for="is_enabled">
                                  是否啟用
                                  </label>
                              </div>
                          </div>
                          <div class="modal_footer">
                              <div class="modal_footerBtn">
                                  <button type="button" class="btn btn-secondary" @click="updateProduct">確認</button>
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
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white modalHeader">
                <p class="modal-title">刪除產品</p>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <img :src="crossImg" style="width:50%">
                </button>
            </div>
            <div class="modal-body">
                是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" @click="deleteProduct">確認刪除</button>
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
  name: 'AdminProduct',
  components: {
    Pagination,
  },
  data(){
    return{
      crossImg: require("@/assets/img/modal/cross.png"),
      products: [],
      tempProduct: {},
      isNew: false,
      isLoading: false,
      fileUploading: false,
      pagination: {},
      getPagination: {},
    }
  },
  methods:{
    //取得產品列表
    getProducts( page=1 ){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((res)=>{
        vm.isLoading = false;
        //vm.pagination = res.data.pagination;
        vm.getPagination = res.data.pagination;
        //console.log('商品列表',res.data);
        vm.products = res.data.products;
        //console.log('拿到商品列表！',vm.products);
      })
    },
    //修改&新增產品資料
    updateProduct(){
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
      let httpMethod = 'post';
      const vm = this;
      if(!vm.isNew){
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'put';
      }
      console.log('我是temp',this.tempProduct)
      this.$http[httpMethod](api, {data: vm.tempProduct}).then((res)=>{
        //console.log('更新商品列表',res.data);
        if(res.data.success){
          $('#productModal').modal('hide');
          vm.getProducts();
        }else{
          $('#productModal').modal('hide');
          vm.getProducts();
          //console.log('更新商品列表失敗');
        }
      })
    },
    //刪除資料
    deleteProduct(){
      //console.log(this.tempProduct);
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      vm.isLoading = true;
      $('#delProductModal').modal('hide');
      this.$http.delete(api).then((res)=>{
        vm.isLoading = false;
        vm.getProducts();
        //console.log('刪除商品',res.data);
      })
    },


    //打開互動視窗
    openModal(isNew, item){
      if(isNew){
        this.tempProduct = {};
        this.isNew = true;
        //console.log('新',this.tempProduct);
      }else{
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
        //console.log('舊',this.tempProduct);
      }
      $('#productModal').modal('show');
    },
    openDeleteModal(item){
      this.tempProduct = Object.assign({}, item);
      $('#delProductModal').modal('show');
    },

    //上傳圖片
    uploadFile(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      vm.fileUploading = true;
      const uploadedFile = this.$refs.files.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      this.$http.post(api, formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res)=>{
        vm.fileUploading = false;
        //console.log(res.data);
        if(res.data.success){
          vm.$set(vm.tempProduct, 'imageUrl', res.data.imageUrl);
        }else{
          vm.$bus.$emit('message:push', res.data.message, 'secondary');
        }
      });
    }
  },
  created(){
    this.getProducts();
  }
}
</script>

