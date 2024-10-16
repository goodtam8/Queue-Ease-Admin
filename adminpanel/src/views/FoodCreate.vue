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
    
    
    
                <li class="breadcrumb-item active" aria-current="page">CREATE</li>
    
    
    
    
    
    
    
            </ol>
    
    
    
        </nav>
    
    
    
    
    
    
    
        <div class="row">
    
    
    
            <div class="col">
    
    
    
                <div class="mb-3">
    
    
    
                    <label for="formGroupExampleInput" class="form-label">Name</label>
    
    
    
                    <input type="text" class="form-control" id="sid" placeholder="210312" v-model="food.name" >
    
    
    
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        <button type="submit" class="btn btn-primary" id="submitBtn">CREATE</button>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    </form>
    <br>
   

</div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'

import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const food = ref({
    _id:"ds",
   name:"noodle",
   price:10,
   img:"www.dadsawaea"

})

const restaurant=ref([])
const selectedRestaurant = ref('');



// A function to update a booking with www-form-urlencoded data
async function updateFood() {
    try {
        const token = localStorage.getItem('token');


        const response = await fetch(`/api/food/`, {
            method: 'POST',
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



</script>