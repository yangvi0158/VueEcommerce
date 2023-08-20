<template>
  <div class="footer">
    <ul class="footer_nav">
        <li class="footer_navItem"><a href="#">About Us</a></li>
        <li class="footer_navItem"><a href="#">Privacy Policy</a></li>
        <li class="footer_navItem"><a href="#">User Agreement</a></li>
        <li class="footer_navItem"><a href="#">Declaration</a></li>
    </ul>
    <div class="footer_social">
        <a href="#"><img class="socialIcon" :src="footerIcon_ig"></a>
        <a href="#"><img class="socialIcon" :src="footerIcon_fb"></a>
        <a href="#"><img class="socialIcon" :src="footerIcon_mail"></a>
    </div>
    <p class="footer_copyright">
        COPYRIGHT@<br>
        2023 PLAYSTUFF CO. LTD<br>
        ALL RIGHTS RESERVED<br>
        ｜Person Side Project｜
    </p>
  </div> 
</template>

<script>


export default {
  name: 'Footer',
  data(){
    return{
      footerIcon_ig: require("../assets/img/footer/Ig_icon.png"),
      footerIcon_fb: require("../assets/img/footer/Fb_icon.png"),
      footerIcon_mail: require("../assets/img/footer/Mail_icon.png"),
    }
  },
}
</script>
