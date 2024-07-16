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
        <h1 class="display-4">UniTrack</h1>
        <p class="lead">
            It is used for control the course,teacher,
            student management.
            </p>
        <hr class="my-4">
      
          <RouterLink :to="`/course`" class="btn btn-primary btn-lg" role="button"> Course</RouterLink>
      </div>

    </div>
</main>
</template>

<style>

</style>
