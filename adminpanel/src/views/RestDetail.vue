<template>
    <div>

        <div class="row">

            <div class="col">

                <ul class="list-group">


                    <li class="list-group-item">
                        <img v-if="imageUrl" :src="imageUrl" alt="Restaurant Image" class="card-img-top"
                            style="width: 500px; height: auto;" />
                    </li>
                    <li class="list-group-item">Restaurant Name:{{ restaurant.name }}</li>



                    <li class="list-group-item">Open Year :{{ restaurant.quota }}</li>



                    <li class="list-group-item">Location:{{ restaurant.location }}</li>



                    <li class="list-group-item">Restaurant Start Time:{{ restaurant.start_time }}</li>



                    <li class="list-group-item">End Time:{{ restaurant.end_time }}</li>



                    <li class="list-group-item">Restaurant Number of Table:{{ restaurant.numoftable }}</li>











                </ul>



            </div>

        </div>

        <br>

        <div class="col">










            <ul class="list-group">



                <li class="list-group-item">Food</li>
                <li v-for="pg in restaurant.menu" :key="pg" class="list-group-item">
                    {{ pg }}
                    <div class="row">
                        <div class="col text-end">
                            <button type="button" class="btn btn-primary" v-on:click="drop(pg)">Drop</button>
                        </div>
                    </div>
                </li>
            </ul>


        </div>



    </div>
</template>

<script setup>
import storage from "@/firebase/init";

import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { getStorage, ref as storageRef, getDownloadURL } from "firebase/storage";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const restaurant = ref({





})
const imageUrl = ref('');

const fetchImage = async (imagePath) => {
    try {
        const fileRef = storageRef(storage, imagePath);
        const url = await getDownloadURL(fileRef);
        imageUrl.value = url;
    } catch (error) {
        console.error('Error fetching image:', error);
    }
};


// a function to get the booking from the backend
const getRest = async function () {
    // get the booking from the backend
    const response = await fetch('/api/rest/id/' + route.params.id);
    // convert the response to json
    const json = await response.json();
    // log the json
    console.log(json);
    // set the booking
    // set the booking, copy by value instead of reference
    restaurant.value = { ...json };
    fetchImage(`Restaurant/${restaurant.value._id}`);
    // Wait for the change to get flushed to the DOM
    await nextTick();
}

onMounted(async () => {
    // if there is an id in the route
    if (route.params.id) {
        getRest();

    }
});

const drop = async function (name) {
    // post the booking to the backend
    const response = await fetch(`/api/food/${name}/${restaurant.value._id}/drop`, {
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