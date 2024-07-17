<template>
    <form onsubmit="handleSubmit(event)">
    
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
    
    
    
    
    
    
    
        <button type="submit" class="btn btn-primary" id="submitBtn">Create</button>
    
        <button type="button" class="btn btn-danger" onclick="handleDelete()">Delete</button>
    
    
    
    
    
    </form>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'

import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const course = ref({
    cid: "",
    cname: "",
    start_time: "",
    end_time: "",
    week_day: "",
    semester: 1,
    quota: 20,
    year: "2021",
    location: "hkbu"





})
// a function to get the booking from the backend
const getCourse = async function () {
    // get the booking from the backend
    const response = await fetch('/api/course/id/' + route.params.id);
    // convert the response to json
    const json = await response.json();
    // log the json
    console.log(json);
    // set the booking
    course.value = json;
}

onMounted(async () => {
    // if there is an id in the route
    if (route.params.id) {
        getCourse();
    }
});

</script>