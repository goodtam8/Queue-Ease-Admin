<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'


const logout = function() {
  localStorage.removeItem('token');
  location.reload()
}

</script>

<template>
  <header>
    <button type="button" class="btn btn-primary my-4" @click="logout">Log Out</button>
  </header>

  <RouterView />
</template>
