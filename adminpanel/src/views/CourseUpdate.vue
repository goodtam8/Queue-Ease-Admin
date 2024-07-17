<template>
    <form @submit.prevent="updateBooking()">
    
        <nav aria-label="breadcrumb">
    
            <ol class="breadcrumb">
    
                <li class="breadcrumb-item">
    
                    <router-link to="/" >Home</router-link>
    
                </li>
    
                <li class="breadcrumb-item">
    
                    <router-link to="/course" >Course</router-link>
    
                </li>
    
                <li class="breadcrumb-item active" aria-current="page">Update</li>
    
    
    
            </ol>
    
        </nav>
    
    
    
        <div class="row">
    
            <div class="col">
    
                <div class="mb-3">
    
                    <label for="formGroupExampleInput" class="form-label">CID</label>
    
                    <input type="text" class="form-control" id="cid" placeholder="COMP2016" v-model="course.cid" required>
    
                </div>
    
            </div>
    
            <div class="col">
    
                <div class="mb-3">
    
                    <label for="formGroupExampleInput2" class="form-label">Cname</label>
    
                    <input type="text" class="form-control" id="cname" placeholder="Database Management" v-model="course.cname" required>
    
                </div>
    
    
    
            </div>
    
        </div>
    
        <div class="mb-3">
    
            <label for="formGroupExampleInput" class="form-label">Start Time</label>
    
            <input type="text" class="form-control" id="start_time" placeholder="13:00" v-model="course.start_time" disabled>
    
        </div>
    
        <div class="mb-3">
    
            <label for="formGroupExampleInput" class="form-label">End Time</label>
    
            <input type="text" class="form-control" id="end_time" placeholder="16:00" v-model="course.end_time" disabled>
    
        </div>
    
        <div class="mb-3">
    
            <label for="formGroupExampleInput" class="form-label">Day</label>
    
            <input type="text" class="form-control" id="week_day" placeholder="Monday" v-model="course.week_day">
    
        </div>
    
        <div class="row">
    
            <div class="col">
    
                <div class="mb-3">
    
                    <label for="formGroupExampleInput" class="form-label">Semester</label>
    
                    <input type="number" class="form-control" id="semester" placeholder="1" v-model="course.semester" min="1" max="2">
    
                </div>
    
            </div>
    
            <div class="col">
    
                <div class="mb-3">
    
                    <label for="formGroupExampleInput2" class="form-label">Quota</label>
    
                    <input type="number" class="form-control" id="quota" placeholder="30" v-model="course.quota" min="10" max="50">
    
                </div>
    
    
    
            </div>
    
            <div class="col">
    
                <div class="mb-3">
    
                    <label for="formGroupExampleInput2" class="form-label">Year</label>
    
                    <input type="text" class="form-control" id="year" placeholder="2022" v-model="course.year">
    
                </div>
    
    
    
            </div>
    
        </div>
    
        <div class="mb-3">
    
            <label for="formGroupExampleInput2" class="form-label">Location</label>
    
            <input type="text" class="form-control" id="location" placeholder="WLB209f" v-model="course.location">
    
        </div>
    
    
    
    
    
    
    
        <button type="submit" class="btn btn-primary" id="submitBtn">Update</button>
    
        <button type="button" class="btn btn-danger" v-on:click="deleteCourse">Delete</button>
    
    
    
    
    
    </form>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'

import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const course = ref([])
// a function to get the booking from the backend
const getCourse = async function () {
    // get the booking from the backend
    const response = await fetch('/api/course/id/' + route.params.id);
    // convert the response to json
    const json = await response.json();
    // log the json
    console.log(json);
    // set the booking
 // set the booking, copy by value instead of reference
 course.value = { ...json };
    // Wait for the change to get flushed to the DOM
    await nextTick();}

onMounted(async () => {
    // if there is an id in the route
    if (route.params.id) {
        getCourse();
    }
});


// A function to update a booking with www-form-urlencoded data
async function updateBooking() {
    try {
        const token = localStorage.getItem('token');


        const response = await fetch(`/api/course/${course.value._id}`, {
            method: 'PUT',
            headers: {
                

                'Content-Type': 'application/json'
            },
            body: JSON.stringify(course.value)

        });
        
        // convert the response to json
        const json = await response.json();
        // return the json
        return json;
    } catch (error) {
        console.log(error)
    }
}
const deleteCourse = async function () {
    // post the booking to the backend
    const response = await fetch('/api/course/' + course.value._id, {
        method: 'DELETE'
    });
    // convert the response to json
    const json = await response.json();
    // log the json
    console.log(json);
    // alert the user
    alert(JSON.stringify(json));
    // redirect to the home page
    router.push('/');
}

</script>