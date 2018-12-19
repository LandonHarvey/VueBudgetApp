<template>
  <!--Date Trans was created-->
  <div class="transItemRowContent">

    <!--input will update transLabel-->
    <div class="transItemRow-Column">
      <div class="transItemLabel">
        <input type="text" maxlength="32" placeholder="transLabel" class="input-Trans-Inline-Small transItemRow-Input">
      </div>
    </div>

    <!--input that will update Trans Amount -->
    <div class="transItemRow-Column">
      <div class="transInputContainer">
        <input step=".01" class="transNumber transItemRow-Input input-Trans-Inline-Small" type="number" placeholder="$">
      </div>
    </div>
    <div class="transItemRow-Column">
      <div class="transItemDate">
        {{ transItem.transDate }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'budgetDetails',
  props: {
    groupBudgetId: {
      type: Number,
      required: true
    },
    transItem: {
      type: Object,
      required: true
    }
  },
  computed: {
  }
}
</script>

<style scoped>

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

  .transItemRow-Column:first-of-type {
    align-items: center;
    flex-wrap: wrap;
    display: flex;
    flex: 0 1 50%;
    z-index: 2;
  }

  .transItemRow-Column:nth-child(2), .transItemRow-Column:nth-child(3) {
    text-align: right;
    justify-content: flex-end;
    align-items: flex-end;
    display: flex;
    flex: 0 1 25%;
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
