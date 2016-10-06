<template>
  <div id="navBar">
    <ul>
      <li><router-link to="/">Oodlet</router-link></li>
      <li><router-link to="/historyView">History</router-link></li>
      <li><router-link to="/settingsView">Settings</router-link></li>
    </ul>
  </div>
</template>

<script>
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
