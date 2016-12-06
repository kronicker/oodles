<template>
  <div id="suggestionsView">
    <div class="header page-header">
      <div class="row">
        <div class="col-md-3">
          <h1 class="text-info">Suggestions</h1>
        </div>
      </div>
    </div>
    <div class="row">
      <search-bar class="col-md-12" subject="suggestion" @searchBarUpdate="searchBarUpdate"></search-bar>
    </div>
    <div class="row filtered-suggestions">
      <div v-for="suggestedThingy in filteredSuggestions" class="col-md-3">
        <suggested-thingy-tile  @suggestionUpdate="load" :suggestedThingy="suggestedThingy"></suggested-thingy-tile>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchBar from '../../components/common/SearchBar.vue'
  import SuggestedThingyTile from '../../components/admin/SuggestedThingyTile.vue'
  
  export default{
    data() {
      return {
        searchString: '',
        suggestions: [],
      }
    },
    
    computed: {
      appInitialized() {
        return this.$store.getters.appInitialized;
      },
      filteredSuggestions() {
        if(this.searchString.length < 1) {
          return this.suggestions;
        }
        
        let searchString = this.searchString.toLowerCase();
        return this.suggestions.filter(item => item.name.toLowerCase().includes(searchString));
      }
    },
    
    watch: {
      appInitialized() { //Cannot be arrow fn cause that way 'this' wouldn't be Vue instance
        this.load()
      }
    },
    
    methods: {
      searchBarUpdate(query) {
        this.searchString = query;
      },
      load() {
        this.$http.get('/suggestedThingy').then(response => {
          this.suggestions = response.body;
        });
      }
    },
    
    beforeCreate() {
      if(this.$store.getters.oodler.scope === 'user') {
        this.$router.replace({ path: '/' });
      }
    },
    
    mounted() {
      if(this.appInitialized) {
        this.load();
      }
    },
    
    components: {
      SearchBar,
      SuggestedThingyTile
    }
  }
</script>

<style lang="sass" scoped>
  #suggestionsView {
    .page-header {
      margin: 0px 0 10px;

      h1 {
        margin-top: 20px;
        margin-bottom: 10px;
      }
    }
  
    .suggested-thingies {
      padding-left: 0;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-wrap: wrap;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
    
      .suggested-thingy-tile {
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
      }
    }
  }
</style>
