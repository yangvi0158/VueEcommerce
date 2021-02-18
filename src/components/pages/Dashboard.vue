<template>
    <div class="dashboard">
      <keep-alive>
        <router-view/>
      </keep-alive>
      <Alert/>
    </div>
</template>

<script>

import Alert from '@/components/Alert';

export default {
  name: 'Dashboard',
  components: {
    Alert,
  },
  created(){
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    console.log('token', token)
    this.$http.defaults.headers.common.Authorization = token;
  }
}
</script>
