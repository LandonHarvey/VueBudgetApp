<template>
  <div class="budgetGroup">
    <header tabindex="0" @click="showDeleteGroup = !showDeleteGroup" @blur="showDeleteGroup = false">
      <span v-if="showDeleteGroup" @click="deleteGroup()" class="deleteRow">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 8 8">
          <path d="M3 0c-.55 0-1 .45-1 1h-1c-.55 0-1 .45-1 1h7c0-.55-.45-1-1-1h-1c0-.55-.45-1-1-1h-1zm-2 3v4.81c0 .11.08.19.19.19h4.63c.11 0 .19-.08.19-.19v-4.81h-1v3.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-3.5h-1v3.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-3.5h-1z" />
        </svg>
      </span>
      <input id="cardTitle" title="CardTitle" v-model="heading" type="text" placeholder="Category" @blur="showDeleteGroup = false"></header>
    <div class="tabBar">
      <div class="spacing"></div>
      <div class="planned">Planned</div>
      <div class="spentRemain" @click="switchBudgetFields()">{{ remainspent }} <div class="chevron"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 8 8">
      <path d="M1.5 0l-1.5 1.5 4 4 4-4-1.5-1.5-2.5 2.5-2.5-2.5z" transform="translate(0 1)" />
    </svg></div></div>
    </div>
    <div class="budgetItemContainer">
      <div class="budgetItemRow">
        <!--creates new component when click event happens and places below-->
        <div v-for="(budget, key) in budgetItemRowsList" :key="key" v-if="Object.keys(budgetItemRowsList).length">
          <progress max="100" value="20"></progress>
          <budgetItemRowContent :remainspent="remainspent" :groupId="numi" :budgetitem="budget"></budgetItemRowContent>
            <!--will create a new Transaction row inside of budgetRow-->
        </div>
      </div>
    </div>
    <footer class="budgetGroupFooter">
      <div class="budgetGroupFooter-Content budgetGroupFooter-Content--Narrow">
        <button class="addBudgetItem" id="addBudgetItem" @click="createNewContent()">
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
            <path fill="#FD0EBF" d="M3 0v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2z"></path>
          </svg>
          Add Item
        </button>
      </div>
    </footer>
  </div>
</template>

<script>
import { store } from '../store'
import budgetItemRowContent from '../components/budgetItemRowContent.vue'

export default {
  name: 'budgetGroup',
  components: {
    budgetItemRowContent,
    store
  },
  props: {
    // returns the Array element index of current group
    numi: {
      type: Number,
      required: true
    },
    // returns an array of objects for each row on the groups card
    groupCard: {
      type: Array,
      required: true
    }
  },
  data: () => {
    return {
      remainspent: 'Remaining',
      openTab: false,
      showDeleteGroup: false
    }
  },
  computed: {
    // returns the specific array element of this.numi in the stores budgetGroups array
    budgetItemRowsList () {
      return this.$store.getters.budgetGroupsList[this.numi]
    },
    heading: {
      get () {
        return this.$store.state.budgetItemHeadings[this.numi]
      },
      set (value) {
        this.$store.commit('updateBudgetHeading', {
          index: this.numi,
          heads: value
        })
      }
    }
  },
  methods: {
    // Creates a new Budget Row when a button is clicked
    createNewContent () {
      this.$store.commit('createRow', this.numi) // props directly as they get proxied to the main instance
    },
    // Switches from Spent to Remaining, will eventually change progress bars and numbers
    switchBudgetFields () {
      if (this.openTab === false) {
        this.remainspent = 'Spent'
        this.openTab = !this.openTab
      } else {
        this.remainspent = 'Remaining'
        this.openTab = !this.openTab
      }
    },
    deleteGroup () {
      this.$store.commit({
        type: 'deleteGroup',
        index: this.numi
      })
    }
  }
}

</script>

<style scoped>

  [tabindex] {
    outline: none;
  }

  header {
    color:black;
    font-size: 2em;
    padding: 1em 0;
    display: flex;
  }

  .deleteRow {
    align-items: center;
    flex-wrap: wrap;
    display: flex;
    flex: 0 1 7%;
    z-index: 2;
    margin-left: 7px;
  }

  .budgetGroup {
    margin: .5em 0;
    background: green;
  }

  .spacing {
    display: flex;
    flex: 0 1 50%;
    align-items: flex-end;
    justify-content: flex-end;
  }

  .spentRemain, .planned {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    text-align: right;
    font-size: 1.1em;
  }

  .tabBar {
    text-align: right;
    display: flex;
  }

  .planned {
    padding-right: 1em;
    flex: 0 1 25%;
  }

  .spentRemain {
    flex: 0 1 24%;
  }

  .chevron {
    display: inline-block;
  }

  .budgetItemRow {
    padding: .5em;
    position: relative;
  }

  progress {
    width: 100%;
    height: 3px;
    background-color: grey;
    z-index: 1;
    display: block;
    position: relative;
    border: 0;
    vertical-align: baseline;
  }
  progress {
    color: lightblue;
  }

  progress::-webkit-progress-value {
    background: lightblue;
  }

  progress::-webkit-progress-value {
    background: springgreen;
  }

  progress::-webkit-progress-bar {
    background: orange;
  }

  header>input {
    background-color: transparent;
    border: none;
  }

  #cardTitle {
    color: black;
    font-size: 1em;
  }

  .budgetGroupFooter {
    padding: 1.2em;
    display: flex;
    flex-wrap: nowrap;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
  }

  .budgetGroupFooter-Content.budgetGroupFooter-Content--Narrow {
    padding: 0;
    display: flex;
    flex: 0 1 33.33%;
  }

  .addBudgetItem {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 0;
    border: 0;
    padding: 0;
    color: #FD0EBF;
    background-color: transparent;
    font-weight: 600;
    vertical-align: inherit;
  }

  .addBudgetItem svg {
    margin-right: .8em;
    overflow: hidden;
  }

</style>
