<template>
  <div class="login">
    <div class="loginTop">
      <router-link to="/">
        <img class="loginTopImg" :src="logoImg">  
      </router-link>
    </div>
    <div class="loginMain">
      <form @submit.prevent="signin">
          <h1 class="formTitle">SIGN IN</h1>
          <!--label for="inputEmail"></label-->
          <input type="email" id="inputEmail" class="loginInput" placeholder="EMAIL ADDRESS" autofocus v-model="user.username">
          <!--label for="inputPassword" class="sr-only"></label-->
          <input type="password" id="inputPassword" class="loginInput" placeholder="PASSWORD" v-model="user.password">
          <div class="loginCheckbox">
            <label>
              <input type="checkbox" value="remember-me"> REMEMBER ME
            </label>
          </div>
          <button class="loginBtn" type="submit">登入</button>
          <p class="loginText">PLAY STUFF @2019</p>
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
        //console.log(res.data);
        if(res.data.success){
          vm.$router.push('/admin');
        }
      });
    },
  }
}
</script>
