<template>
  <div class="small">
    <Pie-chart v-if="budgetDataLoaded" :chart-data="datacollection"></Pie-chart>
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
      budgetDataLoaded: false,
      datacollection: null
    }
  },
  async mounted () {
    this.fillData()
    this.budgetDataLoaded = true
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
            data: this.activeBudgetChartRemaining
          }
        ]
      }
    }
  },
  computed: {
    activeBudgetChartLabels () {
      return this.$store.getters.budgetGroupsHeadings
    },
    activeBudgetChartRemaining () {
      return this.$store.getters.budgetGroupsChartRemaining
    }
  },
  watch: {
    activeBudgetChartRemaining () {
      this.fillData()
    },
    activeBudgetChartLabels () {
      this.fillData()
    }
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
