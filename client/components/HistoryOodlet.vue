<template>
    <div class="historyOodlet">
        <ol>
            <li v-for="quantifiedThingy in oodlet.quantifiedThingies">
                {{ quantifiedThingy.name }} {{ quantifiedThingy.qty }} {{ quantifiedThingy.unit }}
            </li>
        </ol>
        <button @click="load">Load</button>
    </div>
</template>

<script>
    export default{
        props: ['oodlet'],

        methods: {
            load(){}
        },
    }
</script>

<style lang="sass" scoped>
  .historyOodlet {
    width: 400px;
    min-height: 500px;
    display: inline-block;
    background-color: #d2b8ea;
    vertical-align: top;
  }
</style>