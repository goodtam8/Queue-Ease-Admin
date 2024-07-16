<template>
    <div id="app">
        <header>
            <meta charset="utf-8">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css">
    
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">UniTrack</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav" v-if="hasToken">
                            
                                <li v-if="$route.name === 'home'">
                                    <router-link to="/" class="nav-link active">Home</router-link>
                                </li>
                                <li v-else>
                                    <router-link to="/" class="nav-link">Home</router-link>
                                </li>
                                <li v-if="$route.name === 'teacher'">
                                    <router-link to="/teacher" class="nav-link active">Teacher</router-link>
                                </li>
                                <li v-else>
                                    <router-link to="/teacher" class="nav-link">Teacher</router-link>
                                </li>
                                <li v-if="$route.name === 'student'">
                                    <router-link to="/student" class="nav-link active">Student</router-link>
                                </li>
                                <li v-else>
                                    <router-link to="/student" class="nav-link">Student</router-link>
                                </li>
                                <li v-if="$route.name === 'course'">
                                    <router-link to="/course" class="nav-link active">Course</router-link>
                                </li>
                                <li v-else>
                                    <router-link to="/course" class="nav-link">Course</router-link>
                                </li>
                                <li v-if="$route.name === 'analytic'">
                                    <router-link to="/analytic" class="nav-link active">Anayltic</router-link>
                                </li>
                                <li v-else>
                                    <router-link to="/analytic" class="nav-link">Analytic</router-link>
                                </li>
    
                               
    
                        </ul>
    
    
                    </div>
                    <form class="d-flex " role="search">
                                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                                    <button class="btn btn-outline-success" type="submit">Search</button>
                                </form>
                                

                    <div v-if="hasToken">
                    <button type="button" class="btn btn-primary my-4" @click="logout">Log Out</button>
                </div>
                </div>
               
            </nav>
    
        </header>
    
    </div>
    
    <RouterView/>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed } from 'vue';
const router = useRouter();
const route = useRoute();

const logout = function() {
    localStorage.removeItem('token');
    location.reload();
}

const hasToken = computed(() => {
    return localStorage.getItem('token') !== null;
});
</script>

<style>
* {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
}
</style>