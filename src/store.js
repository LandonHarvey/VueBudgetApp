import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

// creates a unique ID
const uniqId = () => {
  const timestamp = (new Date().getTime() / 1000 | 0).toString(16)
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
    return (Math.random() * 16 | 0).toString(16)
  }).toLowerCase()
}
const uid = uniqId()

export const store = new Vuex.Store({

  state: {
    // Current state of the application lies here.
    // State objects at web page load, base state
    budgetGroups: [
      {[uid]: {
        inputBudget: '',
        amountBudgeted: 0,
        remaining: 0,
        id: uid,
        trans: [
          {
            transDate: moment().format('MMM Do YY'),
            transLabel: '',
            transCost: 0,
            transId: uid
          }
        ]
      }}
    ],
    budgetItemHeadings: ['Housing'],
    budgetGroupObjectId: [uid]
  },

  getters: {
    // Compute derived state based on the current state. More like computed property.
    // gets the budgetGroup Array
    budgetGroupsList: state => {
      return state.budgetGroups
    },
    // gets the budget Headings
    budgetGroupsHeadings: state => {
      return state.budgetItemHeadings
    },
    budgetGroupsPlanned: state => {
      let remainingArray = []
      for (let i = 0; i < state.budgetGroups.length; i++) {
        let objObjects = state.budgetGroups[i]
        let arrayofobj = Object.keys(objObjects)
        let num = i
        let planned = 0
        for (let i = 0; i < arrayofobj.length; i++) {
          planned += state.budgetGroups[num][arrayofobj[i]].remaining
          console.log(planned)
        }
        remainingArray.push(planned)
        console.log(remainingArray)
      }
      return remainingArray
    },
    budgetGroupsObjectIds: state => {
      return state.budgetGroupObjectId
    }
  },

  mutations: {
    // Mutate the current state
    // Used to create a new group and push into budgets Group object
    createGroup (state) {
      const uid = uniqId()
      state.budgetGroups.push({
        [uid]: {
          inputBudget: '',
          amountBudgeted: 0,
          remaining: 0,
          id: uid,
          trans: [
            {
              transDate: moment().format('MMM Do YY'),
              transLabel: '',
              transCost: 0,
              transId: uid
            }
          ]
        }
      })
      state.budgetItemHeadings.push('')
      state.budgetGroupObjectId.push(uid)
    },
    // Creates a new row and set into budgetRows object (generate uniq id as well)
    createRow (state, index) {
      const uid = uniqId()
      Vue.set(state.budgetGroups[index], [uid], {
        inputBudget: '',
        amountBudgeted: 0,
        remaining: 0,
        id: uid,
        trans: [
          {
            transDate: moment().format('MMM Do YY'),
            transLabel: '',
            transCost: 0,
            transId: uid
          }
        ]
      })
    },
    // Creates a new transaction row and pushes into transaction array
    createTrans (state, payload) {
      const uid = uniqId()
      state.budgetGroups[payload.id][payload.buz].trans.push({
        transDate: moment().format('MMM Do YY'),
        transLabel: '',
        transCost: 0,
        transId: uid
      })
    },
    // Delete the Whole Group
    deleteGroup (state, payload) {
      Vue.delete(state.budgetGroups, [payload.index])
      Vue.delete(state.budgetItemHeadings, [payload.index])
    },
    // Deletes Row that is selected
    deleteRow (state, payload) {
      Vue.delete(state.budgetGroups[payload.id], [payload.buz])
    },
    // Deletes transaction that is selected
    deleteTran (state, payload) {
      const transactionIndex = state.budgetGroups[payload.id][payload.rowId].trans.findIndex(index => {
        return (index.transId === payload.transId)
      })
      Vue.delete(state.budgetGroups[payload.id][payload.rowId].trans, [transactionIndex])
    },
    // Updates AmountRemaining When a transaction is deleted
    updateBudgetHeading (state, payload) {
      state.budgetItemHeadings.splice(payload.index, 1, payload.heads)
    },
    // Updates Amount Budgeted when transaction is deleted
    updateAmountBudgetedOnDelete (state, payload) {
      let transactionTotal = state.budgetGroups[payload.groupId][payload.uid].remaining
      const transactionIndex = state.budgetGroups[payload.groupId][payload.uid].trans.findIndex(index => {
        return (index.transId === payload.transId)
      })
      transactionTotal = (((transactionTotal * 100) + (state.budgetGroups[payload.groupId][payload.uid].trans[transactionIndex].transCost * 100)) / 100)
      Vue.set(state.budgetGroups[payload.groupId][payload.uid], 'remaining', transactionTotal)
    },
    // Mutate the current rows AmountBudgeted
    updateAmountBudgeted (state, payload) {
      Vue.set(state.budgetGroups[payload.groupId][payload.uid], 'amountBudgeted', payload.amount)
      // state.budgetGroups[payload.groupId][payload.uid].amountBudgeted = payload.amount
      let transactionTotal = state.budgetGroups[payload.groupId][payload.uid].amountBudgeted
      state.budgetGroups[payload.groupId][payload.uid].trans.map(transaction => {
        transactionTotal = (((transactionTotal * 100) - (transaction.transCost * 100)) / 100)
        return transactionTotal
      })
      Vue.set(state.budgetGroups[payload.groupId][payload.uid], 'remaining', transactionTotal)
    },
    // mutate the current rows budget Label
    updateInputBudget (state, payload) {
      Vue.set(state.budgetGroups[payload.groupId][payload.uid], 'inputBudget', payload.label)
    },
    // mutate the current transaction rows Cost
    updateTransCost (state, payload) {
      const transactionId = state.budgetGroups[payload.groupBudgetId][payload.uid].trans.findIndex(index => {
        return (index.transId === payload.tranid)
      })
      state.budgetGroups[payload.groupBudgetId][payload.uid].trans[transactionId].transCost = ((payload.transAmount * 100) / 100)
      // calculating remaining for budgetRow
      let transactionTotal = state.budgetGroups[payload.groupBudgetId][payload.uid].amountBudgeted
      state.budgetGroups[payload.groupBudgetId][payload.uid].trans.map(transaction => {
        transactionTotal = (((transactionTotal * 100) - (transaction.transCost * 100)) / 100)
        return transactionTotal
      })
      Vue.set(state.budgetGroups[payload.groupBudgetId][payload.uid], 'remaining', transactionTotal)
    },
    // Mutate the current transaction rows Label
    updateTransLabel (state, payload) {
      const transactionLabelId = state.budgetGroups[payload.groupBudgetId][payload.uid].trans.findIndex(index => {
        return (index.transId === payload.tranid)
      })
      Vue.set(state.budgetGroups[payload.groupBudgetId][payload.uid].trans[transactionLabelId], 'transLabel', payload.transLabel)
    }
  }
})

// TODO https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats
