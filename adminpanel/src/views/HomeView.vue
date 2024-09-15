<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed } from 'vue';
const router = useRouter();
const route = useRoute();
</script>

<template>
  <main>
<div class="content">
    <div class=" jumbotron-fluid bg-light mt-8 p-5" >
        <h1 class="display-4">QueueEase</h1>
        <p class="lead">
            It is used for control the restaurant,staff,
            user management.
            </p>
        <hr class="my-4">
      
          <RouterLink :to="`/rest`" class="btn btn-primary btn-lg" role="button"> Restaurant</RouterLink>
      </div>

    </div>
</main>
</template>

<style>

</style>
