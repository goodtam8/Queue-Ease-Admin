<template>
        <form @submit.prevent="updateBooking()">
    
    <nav aria-label="breadcrumb">

        <ol class="breadcrumb">

            <li class="breadcrumb-item">

                <router-link to="/" >Home</router-link>

            </li>

            <li class="breadcrumb-item">

                <router-link to="/teacher" >Teacher</router-link>

            </li>

            <li class="breadcrumb-item active" aria-current="page">Edit</li>



        </ol>

    </nav>



    <div class="row">

        <div class="col">

            <div class="mb-3">

                <label for="formGroupExampleInput" class="form-label">Staff_id</label>

                <input type="text" class="form-control" id="cid" placeholder="COMP2016" v-model="course.cid" disabled>

            </div>

        </div>

        <div class="col">

            <div class="mb-3">

                <label for="formGroupExampleInput2" class="form-label">Name</label>

                <input type="text" class="form-control" id="name" placeholder="Default" v-model="course.cname" required>

            </div>



        </div>

    </div>

    <div class="mb-3">

        <label for="formGroupExampleInput" class="form-label">Password</label>

        <input type="text" class="form-control" id="start_time" placeholder="13:00" v-model="course.start_time" >

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

</script>