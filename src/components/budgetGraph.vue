<template>
  <div class="small">
    <Doughnut v-if="budgetDataLoaded" :chart-data="datacollection" :options="optionCore"></Doughnut>
  </div>
</template>

<script>
import Doughnut from '../chart-data.js'
import { store } from '../store.js'

export default {
  components: {
    Doughnut,
    store
  },
  data () {
    return {
      budgetDataLoaded: false,
      datacollection: null,
      optionCore: null
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
        datasets: [
          {
            label: this.activeBudgetChartLabels,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            data: this.activeBudgetChartRemaining
          },
          {
            label: ['Planned'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            data: this.activeBudgetChartPlanned
          },
          {
            label: ['Spent'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            data: this.activeBudgetChartSpent
          }
        ]
      }
      this.optionCore = {
        rotation: -1.0 * Math.PI,
        circumference: Math.PI,
        responsive: true,
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex]
              var index = tooltipItem.index
              return dataset.label[index] + ': ' + dataset.data[index]
            }
          }
        }
      }
    }
  },
  computed: {
    activeBudgetChartLabels () {
      return this.$store.getters.budgetGroupsHeadings
    },
    activeBudgetChartRemaining () {
      return this.$store.getters.budgetGroupsChartRemaining
    },
    activeBudgetChartPlanned () {
      return this.$store.getters.budgetGroupsChartPlanned
    },
    activeBudgetChartSpent () {
      return this.$store.getters.budgetGroupsChartSpent
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
}
</script>

<style>
  .small {
    max-width: 600px;
    margin:  15px auto;
  }
</style>
