<template>
    <div id="app">
        <header>
            <meta charset="utf-8">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css">
            <meta name="viewport" content="width=device-width, initial-scale=1">

            <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">QueueEase</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav" v-if="isLoggedIn">
                        <ul class="navbar-nav">
                            <li v-if="$route.name === 'home'">
                                <router-link to="/" class="nav-link active">Home</router-link>
                            </li>
                            <li v-else>
                                <router-link to="/" class="nav-link">Home</router-link>
                            </li>
                            <li v-if="$route.name === 'teacher'">
                                <router-link to="/staff" class="nav-link active">Staff</router-link>
                            </li>
                            <li v-else>
                                <router-link to="/staff" class="nav-link">Staff</router-link>
                            </li>
                            <li v-if="$route.name === 'student'">
                                <router-link to="/food" class="nav-link active">Food</router-link>
                            </li>
                            <li v-else>
                                <router-link to="/food" class="nav-link">Food</router-link>
                            </li>
                            <li v-if="$route.name === 'restaurant'">
                                <router-link to="/rest" class="nav-link active">Restaurant</router-link>
                            </li>
                            <li v-else>
                                <router-link to="/rest" class="nav-link">Restaurant</router-link>
                            </li>
                            <li v-if="$route.name === 'user'">
                                <router-link to="/user" class="nav-link active">User</router-link>
                            </li>
                            <li v-else>
                                <router-link to="/user" class="nav-link">User</router-link>
                            </li>
                        </ul>
                        <form class="d-flex" role="search" @submit.prevent="searchrestaurant">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                                v-model="name">
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>

                        <button type="button" class="btn btn-primary my-4" @click="logout">Log Out</button>
                    </div>
                </div>
            </nav>
        </header>

        <RouterView />
    </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed, ref, onMounted } from 'vue';

const router = useRouter();
const route = useRoute();
const name = ref('');

// Single source of truth for authentication state
const isLoggedIn = ref(false);

// Check token on component mount and set state
onMounted(() => {
    checkAuthStatus();
});

// Function to check authentication status
const checkAuthStatus = () => {
    isLoggedIn.value = localStorage.getItem('token') !== null;
};

// Logout function
const logout = () => {
    localStorage.removeItem('token');
    isLoggedIn.value = false;
    router.push('/login');
};

const searchrestaurant = async function () {
    router.push(`/search/${name.value}`);
};

// Watch for route changes to check auth status
// This ensures navbar updates if token is added/removed on other pages
router.beforeEach((to, from, next) => {
    checkAuthStatus();
    next();
});
</script>

<style>
* {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
}
</style>
