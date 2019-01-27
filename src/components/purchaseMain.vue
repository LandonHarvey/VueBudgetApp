<template>
  <div id="pageContainer">
    <div>
      <div>
        <h1>Product Search</h1>
      </div>
      <div id="searchContainer">
        <input id="searchBar" type="text" placeholder="Search...">
        <div>
          <button id="searchButton" @click="fetchData()">Search</button>
        </div>
      </div>
      <div v-if="showResults" id="searchResults">
        <div v-for="(tvs, key) in walmartJson" :key="key" id="itemContainer">
          <h4>{{walmartJson[key].title}}</h4><img v-bind:src="walmartJson[key].image"/><div>{{walmartJson[key].price}}</div></div>
      </div>
    </div>
  </div>
</template>

<script>
import walmartJson from '../assets/walmartsamsung'

export default {
  name: 'purchaseMain',
  data () {
    return {
      walmartJson,
      showResults: false
    }
  },
  methods: {
    fetchData () {
      this.showResults = true
      console.log()
    }
  }
}

</script>

<style scoped>

  #searchContainer {
    display: flex;
    justify-content: center;
  }

  #searchBar {
    height: 3.5em;
    width: 59%;
  }

  #searchButton {
    height: 3.5em;
  }

  #searchResults {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }

  #itemContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: space-between;
    width: 49%;
    padding-bottom: 1em;
  }

  img {
    width: 50%;

  }

</style>
