<template>
    <div>
    
        <nav aria-label="breadcrumb">
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
            <ol class="breadcrumb">
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
                <li class="breadcrumb-item">
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
                    <router-link to="/">Home</router-link>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
                </li>
    
    
    
    
    
                <li class="breadcrumb-item active" aria-current="page">Teacher</li>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    
    
    
            </ol>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        </nav>
    
        <ul class="list-group">
    
            <li class="list-group-item active" aria-current="true">Teacher</li>
    
    
    
            <div v-for="pg in teacher " :key="pg">
    
                <li class="list-group-item">{{ pg.name }}
    
                    <div class="row">
    
                        <div class="col text-end">
    
                            <router-link :to="'/teacher/assign/'+pg._id" class="btn btn-secondary">
    
    
    
    
    
                                Assign
    
    
    
                            </router-link>            
                            <router-link :to="'/teacher/'+pg._id" class="btn btn-success">
    
                                Edit
    
                            </router-link>
    
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

    getTeacher();

});
const page = ref(1);
const perpage = ref(6);
const total = ref(1);
const totalpage = ref(1);


const teacher = ref([])

// A function to fetch a booking
async function getTeacher() {
    const params = [
        `page=${page.value}`
    ]
    // fetch the booking
    const response = await fetch(`/api/teacher?${params}`);
    // convert the response to json
    const json = await response.json();
    // return the json
    teacher.value = json.teacher;
    page.value = json.page;
    perpage.value = json.perPage;
    total.value = json.total
    totalpage.value = total.value / perpage.value;



}
async function setpage(abc) {
    page.value = abc;

}

const numbers = computed(() => {
    return Array.from({ length: totalpage.value + 1 }, (_, index) => index + 1);
});
watch(() => page.value, () => {
    getTeacher();
});
</script>


