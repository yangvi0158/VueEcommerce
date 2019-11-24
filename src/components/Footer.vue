<template>
  <div class="footer">
    <ul class="footer_nav">
        <li class="footer_navItem"><a href="#">關於我們</a></li>
        <li class="footer_navItem"><a href="#">退換貨處理</a></li>
        <li class="footer_navItem"><a href="#">常見問題</a></li>
        <li class="footer_navItem"><a href="#">售後服務</a></li>
    </ul>
    <div class="footer_social">
        <a href="#"><img class="socialIcon" :src="footerIcon_ig"></a>
        <a href="#"><img class="socialIcon" :src="footerIcon_fb"></a>
        <a href="#"><img class="socialIcon" :src="footerIcon_mail"></a>
    </div>
    <p class="footer_copyright">
        COPYRIGHT@<br>
        2019 PLAYSTUFF CO. LTD<br>
        ALL RIGHTS RESERVED<br>
        ｜個人練習作品，非商業用途｜
    </p>
  </div> 
</template>

<script>


export default {
  name: 'Footer',
  components: {
    
  },
  data(){
    return{
      footerIcon_ig: require("../assets/img/footer/Ig_icon.png"),
      footerIcon_fb: require("../assets/img/footer/Fb_icon.png"),
      footerIcon_mail: require("../assets/img/footer/Mail_icon.png"),
    }
  },
  methods:{

  }
}
</script>
