<template>
    <form @submit.prevent="createrestaurant()">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"> <router-link to="/">Home</router-link></li>
                <li class="breadcrumb-item "> <router-link to="/rest">Restaurant</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">Create</li>

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







        <button type="submit" class="btn btn-primary" id="submitBtn">Create</button>



    </form>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage"; // Import getStorage and ref

const rest = ref({
    name: "",
    start_time: "",
    end_time: "",
    type: "",
    outside: 1,
    numoftable: 20,
    year: "2021",
    location: "hkbu"





})
const id = ref({
    id: ""
})
const selectedFile = ref(null);

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    selectedFile.value = file;
}

const uploadFile = async (_id) => {
    if (selectedFile.value) {
        const storage = getStorage();
        const fileRef = storageRef(storage, `Restaurant/${_id}`);
        await uploadBytes(fileRef, selectedFile.value); // Use uploadBytes instead of put
        console.log('File Uploaded successfully')
    }
}



const router = useRouter();
async function comparetime(rest) {
    let stime = rest.value.start_time
    let etime = rest.value.end_time

    if (etime < stime) {
        return false
    }
    return true

}



const createrestaurant = async function () {
    // Example usage:

    const time = await comparetime(rest)
    if (time === false) {
        alert(JSON.stringify("The start time should be earlier than the end time "));
        return

    }
    const duplicate = await getBooking(rest);
    if (duplicate === true) {
        alert(JSON.stringify("There is already have a duplicate name in the system"));
        return;
    }
    // update the booking
    const updatedBooking = await updateBooking(rest);



    // display the response
    if (updateBooking !== undefined) {
        alert(JSON.stringify(updatedBooking));
    } else {
        alert("You have not login in yet")
    }
    // redirect to the home page
    if (updateBooking !== undefined) {
        router.push('/rest');
    }
}


// A function to update a booking with www-form-urlencoded data
async function updateBooking(booking) {
    try {
        const token = localStorage.getItem('token');


        const response = await fetch(`/api/rest/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,

                'Content-Type': 'application/json'
            },
            body: JSON.stringify(booking.value)

        });

        // convert the response to json
        const json = await response.json();
        id.value = json;
        uploadFile(id.value.id);

        // return the json
        return json;

    } catch (error) {
        console.log(error)
    }
}
// A function to fetch a booking
async function getBooking(rest) {

    // fetch the booking
    const response = await fetch(`/api/rest/${rest.value.name}`);
    // convert the response to json
    const json = await response.json();
    // return the json

    if (json.message !== "Restaurant not found") {
        return true
    }
    return false;
}

</script>
