<template>
  <div class="transItemRowContent">
    <div class="transItemRow-Column">
      <div class="transItemDate">
      </div>
    </div>

    <!--input will update inputBudget-->
    <div class="transItemRow-Column">
      <div class="transItemLabel">
        <input v-model="transLabel" type="text" maxlength="32" placeholder="transLabel" class="input-Trans-Inline-Small transItemRow-Input">
      </div>
    </div>

    <!--input that will update amoundbudgeted -->
    <div class="transItemRow-Column">
      <div class="transInputContainer">
        <input v-model.number="amount" step=".01" class="transNumber transItemRow-Input input-Trans-Inline-Small" type="number" placeholder="$">
      </div>
    </div>
    <div class="transItemRow-Column">
            <span class="transItemSecondColumnMoney-Spent">
                <span class="money-symbol">$</span>
                <span class="money-integer"></span>
              <!--<span class="money-decimal">.</span>-->
              <!--<span class="money-fractional">00</span>-->
            </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'budgetDetails',
  props: {
    groupBudgetId: {
      type: Number,
      required: true
    },
    transItem: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
