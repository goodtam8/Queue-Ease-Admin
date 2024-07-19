<template>
    <div>
    <form @submit.prevent="updateTeacher()">
    
    
    
        <nav aria-label="breadcrumb">
    
    
    
            <ol class="breadcrumb">
    
    
    
                <li class="breadcrumb-item">
    
    
    
                    <router-link to="/">Home</router-link>
    
    
    
                </li>
    
    
    
                <li class="breadcrumb-item">
    
    
    
                    <router-link to="/teacher">Teacher</router-link>
    
    
    
                </li>
    
    
    
                <li class="breadcrumb-item active" aria-current="page">Edit</li>
    
    
    
    
    
    
    
            </ol>
    
    
    
        </nav>
    
    
    
    
    
    
    
        <div class="row">
    
    
    
            <div class="col">
    
    
    
                <div class="mb-3">
    
    
    
                    <label for="formGroupExampleInput" class="form-label">Staff_id</label>
    
    
    
                    <input type="text" class="form-control" id="staff_id" placeholder="210312" v-model="teacher.staff_id" disabled>
    
    
    
                </div>
    
    
    
            </div>
    
    
    
            <div class="col">
    
    
    
                <div class="mb-3">
    
    
    
                    <label for="formGroupExampleInput2" class="form-label">Name</label>
    
    
    
                    <input type="text" class="form-control" id="name" placeholder="Default" v-model="teacher.name" required>
    
    
    
                </div>
    
    
    
    
    
    
    
            </div>
    
    
    
        </div>
    
    
    
        <div class="mb-3">
    
    
    
            <label for="formGroupExampleInput" class="form-label">Password</label>
    
    
    
            <input type="text" class="form-control" id="password" placeholder="13:00" v-model="teacher.pw">
    
    
    
        </div>
    
    
    
        <div class="mb-3">
    
    
    
            <label for="formGroupExampleInput" class="form-label">Gender</label>
    
    
    
            <input type="text" class="form-control" id="gender" placeholder="male" v-model="teacher.gender" disabled>
    
    
    
        </div>
    
    
    
        <div class="mb-3">
    
    
    
            <label for="formGroupExampleInput" class="form-label">Email</label>
    
    
    
            <input type="text" class="form-control" id="email" placeholder="hkbu.edu.hk" v-model="teacher.email">
    
    
    
        </div>
    
    
    
        <div class="row">
    
    
    
            <div class="col">
    
    
    
                <div class="mb-3">
    
    
    
                    <label for="formGroupExampleInput" class="form-label">Phone</label>
    
    
    
                    <input type="number" class="form-control" id="phone" placeholder="142141" v-model="teacher.phone">
    
    
    
                </div>
    
    
    
            </div>
    
    
    
    
    
    
    
    
    
    
    
        </div>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        <button type="submit" class="btn btn-primary" id="submitBtn">Update</button>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    </form>
    <br>
    <ul class="list-group">
    
    <li class="list-group-item active" aria-current="true">Course</li>



    <div v-for="pg in course " :key="pg">

        <li class="list-group-item" v-bind="selectedCourse">{{ pg.cid }}


    <button type="button" class="btn btn-danger" v-on:click="drop(pg.cid)" >Drop</button>
    </li>
    </div>
</ul>

</div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'

import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const teacher = ref({
    _id: '',
    staff_id: 1,
    name: 'Credit Card',
    pw: '',
    gender: '',
    email:"",
    phone:121
})

const course=ref([])
const selectedCourse = ref('');



const drop = async function (cid) {

    const response = await fetch(`/api/teacher/${teacher.value.staff_id}/${cid}/drop`, {
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
// A function to update a booking with www-form-urlencoded data
async function updateTeacher() {
    try {
        const token = localStorage.getItem('token');


        const response = await fetch(`/api/teacher/${teacher.value._id}`, {
            method: 'PUT',
            headers: {
                

                'Content-Type': 'application/json'
            },
            body: JSON.stringify(teacher.value)

        });
        
        // convert the response to json
        const json = await response.json();
        // return the json
        return json;
    } catch (error) {
        console.log(error)
    }
}

const getCourse = async function () {
    // get the booking from the backend
    const response = await fetch(`/api/teacher/${route.params.id}/course`);
    // convert the response to json
    const json = await response.json();
    // log the json
    console.log(json);
    // set the booking
 // set the booking, copy by value instead of reference
 course.value = json;
    // Wait for the change to get flushed to the DOM
   }

const getTeacher = async function () {
    // get the booking from the backend
    const response = await fetch('/api/teacher/' + route.params.id);
    // convert the response to json
    const json = await response.json();
    // log the json
    console.log(json);
    // set the booking
 // set the booking, copy by value instead of reference
 teacher.value = { ...json };
    // Wait for the change to get flushed to the DOM
    await nextTick();}

onMounted(async () => {
    // if there is an id in the route
    if (route.params.id) {
        getTeacher();
        getCourse();
    }
});

</script>