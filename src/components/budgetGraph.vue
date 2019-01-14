<template>
  <div class="small">
    <Pie-chart :chart-data="datacollection"></Pie-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
import PieChart from '../chart-data.js'
import { store } from '../store.js'

export default {
  components: {
    PieChart,
    store
  },
  data () {
    return {
      datacollection: null,
      budgetDataLoaded: false
    }
  },
  methods: {
    // where the data will be filled into the graph
    fillData () {
      this.datacollection = {
        labels: ['hi', 'bye'],
        datasets: [
          {
            label: 'hi',
            backgroundColor: '#f87979',
            data: [2]
          },
          {
            label: 'bye',
            backgroundColor: '#f87979',
            data: [1]
          }
        ]
      }
    }
  },
  // computed: {
  //   activeBudgetChartData () {
  //
  //   }
  // },
  mounted () {
    this.fillData()
  }
  // updated() {
  //   // should update datacollection when it detects a change in the store
  //   // (i.e. after updatePredictionData gets called)
  //   this.fillData()
  // }
}
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
