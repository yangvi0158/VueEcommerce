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
  }
}
</script>
