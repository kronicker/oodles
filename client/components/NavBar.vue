<template>
  <div id="navBar">
    <ul class="nav nav-tabs nav-stacked" data-spy="affix" offset-top="300">
      <li><router-link to="/" exact data-toggle="tab"><span class="glyphicon glyphicon-shopping-cart"></span></router-link></li>
      <li><router-link to="/historyView" data-toggle="tab"><span class="glyphicon glyphicon-time"></span></router-link></li>
      <li><router-link to="/settingsView" data-toggle="tab"><span class="glyphicon glyphicon-cog"></span></router-link></li>
    </ul>
  </div>
</template>

<script>
</script>

<style lang="sass">
  #navBar {

    .affix { top: 300px; }

    ul li a span { font-size: xx-large; }

    ul li a { text-align: center; }

    .router-link-active {
      background-color: #5bc0de;
      color: #2b3e50;
    }
  }

</style>
