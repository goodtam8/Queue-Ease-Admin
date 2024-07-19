<template>
    <div>
    
        <div class="row">
    
    <div class="col">
    
            <ul class="list-group">
    
    
    
                <li class="list-group-item list-group-item-secondary">Cid:{{ course.cid }}</li>
    
    
    
                <li class="list-group-item">Course Name:{{course.cname}}</li>
    
    
    
                <li class="list-group-item">Quota:{{course.quota}}</li>
    
    
    
                <li class="list-group-item">Location:{{course.location}}</li>
    
    
    
                <li class="list-group-item">Course Start Time:{{course.start_time}}</li>
    
    
    
                <li class="list-group-item">End Time:{{course.end_time}}</li>
    
    
    
                <li class="list-group-item">Semester:{{course.semester}}</li>
    
    
    
    
    
    
    
    
    
    
    
            </ul>
    
    
    
        </div>
    
        </div>
    
        <br>
    
        <div class="col">
    
    
    
    
    
            <ul class="list-group">
    
    
    
                <li class="list-group-item">Teacher</li>
    
    
    
                <li class="list-group-item" v-if="course.teacher">Teacher Name:{{course.teacher}}
    
    
    
                    <button type="button" class="btn btn-danger" v-on:click="dropcourse">Drop</button>
               
                </li>
    
    
    
    
    
    
    
            </ul>
             
    
        </div>
    
    
    
    </div>
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
    location: "hkbu",
    teacher: "default",



})
// a function to get the booking from the backend
const getCourse = async function() {
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
    await nextTick();
}

onMounted(async () => {
    // if there is an id in the route
    if (route.params.id) {
        getCourse();

    }
});

const dropcourse = async function() {
    // post the booking to the backend
    const response = await fetch('/api/teacher/' + course.value._id, {
        method: 'PATCH'
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