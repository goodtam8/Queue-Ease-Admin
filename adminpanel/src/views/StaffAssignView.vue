<template>
    <div>
    <nav aria-label="breadcrumb">
    
    <ol class="breadcrumb">

        <li class="breadcrumb-item">

            <router-link to="/" >Home</router-link>

        </li>

        <li class="breadcrumb-item">

            <router-link to="/staff" >Staff</router-link>

        </li>

        <li class="breadcrumb-item active" aria-current="page">Update</li>



    </ol>

</nav>
<div class="alert alert-primary d-flex align-items-center" role="alert">

<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>
<div>
Staff Name:{{ staff.name }}

</div>
</div>

<form class="container my-5" @submit.prevent="join">

    <select class="form-select" aria-label="Default select example" id="restaurant" v-model="selectedrestaurant" required >

        <option v-for="cs in rest.restaurants" :key="cs._id" :value="cs._id" >

      {{ cs._id }} + {{ cs.name }}

    </option>
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
const rest = ref([])
const staff = ref({
    _id: '',
    sid: 1,
    name: 'Credit Card',
    pw: '',
    gender: '',
    email:"",
    phone:121
})
const selectedrestaurant=ref('');


onMounted(async () => {
    // if there is an id in the route
    if (route.params.id) {
        getRest();
        getStaff();
    }
});

const join = async function () {
    // post the booking to the backend
    const response = await fetch(`/api/staff/${selectedrestaurant.value}/${staff.value.sid}`, {
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
    getRest();
}

const getRest = async function () {
    // get the booking from the backend
    const response = await fetch('/api/rest/rest/all/' );
    // convert the response to json
    const json = await response.json();
    // log the json
    console.log(json);
    // set the booking
 // set the booking, copy by value instead of reference
 rest.value = json;
    // Wait for the change to get flushed to the DOM
    await nextTick();}


    const getStaff = async function () {
    // a function to get the booking from the backend
    const response = await fetch('/api/staff/' + route.params.id);
    // convert the response to json
    const json = await response.json();
    // log the json
    console.log(json);
    // set the booking
    staff.value = json;
}
</script>