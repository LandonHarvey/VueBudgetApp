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
        labels: this.activeBudgetChartLabels,
        datasets: [
          {
            label: 'Planned',
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            data: this.activeBudgetChartPlanned
          }
        ]
      }
    }
  },
  computed: {
    activeBudgetChartLabels () {
      return this.$store.getters.budgetGroupsHeadings
    },
    activeBudgetChartPlanned () {
      return this.$store.getters.budgetGroupsPlanned
    }
  },
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
    margin:  15px auto;
  }
</style>
