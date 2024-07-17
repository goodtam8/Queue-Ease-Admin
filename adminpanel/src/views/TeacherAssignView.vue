<template>
    <div>
    <nav aria-label="breadcrumb">
    
    <ol class="breadcrumb">

        <li class="breadcrumb-item">

            <router-link to="/" >Home</router-link>

        </li>

        <li class="breadcrumb-item">

            <router-link to="/teacher" >Teacher</router-link>

        </li>

        <li class="breadcrumb-item active" aria-current="page">Update</li>



    </ol>

</nav>


    <select class="form-select" aria-label="Default select example" id="course" >
        <option v-for="id in course.courses" :key="id" :value="id"> {{ id._id }} </option>
        </select>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const course = ref([])


onMounted(async () => {
    // if there is an id in the route
    if (route.params.id) {
        getCourse();
    }
});

const getCourse = async function () {
    // get the booking from the backend
    const response = await fetch('/api/course/all' );
    // convert the response to json
    const json = await response.json();
    // log the json
    console.log(json);
    // set the booking
 // set the booking, copy by value instead of reference
 course.value = json;
    // Wait for the change to get flushed to the DOM
    await nextTick();}

</script>