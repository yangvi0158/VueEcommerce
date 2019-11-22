<template>
  <div class="dashboard">
    <router-view/>
    <Alert/>
  </div>
</template>

<script>

import Alert from './Alert';

export default {
  name: 'Dashboard',
  components: {
    Alert,
  },
}
</script>


<style lang="sass">
    

</style>
