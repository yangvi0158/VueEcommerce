<template>
  <div class="login">
    <div class="loginTop">
      <router-link to="/">
        <img class="loginTopImg" :src="logoImg">  
      </router-link>
    </div>
    <div class="loginMain">
      <form @submit.prevent="signin">
          <h1 class="formTitle">Sign In (CMS)</h1>
          <!--label for="inputEmail"></label-->
          <input type="email" id="inputEmail" class="loginInput" placeholder="EMAIL ADDRESS" autocomplete="off" v-model="user.username">
          <!--label for="inputPassword" class="sr-only"></label-->
          <input type="password" id="inputPassword" class="loginInput" placeholder="PASSWORD" v-model="user.password" autocomplete="off">
          <div class="loginCheckbox">
            <label>
              <input type="checkbox" value="remember-me"> REMEMBER ME
            </label>
          </div>
          <button class="loginBtn" type="submit">Login</button>
          <p class="loginText">PLAY STUFF @2023</p>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: '',
  data(){
    return{
      logoImg: require("@/assets/img/navbar/logo.png"),
      user:{
        username: '',
        password: '',
      }
    }
  },
  methods:{
    signin(){
      const api = `${process.env.APIPATH}/admin/signin`;
		  const vm = this;
      this.$http.post(api, vm.user).then((res) => {
        if(res.data.success){
          const token = res.data.token;
          const expired = res.data.expired;
          console.log(token, expired);
          document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
          vm.$router.push('/admin');
        }else{
          alert('Please try again later')
        }
      });
    },
  }
}
</script>
