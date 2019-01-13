<template>
    <div class="budgetGraph">
      <canvas id="budget" width="400px" height="400px"></canvas>
    </div>
</template>

<script>
import { store } from '../store'
import Chart from 'chart.js'

export default {
  name: 'budgetGraph',
  components: {
    store,
    Chart
  }
}

</script>

<style scoped>

</style>
