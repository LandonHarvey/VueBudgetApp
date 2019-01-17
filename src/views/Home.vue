
<template>
  <div id="homeView">
    <div id="budheader" class="box">Budget Stuff</div>
    <div id="sidebar" class="box">Sidebar</div>
    <div id="mobileSidebar">
      <div id="mobileMenuSidebar" class="box"><button id="mCircle" v-on:click="miniOpen = !miniOpen" v-on:blur="miniOpen = !miniOpen">M</button></div>
      <div v-if="miniOpen"><button id="statsBubble" class="minicircle" v-on:click="openBudget()">B</button></div>
      <div v-if="miniOpen"><button id="purchaseBubble" class="minicircle" v-on:click="openPurchase()">P</button></div>
      <div v-if="miniOpen"><button id="settingBubble" class="minicircle">O</button></div>
    </div>
    <div id="purchase" class="box">Purchase</div>
    <div id="budgetAndFinancialsContainer" class="box flex-container scrollSide">
      <div id="budgetChartNavContainer">
      <div class="budgetChartNav"><a>Total</a></div>
        <div class="budgetChartNav"><a @click="openRemainingGraph()">Remaining</a></div>
        <div class="budgetChartNav"><a>Spent</a></div>
      </div>
      <budgetGraph v-if="remainingGraphOpen"></budgetGraph>
      <div v-for="(budget, key) in budgetGroupViewLists" :key="key">
      <budgetGroup :numi="key" :group-card="[budget]"></budgetGroup>
      </div>
      <div class="budgetGroupCreation">
        <button id="addBudgetGroup" v-on:click="createBudgetGroup()">
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
            <path fill="#FD0EBF" d="M3 0v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2z"></path>
          </svg>
          Add Group
        </button>
      </div>
    </div>
    <div id="budfooter" class="box">Footer</div>
  </div>
</template>

<script>
import budgetGroup from '../components/budgetGroup.vue'
import budgetGraph from '../components/budgetGraph.vue'

export default {
  name: 'homeView',
  components: {
    budgetGroup,
    budgetGraph
  },
  data: () => {
    return {
      miniOpen: false,
      remainingGraphOpen: false,
      totalGraphOpen: false,
      spentGraphOpen: false
    }
  },
  computed: {
    budgetGroupViewLists () {
      return this.$store.getters.budgetGroupsList
    }
  },
  methods: {
    openPurchase () {
      document.getElementById('budgetAndFinancialsContainer').style.zIndex = '10'
      document.getElementById('purchase').style.zIndex = '15'
    },
    openBudget () {
      document.getElementById('purchase').style.zIndex = '10'
      document.getElementById('budgetAndFinancialsContainer').style.zIndex = '15'
    },
    openRemainingGraph () {
      this.remainingGraphOpen = true
      this.totalGraphOpen = false
      this.spentGraphOpen = false
    },
    createBudgetGroup () {
      this.$store.commit('createGroup')
    }
  }
}

</script>

<style scoped>
  #budgetChartNavContainer{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 2em;
  }

  .budgetChartNav {
    margin-right: 1em;
    font-size: 1.3em;
  }

  #homeView {
    grid-template-columns: 100%;
    grid-template-rows: 100%;
    grid-gap: .1em;
    height: 100vh;
    display: grid;
  }
  #budheader {
    display: none;
    padding: 1em 0;
  }

  .scrollSide {
    overflow-y: auto;
  }

  #budfooter, #sidebar {
    display: none;
  }

  #budgetAndFinancialsContainer{
    position: absolute;
    z-index: 10;
    height: 100%;
    width: 100%;
  }

  #purchase {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 5;
  }

  .flex-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  @media screen and (min-width: 600px) {

    #homeView {
      grid-template-columns: 6% 35% auto;
      grid-template-rows: 100%;
      grid-gap: .1em;
      height: 100vh;
      display: grid;
    }

    #budgetAndFinancialsContainer {
      position: relative;
    }

    #sidebar {
      display: block;
    }

    #mobileSidebar {
      display: none;
    }

    #purchase {
      position: relative;
      display: block;
      grid-row: 1/2;
      grid-column: 3/4;
    }
  }

  @media screen and (min-width: 1024px) {

    #homeView {
      grid-template-columns: 45% 55%;
      grid-template-rows: .8fr 8.7fr .5fr;
      grid-gap: .1em;
    }

    #budheader {
      display: block;
      grid-row: 1/2;
      grid-column: 1/3;
    }

    #budgetAndFinancialsContainer {
      grid-row: 2/3;
      grid-column: 1/2;
    }

    #purchase {
      grid-row: 2/3;
      grid-column: 2/3;
    }

    .flex-container {
      flex-direction: row;
    }

    #sidebar {
      display: none;
    }

    #budfooter {
      display: block;
      grid-row: 3/4;
      grid-column: 1/3;
    }
  }
</style>

<style>

  #statsBubble {
    position: fixed;
    bottom: 66px;
    left: 13px;
    background-color: green;
  }

  #settingBubble{
    position: fixed;
    bottom: 5px;
    left: 76px;
    background-color: red;
  }

  #purchaseBubble {
    position: fixed;
    bottom: 42px;
    left: 53px;
    background-color: purple;
  }

  #mobileSidebar {
    position: fixed;
    bottom: -34px;
    left: -33px;
    z-index: 10000;
  }

  .budgetGroupCreation {
    background: purple;
  }

  .minicircle {
    height: 35px;
    width: 35px;
    border-radius: 50%;
  }

  #mCircle {
    height: 89px;
    width: 89px;
    border-radius: 50%;
    background: blue;
    position: fixed;
    bottom: -34px;
    left: -33px;
  }
</style>
