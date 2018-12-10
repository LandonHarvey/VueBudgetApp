import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// creates a unique ID
const uniqId = () => {
  const timestamp = (new Date().getTime() / 1000 | 0).toString(16)
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
    return (Math.random() * 16 | 0).toString(16)
  }).toLowerCase()
}

export const store = new Vuex.Store({

  state: {
    // Current state of the application lies here.
    // budgetRows array at webpage load, base state
    budgetGroups: {},
    budgetRows: {}
  },
  getters: {
    // Compute derived state based on the current state. More like computed property.
    budgetGroupsList: state => {
      return state.budgetGroups
    },
    // Gets budgetRows array from state
    budgetList: state => {
      return state.budgetRows
    }
    // should get single array items from budgetRows based on component being accessed
  },
  mutations: {
    // Mutate the current state
    // Used to create a new row and push into budgetRows array (generate uniq id as well)
    createRow (state) {
      const uid = uniqId()
      Vue.set(state.budgetRows, [uid], {
        inputBudget: '',
        amountBudgeted: 0,
        remaining: 0
      })
      // console.log(state.budgetRows)
    },
    // suppose to mutate the current row of that components amountbudgeted item in array
    updateAmountBudgeted (state, payload) {
      state.budgetRows[payload.uid].amountBudgeted = payload.amount
    },
    updateInputBudget (state, payload) {
      state.budgetRows[payload.uid].inputBudget = payload.label
    }
  },
  actions: {
    // Get data from server and send that to mutations to mutate the current state
  }
})
