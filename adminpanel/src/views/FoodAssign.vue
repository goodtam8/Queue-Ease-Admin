<template>
    <div>
    
    
    
        <nav aria-label="breadcrumb">
    
    
    
        
    
            <ol class="breadcrumb">
        
                <li class="breadcrumb-item">    
                <router-link to="/">Home</router-link>

    
        
                </li>
    
    
    
                <li class="breadcrumb-item">
    
    
    
                    <router-link to="/rest">Restaurant</router-link>
    
    
    
    
    
    
    
                </li>
    
    
                <li class="breadcrumb-item active" aria-current="page">Assign</li>
    
    
    
    
    
    
    
            </ol>
    
    
    

    
    
        </nav>
    
    
    
        <div class="alert alert-primary d-flex align-items-center justify-content-center" role="alert">
    
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
    
        
    
          <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
    
        
    
        </svg> {{ restaurant.name }} Restaurant Assign
    
    
    
        </div>
    
    
    
    
    
    
    
        <div class="alert alert-dark" role="alert">
    
    
    
            Remaining Quota:{{ restaurant.quota }}
    
    
    
        </div>
    
    
    
    
    
    
    
        <ul class="list-group">
    
    
    
    
    
    
    
            <li class="list-group-item active" aria-current="true">Food</li>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
            <div v-for="pg in food " :key="pg.name">
    
    
    
    
    
    
    
                <li class="list-group-item">{{ pg.name }}
    
    
    
    
    
    
    
                    <div class="row">
    
    
    
    
    
    
    
                        <div class="col text-end">
    
    
    
    
    
                            <div v-if="restaurant.menu">
    
                                <button type="button" class="btn btn-primary" v-on:click="join(pg.name)" v-if="!restaurant.menu.includes(pg.name)">Assign</button>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
                            </div>
                            <div v-else>
                                <button type="button" class="btn btn-primary" v-on:click="join(pg.name)">Assign</button>


                            </div>
    
    
    
    
    
                        </div>
    
    
    
    
    
                    </div>
    
    
    
    
    
    
    
                </li>
    
    
    
    
    
    
    
            </div>
    
    
    
    
    
    
    
        </ul>
    
        <nav aria-label="Page navigation example">
    
    
    
    
    
    
    
            <ul class="pagination" id="pagination">
    
    
    
    
    
    
    
                <div v-for="pg in numbers " :key="pg">
    
    
    
    
    
    
    
                    <li class="page-item active" aria-current="page" v-if="pg===page">
    
    
    
    
    
    
    
                        <a class="page-link" v-on:click="setpage(pg)">{{ pg }}</a>
    
    
    
    
    
    
    
                    </li>
    
    
    
    
    
    
    
                    <li class="page-item" aria-current="page" v-else>
    
    
    
    
    
    
    
                        <a class="page-link" v-on:click="setpage(pg)">{{ pg }}</a>
    
    
    
    
    
    
    
                    </li>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
                </div>
    
    
    
    
    
    
    
            </ul>
    
    
    
    
    
    
    
        </nav>
    
    
    
    
    
    
    
    
    
    
    
    
    
    </div>
</template>


<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, computed, watch, nextTick } from 'vue'

onMounted(async () => {
    // if there is an id in the route
    if (route.params.id) {
        getFood();
        getRest();

    }
});
const page = ref(1);
const perpage = ref(6);
const total = ref(1);
const totalpage = ref(1);
const router = useRouter();
const route = useRoute();

const food = ref([]);
const restaurant = ref({
   


})

// A function to fetch a booking
async function getFood() {
    const params = [
        `page=${page.value}`
    ]
    // fetch the booking
    const response = await fetch(`/api/food?${params}`);
    // convert the response to json
    const json = await response.json();
    // return the json
    food.value = json.food;
    page.value = json.page;
    perpage.value = json.perPage;
    total.value = json.total
    totalpage.value = total.value / perpage.value;



}
async function setpage(abc) {
    page.value = abc;

}

const numbers = computed(() => {
    return Array.from({ length: Math.ceil(totalpage.value) }, (_, index) => index + 1);
});
watch(() => page.value, () => {
    getFood();
});

// a function to get the booking from the backend
const getRest = async function() {
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

const join = async function(sid) {
    // post the booking to the backend
    const response = await fetch(`/api/food/${restaurant.value._id}/${sid}`, {
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
    getFood()
    getRest()
}

// Use computed property to get the superheroes

</script>
