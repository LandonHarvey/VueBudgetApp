<template>
  <div class="budgetGroup">
    <header><input id="cardTitle" title="CardTitle" v-model="budgetItemHeading" type="text" v-bind:placeholder="budgetItemHeading"></header>
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
          <progress data-min="0" data-max="100" data-value="20"></progress>
          <budgetItemRowContent :groupId="numi" :budgetitem="budget"></budgetItemRowContent>
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
import budgetItemRowContent from '../components/budgetItemRowContent.vue'
import { store } from '../store'

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
      budgetItemHeading: 'Category',
      remainspent: 'Remaining',
      openTab: false
    }
  },
  computed: {
    // returns the specific array element of this.numi in the stores budgetGroups array
    budgetItemRowsList () {
      return this.$store.getters.budgetGroupsList[this.numi]
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
    }
  }
}

</script>

<style scoped>

  header {
    color:black;
    font-size: 2em;
    padding: 1em 0;
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
    height: 1px;
    background-color: grey;
    z-index: 1;
    display: block;
    position: relative;
    border: 0;
    vertical-align: baseline;
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
