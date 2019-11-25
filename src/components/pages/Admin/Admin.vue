<template>
   <!--後台主要頁面-->
   <div class="admin">
    <NavbarAdmin/>
    <div class="adminMain">
      <SidebarAdmin/>
      <router-view/>
    </div>
  </div>
</template>

<script>

import NavbarAdmin from '@/components/NavbarAdmin';
import SidebarAdmin from '@/components/SidebarAdmin';

export default {
  name: 'Admin',
  components: {
    NavbarAdmin,
    SidebarAdmin,
  },
}
</script>

