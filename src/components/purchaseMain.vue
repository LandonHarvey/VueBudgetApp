<template>
  <div id="pageContainer">
    <div>
      <div>
        <h1>Product Search</h1>
      </div>
      <div id="searchContainer">
        <input id="searchBar" type="text" placeholder="Search..." v-model="ebaySearch">
        <div>
          <button id="searchButton" @click="fetchData(), created()">Search</button>
        </div>
      </div>
      <div id="ebaySearchContainer">
        <div v-for="(item,key) in info" :key="key" id="ebaySearch">
          <img class="ebayImg" :src="item.image.imageUrl" alt="NOPE">
          <h4><a v-bind:href="item.itemWebUrl">{{item.title}}</a></h4>
          <div id="ebayPrice">PRICE: {{item.price.value}}</div>
        </div>
      </div>
      <div v-if="showResults" id="searchResults">
        <div v-for="(tvs, key) in walmartJson" :key="key" id="itemContainer">
          <img :src="walmartJson[key].image"/>
          <h4>{{walmartJson[key].title}}</h4>
          <div>{{walmartJson[key].price}}</div>
        </div>
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
      errors: [],
      ebaySearch: ''
    }
  },
  methods: {
    fetchData () {
      this.showResults = true
      console.log()
    },
    created () {
      let url = 'https://api.ebay.com/buy/browse/v1/item_summary/search?'
      url += 'q=' + this.ebaySearch + '&'
      url += 'limit=10'

      axios.get(url, {
        headers: {
          Authorization: 'Bearer' + ' ' +         }})
        .then(data => {
          this.info = data.data.itemSummaries
          console.log(this.info)
          // this.info = data.data.findItemsByKeywordsResponse[0].searchResult[0].item
          // console.log(this.info[0].galleryURL[0])
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
  #ebaySearchContainer{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
  #ebaySearch {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: space-between;
    width: 49%;
    height: auto;
    padding: 2em;
  }
  .ebayImg {
    width: 50%;
    min-height:171px;
  }
  #ebayPrice {
    float: right;
    font-weight: bold;
  }

  a {
    color: black;
    text-decoration: none;
  }

  a:hover {
    color: rgb(127,44,253);
  }
</style>
