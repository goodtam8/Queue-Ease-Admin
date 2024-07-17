<template>
    <form @submit.prevent="createcourse()">
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
            <input type="text" class="form-control" id="start_time" placeholder="13:00" v-model="course.start_time">
        </div>
        <div class="mb-3">
            <label for="formGroupExampleInput" class="form-label">End Time</label>
            <input type="text" class="form-control" id="end_time" placeholder="16:00" v-model="course.end_time">
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

    </form>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, computed, watch, nextTick } from 'vue'

const course = ref({
   cid:"",
   cname:"",
   start_time:"",
   end_time:"",
   week_day:"",
   semester:1,
   quota:20,
   year:"2021",
   location:"hkbu"





})

const router = useRouter();
async function comparetime(course){
    let stime = course.value.start_time
    let etime = course.value.end_time
    if (etime < stime) {
    return false 
    }
    return true 

}
    


const createcourse=async function(){



const timecomparison=await comparetime(course)
if(timecomparison===false){
    alert(JSON.stringify("The end time of the course should be later than the start time "));
    return

}
const duplicatecourse= await getBooking(course)
if(duplicatecourse===false){
    alert(JSON.stringify("There are duplicate course with same id"));
    return

}
// update the booking
const updatedBooking = await updateBooking(course);
// display the response
alert(JSON.stringify(updatedBooking));

// redirect to the home page
    router.push('/course');
}


// A function to update a booking with www-form-urlencoded data
async function updateBooking(booking) {

const response = await fetch(`/api/course/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(booking.value)

});
// convert the response to json
const json = await response.json();
// return the json
return json;
}
// A function to fetch a booking
async function getBooking(course) {

// fetch the booking
const response = await fetch(`/api/course/${course.value.cid}`);
// convert the response to json
const json = await response.json();
// return the json

if(json.message){
return true 
}
return false;
}
</script>







