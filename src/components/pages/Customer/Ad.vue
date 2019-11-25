<template>
  <!--首頁廣告頁-->
  <div class="ad">
    <!--Top-->
    <div class="adTop">
        <div class="adTop_L">
          <img class="adTop_L_Img" :src="adImg_1" data-aos="fade-right" data-aos-anchor="#adTop">
        </div>
        <div class="adTop_R">
          <div class="adTop_R_Text" data-aos="fade-left" data-aos-anchor="#adTop">
            <span class="adTop_Text">CHRISTMAS</span>
            <span class="adTop_Text">CHRISTMAS</span>
            <span class="adTop_Text">CHRISTMAS</span>
            <span class="adTop_Text">CHRISTMAS</span>
          </div>
          <div class="adTop_R_Rec">
            <div class="adTop_Rec1" data-aos="zoom-in" data-aos-anchor="#adTop" data-aos-delay="200"></div>
            <div class="adTop_RecGroup">
              <div class="adTop_Rec2" data-aos="zoom-in" data-aos-anchor="#adTop" data-aos-delay="500"></div>
              <div class="adTop_Rec3" data-aos="zoom-in" data-aos-anchor="#adTop" data-aos-delay="800"></div>
            </div>
          </div>
        </div>
    </div>
    <!--Center-->
    <div class="adCenter">
      <div class="adCenter_L" data-aos="fade-right">
        <p class="adCenter_Text">WHAT ARE YOU GOING TO DO<br><span>ON CHRISTMAS?</span></p>
        <div class="adCenter_Img">
          <img class="adCenter_Img1" :src="adImg_2">
          <div class="AfterImg_Text">Stay With Loved Ones</div>
        </div>
      </div>
      <div class="adCenter_R" data-aos="fade-left" data-aos-delay="150">
        <div class="adCenter_Img">
          <img class="adCenter_Img2" :src="adImg_3">
          <div class="AfterImg_Text">Chill With Friends</div>
        </div>
      </div>
    </div>
    <!--Bottom-->
    <div class="adBottom">
      <div class="adBottom_L">
        <div class="adBottom_L_Text">
          <p class="adBottom_title" data-aos="fade-right" data-aos-delay="500">CHILDISHNESS<br>HAPPINESS</p>
          <p class="adBottom_p" data-aos="fade-right" data-aos-delay="700">
          MAKE THIS CHRISTMAS A BIT DIFFERENT,<br>
          COME FIND HUNDREDS OF SURPRISES.<br>
          MAYBE YOU WILL SURPRISE YOURSELF!<br>
          </p>
          <p class="adBottom_p adBottom_white" data-aos="fade-right" data-aos-delay="900">
          READY TO BE THE TALKING POINT<br>
          DURING CHRISMAS PARTIES?
          </p>
        </div>
      </div>
      <div class="adBottom_R">
        <img class="adBottom_Img" :src="adImg_4" data-aos="fade-up">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ad',
  data(){
    return{
      adImg_1: require("@/assets/img/ad/homepage_1.png"),
      adImg_2: require("@/assets/img/ad/homepage_2.png"),
      adImg_3: require("@/assets/img/ad/homepage_3.png"),
      adImg_4: require("@/assets/img/ad/homepage_4.png"),
    }
  }
}
</script>

