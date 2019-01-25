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
            label: ['Planned'],
            backgroundColor: 'rgb(127,44,203)',
            data: this.activeBudgetChartPlanned
          },
          {
            label: this.activeBudgetChartLabels,
            backgroundColor: ['rgba(163,11,55,0.2)', 'rgba(163,217,255,0.2)', 'rgba(127,44,203,0.2)', 'rgba(239,171,255,0.2)', 'rgba(230,194,41,0.2)'],
            data: this.activeBudgetChartRemaining
          },
          {
            label: this.activeBudgetChartLabels,
            backgroundColor: ['rgba(163,11,55,0.2)', 'rgba(163,217,255,0.2)', 'rgba(127,44,203,0.2)', 'rgba(239,171,255,0.2)', 'rgba(230,194,41,0.2)'],
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
              console.log(tooltipItem)
              console.log(data)
              console.log(index)
              console.log(dataset)
              if (tooltipItem.index === dataset.data.length - 1 && tooltipItem.datasetIndex === 2) {
                return 'Remaining' + ': ' + dataset.data[index]
              } else if (tooltipItem.index === dataset.data.length - 1 && tooltipItem.datasetIndex === 1) {
                return 'Spent' + ': ' + dataset.data[index]
              } else {
                return dataset.label[index] + ': ' + dataset.data[index]
              }
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

    margin:  15px auto;
    position: relative;
  }
</style>
