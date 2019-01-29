<template>
  <div id="pageContainer">
    <div>
      <div>
        <h1>Product Search</h1>
      </div>
      <div id="searchContainer">
        <input id="searchBar" type="text" placeholder="Search...">
        <div>
          <button id="searchButton" @click.once="fetchData(), created()">Search</button>
        </div>
        {{this.info}}
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
import axios from 'axios'

export default {
  name: 'purchaseMain',
  data () {
    return {
      walmartJson,
      showResults: false,
      info: [],
      errors: []
    }
  },
  methods: {
    fetchData () {
      this.showResults = true
      console.log()
    },
    created () {
      let url = 'http://svcs.sandbox.ebay.com/services/search/FindingService/v1'
      url += '?OPERATION-NAME=findItemsByKeywords'
      url += '&SERVICE-VERSION=1.3.0'
      url += '&SECURITY-APPNAME= APIKEY'
      url += '&GLOBAL-ID=EBAY-US'
      url += '&RESPONSE-DATA-FORMAT=JSON'
      url += '&callback=_cb_findItemsByKeywords'
      url += '&REST-PAYLOAD'
      url += '&keywords=harry%20potter'
      url += '&paginationInput.entriesPerPage=3'

      axios.get(url)
        .then(data => {
          this.info = data
        }).catch(error => {
          console.log(error)
        })
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
