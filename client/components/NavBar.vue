<template>
  <div id="navBar">
    <ul>
      <li><router-link to="/oodletView">Go to Foo</router-link></li>
      <li><router-link to="/historyView">Go to Foo</router-link></li>
      <li><router-link to="/settingsView">Go to Foo</router-link></li>
    </ul>
  </div>
</template>

<script>
  export default{
    methods:{
      oodletView(){
        this.$emit('navOodletView');
      },

      historyView(){
        this.$emit('navHistoryView');
      },

      settingsView(){
        this.$emit('navSettingsView');
      },
    }
  }
</script>

<style lang="sass">
  #navBar{
    width: 1200px;
    margin: 0 auto;

    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: #6577a5;
    }

    li {
      float: left;
    }

    li a {
      display: block;
      color: white;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
    }

    li a:hover {
      cursor: pointer;
      background-color: #35405b;
    }
  }
</style>
