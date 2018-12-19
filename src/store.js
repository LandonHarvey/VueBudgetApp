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
    ]
  },

  getters: {
    // Compute derived state based on the current state. More like computed property.
    // gets the budgetGroup objects
    budgetGroupsList: state => {
      return state.budgetGroups
    }
    // should get single array items from budgetRows based on component being accessed
  },

  mutations: {
    // Mutate the current state
    // Used to create a new group and push into budgets Group object
    createGroup (state) {
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
    },
    // Used to create a new row and set into budgetRows object (generate uniq id as well)
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
    createTrans (state, payload) {
      const uid = uniqId()
      console.log(state.budgetGroups[payload.id][payload.buz].trans)
      state.budgetGroups[payload.id][payload.buz].trans.push({
        transDate: moment().format('MMM Do YY'),
        transLabel: '',
        transCost: 0,
        transId: uid
      })
    },
    // suppose to mutate the current row of that components amountbudgeted item in array
    updateAmountBudgeted (state, payload) {
      state.budgetGroups[payload.groupId][payload.uid].amountBudgeted = payload.amount
    },
    updateInputBudget (state, payload) {
      state.budgetGroups[payload.groupId][payload.uid].inputBudget = payload.label
    }
  }
})
