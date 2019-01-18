<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import Home from './views/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-size: .7em;
  }

  .box {
    background-color: white;
  }

</style>

<style scoped>

</style>
<!--
<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div>
        <router-view/>
    </div>
-->
