<template>
    <div>

        <div class="row">

            <div class="col">

                <ul class="list-group">



                    <li class="list-group-item list-group-item-secondary">Restaurant Image:{{ restaurant.img }}</li>



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
import { ref, onMounted, computed, watch, nextTick } from 'vue'

import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const restaurant = ref({


   


})
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