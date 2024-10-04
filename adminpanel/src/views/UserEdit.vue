<template>
    <div>
    <form @submit.prevent="updateUser()">
    
    
    
        <nav aria-label="breadcrumb">
    
    
    
            <ol class="breadcrumb">
    
    
    
                <li class="breadcrumb-item">
    
    
    
                    <router-link to="/">Home</router-link>
    
    
    
                </li>
    
    
    
                <li class="breadcrumb-item">
    
    
    
                    <router-link to="/user">User</router-link>
    
    
    
                </li>
    
    
    
                <li class="breadcrumb-item active" aria-current="page">Edit</li>
    
    
    
    
    
    
    
            </ol>
    
    
    
        </nav>
    
    
    
    
    
    
    
        <div class="row">
    
    
    
            <div class="col">
    
    
    
                <div class="mb-3">
    
    
    
                    <label for="formGroupExampleInput" class="form-label">User_ID</label>
    
    
    
                    <input type="text" class="form-control" id="staff_id" placeholder="210312" v-model="user.uid" disabled>
    
    
    
                </div>
    
    
    
            </div>
    
    
    
            <div class="col">
    
    
    
                <div class="mb-3">
    
    
    
                    <label for="formGroupExampleInput2" class="form-label">Name</label>
    
    
    
                    <input type="text" class="form-control" id="name" placeholder="Default" v-model="user.name" required>
    
    
    
                </div>
    
    
    
    
    
    
    
            </div>
    
    
    
        </div>
    
    
    
        <div class="mb-3">
    
    
    
            <label for="formGroupExampleInput" class="form-label">Password</label>
    
    
    
            <input type="text" class="form-control" id="password" placeholder="13:00" v-model="user.pw">
    
    
    
        </div>
    
    
    
        <div class="mb-3">
    
    
    
            <label for="formGroupExampleInput" class="form-label">Gender</label>
    
    
    
            <input type="text" class="form-control" id="gender" placeholder="male" v-model="user.gender" disabled>
    
    
    
        </div>
    
    
    
        <div class="mb-3">
    
    
    
            <label for="formGroupExampleInput" class="form-label">Year</label>
    
    
    
            <input type="number" class="form-control" id="email" placeholder="hkbu.edu.hk" v-model="user.year">
    
    
    
        </div>
    
    
    
        <div class="row">
    
    
    
            <div class="col">
    
    
    
                <div class="mb-3">
    
    
    
                    <label for="formGroupExampleInput" class="form-label">Phone</label>
    
    
    
                    <input type="number" class="form-control" id="phone" placeholder="142141" v-model="user.phone">
    
    
    
                </div>
    
    
    
            </div>
    
    
    
    
    
    
    
    
    
    
    
        </div>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        <button type="submit" class="btn btn-primary" id="submitBtn">Update</button>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    </form>
    <br>
    

</div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'

import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const user = ref({
    _id: '',
    uid: 1,
    name: 'Credit Card',
    pw: '',
    gender: '',
    year:12,
    phone:121
})





// A function to update a booking with www-form-urlencoded data
async function updateUser() {
    try {
        const token = localStorage.getItem('token');


        const response = await fetch(`/api/customer/${user.value._id}`, {
            method: 'PUT',
            headers: {
                

                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user.value)

        });
        
        // convert the response to json
        const json = await response.json();
        // return the json
        return json;
    } catch (error) {
        console.log(error)
    }
}

const getUser = async function () {
    // get the booking from the backend
    const response = await fetch('/api/customer/' + route.params.id);
    // convert the response to json
    const json = await response.json();
    // log the json
    console.log(json);
    // set the booking
 // set the booking, copy by value instead of reference
 user.value = { ...json };
    // Wait for the change to get flushed to the DOM
    await nextTick();}

onMounted(async () => {
    // if there is an id in the route
    if (route.params.id) {
        getUser();
    }
});

</script>