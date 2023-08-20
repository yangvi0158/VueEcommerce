<template>
  <div class="customerMain">
    <SidebarCustomer/>

    <!--coupon-->
    <div class="couponMain">
        <div class="couponMain_Left">
          <img src="@/assets/img/coupon/coupon.png">
        </div>
        <div class="couponMain_Right">
          <div class="couponMain_Right_Top">
            <div class="couponMain_Rec redRec"></div>
            <p class="couponMain-Title">歡慶聖誕</p>
            <div class="couponMain_Rec greenRec"></div>
          </div>
          <p class="coupon_description">
          Celebrate Christmas with PLAY STUFF!<br>
          Copy the code below to get a discount coupon,<br>
          Enjoy an 8% off  discount with no minimum spend.<br>
          </p>
          <div class="couponMain_Right_Bottom">
            <span class="copy_description">Copy Code</span>
            <div class="copy">
              <p class="copy_btn" id="Coupon_Code" 
              ref="copy" 
              data-clipboard-action="copy" 
              data-clipboard-target="#Coupon_Code" 
              @click="CopyCouponCode">
                {{ couponCode }}
              </p>
              <span class="copied" v-if="!isCopied"></span>
              <span class="copied" v-if="isCopied">Copied!</span>
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
  name: 'CustomerCoupon',
  components: {
    SidebarCustomer,
  },
  data(){
    return{
      couponCode: 'CHRISTMAS',
      copyBtn: null,
      isCopied: false,
    }
  },
  methods:{
    CopyCouponCode(){
      let vm = this;
      let clipboard = vm.copyBtn;
      clipboard.on('success', function() {
          console.log('Copied Successfully');
          vm.isCopied = true;
      });
      clipboard.on('error', function() {
          console.log('Copied Failed');
      });
    },
  },
  mounted() {
    //抓要copy的元素
    this.copyBtn = new this.clipboard(this.$refs.copy);
  },
}
</script>

<style>
.couponMain{
  flex: 5;
  background-color: #F7F6F3;
  display: flex;
  flex-direction: row;
  height: 330px;
  margin-bottom: 200px;
}
.couponMain_Left,.couponMain_Right{
  height: 100%;

}
.couponMain_Right{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 50px;
}
.couponMain_Left img{
  height: 100%;
  opacity: .8;
}

.couponMain_Right_Top,
.coupon_description,
.couponMain_Right_Bottom{
  width:65%;
  min-width: 200px;
  margin-bottom: 30px;
  color: #494948;
}
.couponMain_Right_Top{
  display: flex;
  flex-direction: row;;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 15%;
  height: 30px;

}
.couponMain-Title{
  white-space: nowrap;
  font-size: 1.3rem;
  margin: 0;
  letter-spacing: .4rem;
  display: block;
}
.couponMain_Rec{
  width: 25%;
  height: 100%;
}
.redRec{
  background-color: #F16D6D;
}
.greenRec{
  background-color: #86AE5E;
}
.coupon_description{
  letter-spacing: .15rem;
  font-size: .9rem;
  white-space: nowrap;

}
.couponMain_Right_Bottom{
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.copy_description{

}
.copy{
  width: 65%;
  text-align: center;
}
.copied{
  border: solid 1px transparent;
  font-size: .6rem;
  opacity: .3;
  height: 10px;
}
.copy_btn{
  border: dashed 1px black;
  padding: 5px 0;
  text-align: center;
  width: 100%;
  opacity: .3;
  margin: 0;
}
.copy_btn:hover{
  opacity: 1;
  transition: .2s;
}

@media only screen and (min-width: 1300px) {
  .couponMain{
  }
  .couponMain_Right{
    width: 100%;
    margin-left: 100px;
  }
  .couponMain_Right_Top,
  .coupon_description,
  .couponMain_Right_Bottom{
    max-width: 450px;
    width: 100%;
    min-width: 200px;
    margin-bottom: 30px;
    color: #494948;
  }
  .couponMain_Right_Top{
    min-height: 30px;
    margin-top: 50px;
  }
}


@media only screen and (max-width: 690px) {
.couponMain{
  width: 100%;
  height: 250px;
  margin-bottom: 100px;
}
.couponMain_Left,.couponMain_Right{
  height: 100%;

}
.couponMain_Right{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 50px;
}
.couponMain_Left img{
  height: 100%;
  opacity: .8;
}

.couponMain_Right_Top,
.coupon_description,
.couponMain_Right_Bottom{
  width:65%;
  min-width: 200px;
  margin-bottom: 30px;
  color: #494948;
}
.couponMain_Right_Top{
  display: flex;
  flex-direction: row;;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 15%;
  height: 30px;

}
.couponMain-Title{
  white-space: nowrap;
  font-size: 1rem;
  margin: 0;
  letter-spacing: .4rem;
  display: block;
}
.couponMain_Rec{
  width: 20%;
  height: 20px;
}
.redRec{
  background-color: #F16D6D;
}
.greenRec{
  background-color: #86AE5E;
}
.coupon_description{
  letter-spacing: .15rem;
  font-size: .7rem;
  white-space: nowrap;

}
.couponMain_Right_Bottom{
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.copy_description{
  letter-spacing: .15rem;
  font-size: .7rem;
}
.copy{
  width: 65%;
  text-align: center;
}
.copied{
  border: solid 1px transparent;
  font-size: .4rem;
  opacity: .3;
  height: 10px;
}
.copy_btn{
  border: dashed 1px black;
  padding: 5px 0;
  text-align: center;
  width: 100%;
  opacity: .3;
  margin: 0;
}
.copy_btn:hover{
  opacity: 1;
  transition: .2s;
}


}

@media only screen and (max-width: 550px){
  .couponMain{
    height: 250px;
    min-width: 360px;
  }
  .couponMain_Left{
    display: none;
  }
  .couponMain_Right{
    width: 100%;
    margin: 0;
  }
  .copied{
    font-size: .9rem;
  }
}


</style>
