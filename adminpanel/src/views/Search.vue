<template>
    <div>
     <br>
    
    
    






            <nav aria-label="breadcrumb">







                <ol class="breadcrumb">







                    <li class="breadcrumb-item">







                        <router-link to="/">Home</router-link>







                    </li>  


                    <li class="breadcrumb-item active" aria-current="page">Search</li>















                </ol>











            </nav>
            <div class="row col-12 col-md-8 ">
    
    
    <div class="col" v-for="c in course " :key="c">







        <div class="card" style="width: 18rem;">







            <div class="card-body">





                <h5 class="card-title">
                    <router-link :to="'/detail/'+c._id" class="nav-link">
                        {{ c._id }}

                </router-link>

            </h5>

                <p class="card-text">{{ c.cid }}</p>



                <router-link :to="'/update/'+c._id" class="btn btn-primary" id="submitBtn">



                    Edit



                </router-link>







            </div>







        </div>



        <br>







    </div>







</div>







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
const router = useRouter();
const route = useRoute();

onMounted(async () => {
    // if there is an id in the route
    if (route.params.id) {

    getCourse();

}});
const page = ref(1);
const perpage = ref(6);
const total = ref(1);
const totalpage = ref(1);


const course = ref([])

// A function to fetch a booking
async function getCourse() {
    const params = [
    `cid=${route.params.id}`    
    ,
        `page=${page.value}`
    ].join("&")
    // fetch the booking
    const response = await fetch(`/api/course?${params}`);
    // convert the response to json
    const json = await response.json();
    // return the json
    course.value = json.courses;
    page.value = json.page;
    perpage.value = json.perPage;
    total.value = json.total
    totalpage.value = total.value / perpage.value;



}
async function setpage(abc) {
    page.value = abc;

}

const numbers = computed(() => {
    return Array.from({ length:Math.ceil(totalpage.value) }, (_, index) => index + 1);
});
watch(() => page.value, () => {
    getCourse();
});

</script>