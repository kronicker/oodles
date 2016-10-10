<template>
  <div id="navBar">
    <ul class="nav nav-tabs nav-stacked" data-spy="affix" offset-top="300">
      <li class=""><router-link to="/" data-toggle="tab"><span class="glyphicon glyphicon-shopping-cart"></span></router-link></li>
      <li class=""><router-link to="/historyView" data-toggle="tab"><span class="glyphicon glyphicon-time"></span></router-link></li>
      <li class=""><router-link to="/settingsView" data-toggle="tab"><span class="glyphicon glyphicon-cog"></span></router-link></li>
    </ul>
  </div>
</template>

<script>
</script>

<style lang="sass">
  #navBar{
    .affix{
      top: 300px;
    }

    ul li a span {
      font-size: xx-large;
    }
    ul li a {
      text-align: center;
    }
  }

</style>
