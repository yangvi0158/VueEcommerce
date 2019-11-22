<template>
   <div class="admin">
    <NavbarAdmin/>
    <div class="adminMain">
      <SidebarAdmin/>
      <router-view/>
    </div>
  </div>
</template>

<script>

import NavbarAdmin from '../NavbarAdmin';
import SidebarAdmin from '../SidebarAdmin';

export default {
  name: 'Admin',
  components: {
    NavbarAdmin,
    SidebarAdmin,
  },
  data(){
    return{
      
    }
  }
}
</script>

