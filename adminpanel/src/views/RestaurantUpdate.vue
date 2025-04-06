<template>
    <form @submit.prevent="updateBooking()">

        <nav aria-label="breadcrumb">

            <ol class="breadcrumb">

                <li class="breadcrumb-item">

                    <router-link to="/">Home</router-link>

                </li>

                <li class="breadcrumb-item">

                    <router-link to="/rest">Restaurant</router-link>

                </li>

                <li class="breadcrumb-item active" aria-current="page">Update</li>



            </ol>

        </nav>



        <div class="col">
            <div class="row g-3 align-items-center"> <!-- Added row with gutter spacing -->
                <!-- Name Input Column -->
                <div class="col-6"> <!-- 50% width -->
                    <div class="mb-3">
                        <label for="formGroupExampleInput2" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name" placeholder="McDonald" v-model="rest.name"
                            required>
                    </div>
                </div>

                <!-- Image Upload Column -->
                <div class="col-6"> <!-- 50% width -->
                    <div class="mb-3 h-100"> <!-- Added h-100 for equal height -->
                        <label class="form-label fw-bold">Restaurant Image</label>
                        <div class="d-flex align-items-center gap-3">
                            <div class="image-upload-container position-relative w-100">
                                <input type="file" @change="handleFileUpload" class="form-control" accept="image/*"
                                    id="imageUpload" hidden>
                                <label for="imageUpload"
                                    class="btn btn-outline-primary d-flex align-items-center gap-2 w-100">
                                    <i class="bi bi-upload"></i>
                                    {{ selectedFile ? 'Change Image' : 'Upload New Image' }}
                                </label>
                                <small class="ms-2 text-muted">(JPEG/PNG, max 5MB)</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="mb-3">

            <label for="formGroupExampleInput" class="form-label">Start Time</label>

            <input type="text" class="form-control" id="start_time" placeholder="13:00" v-model="rest.start_time">

        </div>

        <div class="mb-3">

            <label for="formGroupExampleInput" class="form-label">End Time</label>

            <input type="text" class="form-control" id="end_time" placeholder="16:00" v-model="rest.end_time">

        </div>

        <div class="mb-3">

            <label for="formGroupExampleInput" class="form-label">Type</label>

            <input type="text" class="form-control" id="type" placeholder="Japanese" v-model="rest.type">

        </div>

        <div class="row">

            <div class="col">

                <div class="mb-3">

                    <label for="formGroupExampleInput" class="form-label">Outside</label>

                    <input type="number" class="form-control" id="outside" placeholder="1 for yes 2 for no"
                        v-model="rest.outside" min="1" max="2">

                </div>

            </div>

            <div class="col">

                <div class="mb-3">

                    <label for="formGroupExampleInput2" class="form-label">Number of Table</label>

                    <input type="number" class="form-control" id="numoftable" placeholder="30" v-model="rest.numoftable"
                        min="1" max="50">

                </div>



            </div>

            <div class="col">

                <div class="mb-3">

                    <label for="formGroupExampleInput2" class="form-label">Year</label>

                    <input type="text" class="form-control" id="year" placeholder="2022" v-model="rest.year">

                </div>



            </div>

        </div>

        <div class="mb-3">

            <label for="formGroupExampleInput2" class="form-label">Location</label>

            <input type="text" class="form-control" id="location" placeholder="WLB209f" v-model="rest.location">

        </div>









        <button type="submit" class="btn btn-primary" id="submitBtn">Update</button>

        <button type="button" class="btn btn-danger" v-on:click="deleteRestaurant">Delete</button>





    </form>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { ref as storageRef, deleteObject, uploadBytes } from "firebase/storage";
import storage from "@/firebase/init";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const rest = ref([])
const selectedFile = ref(null);

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    selectedFile.value = file;
}

const uploadFile = async (_id) => {
    if (selectedFile.value) {
        const fileRef = storageRef(storage, `Restaurant/${_id}`);
        await uploadBytes(fileRef, selectedFile.value); // Use uploadBytes instead of put
        console.log('File Uploaded successfully')
    }
}
const deleteImage = async (_id) => {
    const fileRef = storageRef(storage, `Restaurant/${_id}`); // Reference to the file to delete
    try {
        await deleteObject(fileRef);
        console.log('Image deleted successfully');
        // Optionally, update your state to remove the image from the UI
    } catch (error) {
        console.error('Error deleting image:', error);
    }
}
// a function to get the booking from the backend
const getRestaurant = async function () {
    // get the booking from the backend
    const response = await fetch('/api/rest/id/' + route.params.id);
    // convert the response to json
    const json = await response.json();
    // log the json
    console.log(json);
    // set the booking
    // set the booking, copy by value instead of reference
    rest.value = { ...json };
    rest.value.outside = rest.value.outside ? 1 : 2
    // Wait for the change to get flushed to the DOM
    await nextTick();
}

onMounted(async () => {
    // if there is an id in the route
    if (route.params.id) {
        getRestaurant();
    }
});


// A function to update a booking with www-form-urlencoded data
async function updateBooking() {
    try {
        const token = localStorage.getItem('token');


        const response = await fetch(`/api/rest/${rest.value._id}`, {
            method: 'PUT',
            headers: {


                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rest.value)

        });
        uploadFile(rest.value._id);
        // convert the response to json
        const json = await response.json();
        // return the json
        alert(JSON.stringify(json));
        // redirect to the home page
        router.push('/');
    } catch (error) {
        console.log(error)
    }
}
const deleteRestaurant = async function () {
    // post the booking to the backend
    const response = await fetch('/api/rest/' + rest.value._id, {
        method: 'DELETE'
    });
    // convert the response to json
    const json = await response.json();
    deleteImage(rest.value._id);
    // log the json
    console.log(json);
    // alert the user
    alert(JSON.stringify(json));
    // redirect to the home page
    router.push('/');
}

</script>