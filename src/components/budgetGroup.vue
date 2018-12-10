<template>
  <div class="budgetGroup">
    <header><input title="CardTitle" type="text" v-bind:placeholder="budgetItemHeading"></header>
    <div class="budgetItemContainer">
      <div class="budgetItemRow">
        <!--creates new component when click event happens and places below-->
        <div v-for="(budget, key) in budgetRowsList" :key="key" v-if="Object.keys(budgetRowsList).length">
          <budgetItemRowContent :uid="key" :budgetitem="budget"></budgetItemRowContent>
          <progress data-min="0" data-max="100" data-value="20"></progress>
        </div>
      </div>
    </div>
    <footer class="budgetGroupFooter">
      <div class="budgetGroupFooter-Content budgetGroupFooter-Content--Narrow">
        <button class="addBudgetItem" id="addBudgetItem" v-on:click="createNewContent()">
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
  data: () => {
    return {
      budgetItemHeading: 'Housing'
      // creates array containing object for budget row information
    }
  },
  computed: {
    budgetRowsList () {
      return this.$store.getters.budgetList
    }
  },
  methods: {
    createNewContent () {
      this.$store.commit('createRow')
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
    color: red;
  }

  ::placeholder {
    color: black;
    font-size: 1.5em;
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
