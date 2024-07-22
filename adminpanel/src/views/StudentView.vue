<template>
    <div>
    
        <nav aria-label="breadcrumb">
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
            <ol class="breadcrumb">
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
                <li class="breadcrumb-item">
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
                    <router-link to="/">Home</router-link>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
                </li>
    
    
    
    
    
                <li class="breadcrumb-item active" aria-current="page">Student</li>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
            </ol>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        </nav>
    
        <ul class="list-group">
    
            <li class="list-group-item active" aria-current="true">Student</li>
    
    
    
            <div v-for="pg in student " :key="pg">
    
                <li class="list-group-item">{{ pg.name }}
    
                    <div class="row">
    
                        <div class="col text-end">
    
                                  
                            <router-link :to="'/student/'+pg._id" class="btn btn-success">
    
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

    getStudent();

});
const page = ref(1);
const perpage = ref(6);
const total = ref(1);
const totalpage = ref(1);


const student = ref([])

// A function to fetch a booking
async function getStudent() {
    const params = [
        `page=${page.value}`,
    ]
    // fetch the booking
    const response = await fetch(`/api/student?${params}`);
    // convert the response to json
    const json = await response.json();
    // return the json
    student.value = json.student;
    page.value = json.page;
    perpage.value = json.perPage;
    total.value = json.total;
    totalpage.value = total.value / perpage.value;


}
async function setpage(abc) {
    page.value = abc;

}

const numbers = computed(() => {
return Array.from({ length: Math.ceil(totalpage.value) }, (_, index) => index + 1);
});
watch(() => page.value, () => {
    getStudent();
});
</script>


