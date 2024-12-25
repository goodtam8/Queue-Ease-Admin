<template>
    <div>
        <form @submit.prevent="updateFood()">



            <nav aria-label="breadcrumb">



                <ol class="breadcrumb">



                    <li class="breadcrumb-item">



                        <router-link to="/">Home</router-link>



                    </li>



                    <li class="breadcrumb-item">



                        <router-link to="/food">Food</router-link>



                    </li>



                    <li class="breadcrumb-item active" aria-current="page">Edit</li>







                </ol>



            </nav>







            <div class="row">



                <div class="col">



                    <div class="mb-3">



                        <label for="formGroupExampleInput" class="form-label">Name</label>



                        <input type="text" class="form-control" id="sid" placeholder="210312" v-model="food.name"
                            disabled>



                    </div>



                </div>











            </div>










            <div class="mb-3">



                <label for="formGroupExampleInput" class="form-label">price</label>



                <input type="number" class="form-control" id="price" placeholder="77" v-model="food.price">



            </div>



            <div class="row">



                <div class="col">



                    <div class="mb-3">



                        <label for="formGroupExampleInput" class="form-label">Img</label>



                        <input type="number" class="form-control" id="phone" placeholder="142141" v-model="food.img">



                    </div>



                </div>











            </div>























            <button type="submit" class="btn btn-primary" id="submitBtn">Update</button>














        </form>
        <br>
        <ul class="list-group">

            <li class="list-group-item active" aria-current="true">Restaurant</li>



            <div v-for="pg in restaurant " :key="pg">

                <li class="list-group-item" v-bind="selectedRestaurant">{{ pg.name }}


                    <button type="button" class="btn btn-danger" v-on:click="drop(pg._id)">Drop</button>
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

const food = ref({
    _id: "ds",
    name: "noodle",
    price: 10,
    img: "www.dadsawaea"

})

const restaurant = ref([])
const selectedRestaurant = ref('');



const drop = async function (cid) {

    const response = await fetch(`/api/food/${food.value.name}/${cid}/drop`, {
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
    getFood();
    getRest();


}
// A function to update a booking with www-form-urlencoded data
async function updateFood() {
    try {
        const token = localStorage.getItem('token');


        const response = await fetch(`/api/food/${food.value._id}`, {
            method: 'PUT',
            headers: {


                'Content-Type': 'application/json'
            },
            body: JSON.stringify(food.value)

        });

        // convert the response to json
        const json = await response.json();
        // return the json
        return json;
    } catch (error) {
        console.log(error)
    }
}

const getRest = async function () {
    // get the booking from the backend
    const response = await fetch(`/api/food/${route.params.id}/get`);
    // convert the response to json
    const json = await response.json();
    // log the json
    console.log(json);
    // set the booking
    // set the booking, copy by value instead of reference
    restaurant.value = json;
    console.log(restaurant.value)
    // Wait for the change to get flushed to the DOM
}

const getFood = async function () {
    // get the booking from the backend
    const response = await fetch('/api/food/' + route.params.id);
    // convert the response to json
    const json = await response.json();
    // log the json
    console.log(json);
    // set the booking
    // set the booking, copy by value instead of reference
    food.value = { ...json };
    // Wait for the change to get flushed to the DOM
    await nextTick();
}

onMounted(async () => {
    // if there is an id in the route
    if (route.params.id) {
        getFood();
        getRest();
    }
});

</script>