<template>
  <div class="historyOodlet">
    <span class="created-at">Created: </span>{{ oodlet.createdAt }}
    <ol>
      <li v-for="quantifiedThingy in oodlet.quantifiedThingies">
          {{ quantifiedThingy.name }} {{ quantifiedThingy.qty }} {{ quantifiedThingy.unit }}
      </li>
    </ol>
    <router-link to="/"><button @click="load">Load</button></router-link>
  </div>
</template>

<script>
  export default{
    props: ['oodlet'],

    methods: {
      load(){
        this.$store.dispatch('oodletSet', this.oodlet.quantifiedThingies);
      }
    },
  }
</script>

<style lang="sass" scoped>
  .historyOodlet {
    width: 400px;
    min-height: 500px;
    display: inline-block;
    vertical-align: top;

    .created-at {
      font-weight: bold;
    }
  }
</style>
