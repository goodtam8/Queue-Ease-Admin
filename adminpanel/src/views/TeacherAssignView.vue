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
<div class="alert alert-primary d-flex align-items-center" role="alert">

<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>
<div>
Teacher Name:{{ teacher.name }}

</div>
</div>

<form class="container my-5" @submit.prevent="join">

    <select class="form-select" aria-label="Default select example" id="course" v-model="selectedcourse" required>
        <option v-for="cs in course.courses" :key="cs" :value="cs._id"> {{ cs._id }} </option>
        </select>


        <button type="submit" class="btn btn-primary">Submit</button>
</form>
    </div>
</template>

<script setup>
//some can be improved using computed making two selection bar
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const course = ref([])
const teacher = ref({
    _id: '',
    staff_id: 1,
    name: 'Credit Card',
    pw: '',
    gender: '',
    email:"",
    phone:121
})
const selectedcourse=ref('');


onMounted(async () => {
    // if there is an id in the route
    if (route.params.id) {
        getCourse();
        getTeacher();
    }
});

const join = async function () {
    // post the booking to the backend
    const response = await fetch(`/api/assign/${selectedcourse.value}/${teacher.value.staff_id}/teacher`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // convert the response to json
    const json = await response.json();
    // log the json
    console.log(json);
    // alert the user
    alert(JSON.stringify(json));
}

const getCourse = async function () {
    // get the booking from the backend
    const response = await fetch('/api/course/cs/all' );
    // convert the response to json
    const json = await response.json();
    // log the json
    console.log(json);
    // set the booking
 // set the booking, copy by value instead of reference
 course.value = json;
    // Wait for the change to get flushed to the DOM
    await nextTick();}


    const getTeacher = async function () {
    // a function to get the booking from the backend
    const response = await fetch('/api/teacher/' + route.params.id);
    // convert the response to json
    const json = await response.json();
    // log the json
    console.log(json);
    // set the booking
    teacher.value = json;
}
</script>