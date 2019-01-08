<template>
  <!--Date Trans was created-->
  <div class="transItemRowContent" @click="showDelete = !showDelete">
    <button v-if="showDelete" @click="deleteTran()" class="deleteRow">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 8 8">
          <path d="M3 0c-.55 0-1 .45-1 1h-1c-.55 0-1 .45-1 1h7c0-.55-.45-1-1-1h-1c0-.55-.45-1-1-1h-1zm-2 3v4.81c0 .11.08.19.19.19h4.63c.11 0 .19-.08.19-.19v-4.81h-1v3.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-3.5h-1v3.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-3.5h-1z" />
        </svg>
      </button>
    <!--input will update transLabel-->
    <div class="transItemRow-Column1">
      <div class="transItemLabel">
        <input v-model="tranLabel" type="text" maxlength="32" placeholder="transLabel" class="input-Trans-Inline-Small transItemRow-Input">
      </div>
    </div>

    <!--input that will update Trans Amount -->
    <div class="transItemRow-Column2">
      <div class="transInputContainer">
        <input v-model.number="transAmount" step=".01" class="transNumber transItemRow-Input input-Trans-Inline-Small" type="number" placeholder="$">
      </div>
    </div>
    <div class="transItemRow-Column3">
      <div class="transItemDate">
        {{ transItem.transDate }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'budgetDetails',
  data: () => {
    return {
      showDelete: false,
    }
  },
  props: {
    groupBudgetId: {
      type: Number,
      required: true
    },
    transItem: {
      type: Object,
      required: true
    },
    rowuid: {
      type: String,
      required: true
    }
  },
  computed: {
    transAmount: {
      get () {
        return this.transItem.transCost
      },
      set (value) {
        this.$store.commit('updateTransCost', {
          transAmount: value,
          groupBudgetId: this.groupBudgetId,
          tranid: this.transItem.transId,
          uid: this.rowuid
        })
      }
    },
    tranLabel: {
      get () {
        return this.transItem.transLabel
      },
      set (label) {
        this.$store.commit('updateTransLabel', {
          transLabel: label,
          groupBudgetId: this.groupBudgetId,
          tranid: this.transItem.transId,
          uid: this.rowuid

        })
      }
    }
  },
  methods: {
    deleteTran () {
      this.$store.commit({
        type: 'deleteTran',
        id: this.groupBudgetId,
        rowId: this.rowuid,
        transId: this.transItem.transId
      })
    }
  }
}
</script>

<style scoped>

  .deleteRow {
    align-items: center;
    flex-wrap: wrap;
    display: flex;
    flex: 0 1 7%;
    z-index: 2;
    margin-left: -10px;
  }

  .transItemRowContent {
    display: flex;
    align-items: center;
    flex-direction: row;
    align-content: center;
    flex-wrap: nowrap;
    padding: .3em 1em;
    background-color: darkgoldenrod;
    position: relative;
  }

  .transItemRow-Column1 {
    align-items: center;
    flex-wrap: wrap;
    display: flex;
    flex: 0 1 45%;
    z-index: 2;
  }

  .transItemRow-Column2, .transItemRow-Column3 {
    text-align: right;
    justify-content: flex-end;
    align-items: flex-end;
    display: flex;
    flex: 0 1 28%;
    z-index: 2 ;
  }

  .transItemLabel {
    width: 100%;
    max-width: calc(100% - 30px);
    display: block;
  }

  .input-Trans-Inline-Small {
    display: inline-block;
    margin: 0;
    width: 100%;
    background: deepskyblue;
  }

  .transItemRow-Input {
    margin-right: -.5em;
    margin-left: -.5em;
    margin-bottom: .2em;
    border: 1px solid transparent;
    border-radius: .4em;
    padding: .4em;
    line-height: .1em;
  }

  .transInputContainer {
    flex-basis: 50%;
  }
</style>
