// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './bus';

import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

import 'bootstrap';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import currencyFilter from './filters/currency';

import AOS from 'aos';
import "aos/dist/aos.css";

import clipboard from 'clipboard';
Vue.prototype.clipboard = clipboard;

import VuePhotoZoomPro from "vue-photo-zoom-pro";
Vue.use(VuePhotoZoomPro);

Vue.filter('currency', currencyFilter);

Vue.component('Loading', Loading);

//設置為 false 以阻止 vue 在啟動時生成生產提示
Vue.config.productionTip = false;

//VeeValidate驗證器
import VeeValidate, { Validator } from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
const i18n = new VueI18n({
	locale: 'zhTW'
});
Vue.use(VeeValidate, {
	i18n,
	dictionary: {
		zhTW
	}
});

/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  el: '#app',
  created(){
    //aos動畫
    AOS.init({
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
      initClassName: 'aos-init', // class applied after initialization
      animatedClassName: 'aos-animate', // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
      

      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 150, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 500, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });
  },
  components: { App },
  template: '<App/>'
})

axios.defaults.withCredentials = true;

router.beforeEach((to, from, next)=>{
  if(to.meta.requiresAuth){
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((res)=>{  
      console.log('是否登入狀態',res.data);
      if(res.data.success){
        next();  
      }else{
        next({
          path: '/login',  
        });
      }
    });
  }else{
    next();
  }
});