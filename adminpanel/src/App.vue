<template>
    <div id="app">
        <header>
            <meta charset="utf-8">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css">
    
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
              <div class="container-fluid">
            <a class="navbar-brand" href="#">UniTrack</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Teacher</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Student</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " aria-disabled="false">Course</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Analytic</a>
                    </li>
                    <form class="d-flex " role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>


                </ul>

            </div>
        </div>
        <div v-if="hasToken">
                <button type="button" class="btn btn-primary my-4" @click="logout">Log Out</button>
            </div>
    </nav>
            
        </header>
    
    </div>
    
    <RouterView/>
</template>

<script setup>
import { computed } from 'vue';

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