<template>
  <div tabindex="0" @focus="showTransContainer = true, showDeleteRow = true, isSelected = true" @blur="specialEvent($event)">
    <div class="progressbar">
      <div class="bar"></div>
    </div>
    <!--@blur="showTransContainer = false, showDeleteRow = false, isSelected = false"-->
    <div class="budgetItemRowContent">
      <span v-if="showDeleteRow" @click="deleteRow()" class="deleteRow">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 8 8">
          <path d="M3 0c-.55 0-1 .45-1 1h-1c-.55 0-1 .45-1 1h7c0-.55-.45-1-1-1h-1c0-.55-.45-1-1-1h-1zm-2 3v4.81c0 .11.08.19.19.19h4.63c.11 0 .19-.08.19-.19v-4.81h-1v3.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-3.5h-1v3.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-3.5h-1z" />
        </svg>
      </span>
      <!--input will update inputBudget-->
      <div class="budgetItemRow-Column1">
        <div tabindex="1" class="budgetItemLabel">
          <input v-model="label" type="text" maxlength="32" placeholder="Label" class="input-Budget-Inline-Small budgetItemRow-Input" @blur="specialEventChild($event)">
        </div>
      </div>
      <!--input that will update amoundbudgeted -->
      <div class="budgetItemRow-Column2">
        <div class="amountBudgetedInputContainer">
          <input v-model.number="amount" step=".01" class="amountBudgetedNumber budgetItemRow-Input input-Budget-Inline-Small" type="number" placeholder="$" @blur="specialEventChild($event)">
        </div>
      </div>
      <div class="budgetItemRow-Column3">
              <span class="budgetItemSecondColumnMoney-Spent">
                  <span class="money-symbol">$</span>
                  <span class="money-integer">{{ displayed }}</span>
              </span>
      </div>
    </div>
    <div v-if="showTransContainer" class="transFull">
      <div v-for="(trans, key) of budgetTransRowsList" :key="key">
        <budgetDetails id="transContainer" :rowuid="budgetitem.id" :groupBudgetId="groupId" :transItem="trans" :showTrans="showTransContainer" @change="showTransContainer = $event, showDeleteRow = $event"></budgetDetails>
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
  </div>
</template>

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
    },
    remainspent: {
      type: String,
      required: true
    }
  },
  data: () => {
    return {
      showTransContainer: false,
      showDeleteRow: false
    }
  },
  computed: {
    displayed: {
      get () {
        if (this.remainspent === 'Remaining') {
          return this.budgetitem.remaining
        } else if (this.remainspent === 'Spent') {
          return this.budgetitem.amountBudgeted - this.budgetitem.remaining
        }
      }
    },
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
        return this.budgetitem.amountBudgeted.toFixed(2)
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
    },
    groups: {
      get () {
        return this.$store.getters.budgetGroupsList
      }
    }
  },
  methods: {
    createNewTrans () {
      this.$store.commit({
        type: 'createTrans',
        id: this.groupId,
        buz: this.budgetitem.id
      })
    },
    deleteRow () {
      this.$store.commit({
        type: 'deleteRow',
        id: this.groupId,
        buz: this.budgetitem.id
      })
    },
    specialEvent (e) {
      if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
        this.showTransContainer = false
        this.showDeleteRow = false
      } else if (e.relatedTarget || e.currentTarget.contains(e.relatedTarget)) {
        e.relatedTarget.focus()
      }
    },
    specialEventChild (e) {
      if (e.relatedTarget == null) {
        this.showTransContainer = false
        this.showDeleteRow = false
      } else if (((e.relatedTarget.parentElement.className.indexOf('budgetItemLabel') >= 0) ||
        (e.relatedTarget.parentElement.className.indexOf('transItemLabel') >= 0) ||
        (e.relatedTarget.parentElement.className.indexOf('transInputContainer') >= 0) ||
        (e.relatedTarget.parentElement.id.indexOf('addTransaction') >= 0) ||
        (e.relatedTarget.parentElement.className.indexOf('amountBudgetedInputContainer') >= 0))) {
      } else {
        this.showTransContainer = false
        this.showDeleteRow = false
      }
    }
  },
  watch: {
    // Insanity that runs the progress bar
    // TODO Need to condence this
    displayed () {
      let count = -1
      let elem = document.getElementsByClassName('bar')
      let width = 1
      // console.log(this.groups)
      for (let group in this.groups) {
        // console.log(count)
        for (let row in this.groups[group]) {
          // console.log(this.groups[group])
          count++
          // console.log(count)
          if (this.groups[group].id === row) {
            // console.log(count)
            break
          }
        }
      }
      if (this.remainspent === 'Remaining') {
        width = (this.budgetitem.remaining / this.budgetitem.amountBudgeted) * 100
        // console.log(this.budgetitem.amountBudgeted)
        if (width < 0) {
          width = 100
          elem[count].style.backgroundColor = 'red'
          elem[count].style.width = width + '%'
        } else {
          elem[count].style.backgroundColor = 'cyan'
          elem[count].style.width = width + '%'
          // console.log(elem[count].style.width)
        }
      } else if (this.remainspent === 'Spent') {
        width = ((this.budgetitem.amountBudgeted - this.budgetitem.remaining) / this.budgetitem.amountBudgeted) * 100
        if (width < 0) {
          width = 100
          elem[count].style.backgroundColor = 'red'
          elem[count].style.width = width + '%'
        } else {
          elem[count].style.backgroundColor = 'cyan'
          elem[count].style.width = width + '%'
        }
      }
    }
  }
}

</script>

<style scoped>

  .progressbar {
    width: 100%;
    background-color: silver;
    border-radius: .7vh;
  }

  .bar {
    width: 1%;
    height: 5px;
    background-color: cyan;
    border-radius: .7vh;
  }

  .deleteRow {
    align-items: center;
    flex-wrap: wrap;
    display: flex;
    flex: 0 1 6%;
    z-index: 2;
    margin-left: -5px;
  }

  button {
    all: unset;
  }

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
    background-color: #878C8F;
    /*box-shadow: 0 0 20px 2px black;*/
    position: relative;
    border-radius: .7vh;
  }

  .budgetItemRow-Column1 {
    align-items: center;
    flex-wrap: wrap;
    display: flex;
    flex: 0 1 45%;
    z-index: 2;
  }

  .budgetItemRow-Column2, .budgetItemRow-Column3 {
    text-align: right;
    justify-content: flex-end;
    align-items: flex-end;
    display: flex;
    flex: 0 1 28%;
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
    background: whitesmoke;
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

  #transContainer {
    margin: 0 auto;
    width: 98%;
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
