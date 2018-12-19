<template>
  <div>
    <div class="budgetItemRowContent">
      <!--input will update inputBudget-->
      <div class="budgetItemRow-Column">
        <div class="budgetItemLabel">
          <input v-model="label" type="text" maxlength="32" placeholder="Label" class="input-Budget-Inline-Small budgetItemRow-Input">
        </div>
      </div>

      <!--input that will update amoundbudgeted -->
      <div class="budgetItemRow-Column">
        <div class="amountBudgetedInputContainer">
          <input v-model.number="amount" step=".01" class="amountBudgetedNumber budgetItemRow-Input input-Budget-Inline-Small" type="number" placeholder="$">
        </div>
      </div>
      <div class="budgetItemRow-Column">
              <span class="budgetItemSecondColumnMoney-Spent">
                  <span class="money-symbol">$</span>
                  <span class="money-integer"></span>
                  <!--<span class="money-decimal">.</span>-->
                  <!--<span class="money-fractional">00</span>-->
              </span>
      </div>
    </div>
    <div v-for="(trans, key) of budgetTransRowsList" :key="key">
      <budgetDetails :groupBudgetId="groupId" :transItem="trans"></budgetDetails>
    </div>
    <div id="transactionContainer">
      <div id="addTransaction">
        <button @click="createNewTrans()">
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
            <path fill="#FD0EBF" d="M3 0v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2z"></path>
          </svg>
          Add Transaction
        </button>
      </div>
    </div>
  </div>
</template>

<!--<div v-for="(trans, key) in budgetItemRowsList" :key="key">-->
  <!--<budgetDetails :groupId="numi" :transtitem="trans"></budgetDetails>-->
<!--</div>-->

<script>
import budgetDetails from '../components/budgetDetails.vue'

export default {
  components: {
    budgetDetails
  },
  props: {
    groupId: {
      type: Number,
      required: true
    },
    budgetitem: {
      type: Object,
      required: true
    }
  },
  computed: {
    label: {
      get () {
        return this.budgetitem.inputBudget
      },
      set (label) {
        this.$store.commit('updateInputBudget', {
          uid: this.budgetitem.id,
          groupId: this.groupId,
          label: label
        })
      }
    },
    amount: {
      get () {
        return this.budgetitem.amountBudgeted
      },
      set (value) {
        this.$store.commit('updateAmountBudgeted', {
          uid: this.budgetitem.id,
          groupId: this.groupId,
          amount: value
        })
      }
    },
    budgetTransRowsList () {
      return this.$store.getters.budgetGroupsList[this.groupId][this.budgetitem.id].trans
    }
  },
  methods: {
    createNewTrans () {
      this.$store.commit({
        type: 'createTrans',
        id: this.groupId,
        buz: this.budgetitem.id
      })
    }
  }
}

</script>

<style scoped>

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .budgetItemRowContent {
    display: flex;
    align-items: center;
    flex-direction: row;
    align-content: center;
    flex-wrap: nowrap;
    padding: .3em 1em;
    background-color: orangered;
    position: relative;
  }

  .budgetItemRow-Column:first-of-type {
    align-items: center;
    flex-wrap: wrap;
    display: flex;
    flex: 0 1 50%;
    z-index: 2;
  }

  .budgetItemRow-Column:nth-child(2), .budgetItemRow-Column:nth-child(3) {
    text-align: right;
    justify-content: flex-end;
    align-items: flex-end;
    display: flex;
    flex: 0 1 25%;
    z-index: 2 ;
  }

  .budgetItemLabel {
    width: 100%;
    max-width: calc(100% - 30px);
    display: block;
  }

  .input-Budget-Inline-Small {
    display: inline-block;
    margin: 0;
    width: 100%;
    background: deepskyblue;
  }

  .budgetItemRow-Input {
    margin-right: -.5em;
    margin-left: -.5em;
    margin-bottom: .2em;
    border: 1px solid transparent;
    border-radius: .4em;
    padding: .4em;
    line-height: .1em;
  }

  .amountBudgetedInputContainer {
    flex-basis: 50%;
  }

  .amountBudgetedNumber {
    border: none;
  }

  #transactionContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
  }

  #addTransaction {
    display: flex;
    justify-content: center;
    text-align: center;
    align-self: center;
    background: white;
    width: 98%;
  }

</style>
