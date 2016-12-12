<template>
  <div id="oodletView">
  
    <flash-message @dismissed="dismissed" :message="flashMessage" :type="flashType" ></flash-message>
    
    <div class="header page-header">
      <div class="row">
        <div class="col-md-3">
          <h1 class="text-info">Order</h1>
        </div>
        <div class="add-button col-md-offset-7 col-md-2">
          <button class="btn btn-block btn-success" data-toggle="modal" data-target="#suggestThingy"><span class="glyphicon glyphicon-plus"></span> Suggest new item</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="filtered-thingies col-md-9">
        <div class="row">
          <search-bar class="col-md-12" subject="item" @searchBarUpdate="searchBarUpdate"></search-bar>
        </div>
        <ul class="row">
            <li v-for="thingy in filteredThingies" class="col-md-2">
              <thingy-tile :thingy="thingy"></thingy-tile>
            </li>
          </ul>
      </div>
      <oodlet class="col-md-3"></oodlet>
    </div>
    
    <div class="modal fade" data-backdrop="static" data-keyboard="false" id="suggestThingy">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">Suggest new item</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <form class="form-horizontal col-md-10 col-md-offset-1">
                <fieldset>
                  <div class="form-group">
                    <input v-model="suggestedThingy.name" type="text" class="form-control" placeholder="Name">
                  </div>
                  <div class="form-group">
                    <input v-model="suggestedThingy.unit" type="text" class="form-control" placeholder="Unit">
                  </div>
                  <div class="form-group">
                    <input v-model="suggestedThingy.pictureUrl" type="url" class="form-control" placeholder="Picture URL">
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success" data-dismiss="modal" @click="suggestThingy">Suggest</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchBar from '../../components/common/SearchBar.vue'
  import FlashMessage from '../../components/common/FlashMessage.vue'
  import Oodlet from '../../components/user/Oodlet.vue'
  import ThingyTile from '../../components/user/ThingyTile.vue'

  export default{
    data() {
      return {
        searchString: '',
        suggestedThingy: {
          name: '',
          unit: '',
          pictureUrl: ''
        },
        flashMessage: '',
        flashType: '',
        thingies: []
      }
    },

    computed: {
      appInitialized() {
        return this.$store.getters.appInitialized;
      },
      oodler() {
        return this.$store.getters.oodler;
      },
      filteredThingies() {
        if(this.searchString.length < 1) {
          return this.thingies;
        }

        let searchString = this.searchString.toLowerCase();
        return this.thingies.filter(item => {
          return item.name.toLowerCase().indexOf(searchString) !== -1
        });
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
        this.$http.get('/thingy').then((response) => {
          let thingies = response.body;
          thingies.sort((a,b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1);
          this.thingies = thingies;
        });
      },
      suggestThingy() {
        this.$http.post('/suggestedThingy', {
          name: this.suggestedThingy.name,
          unit: this.suggestedThingy.unit,
          pictureUrl: this.suggestedThingy.pictureUrl,
          oodler: this.oodler
          
        }).then(
          response => {
            for(let property in this.suggestedThingy) {
              this.suggestedThingy[property] = '';
            }
            this.flashMessage = 'Your suggestion has been submitted!';
            this.flashType = 'info';
          },
          response => {
            for(let property in this.suggestedThingy) {
              this.suggestedThingy[property] = '';
            }
            this.flashMessage = 'Incorrect suggestion! Please try again';
            this.flashType = 'danger';
          });
      },
      dismissed() {
        this.flashMessage = '';
      }
    },
    
    beforeCreate() {
      if(this.$store.getters.oodler.scope === 'admin') {
        this.$router.replace({ path: '/admin' });
      }
    },

    mounted() {
      if(this.appInitialized) {
        this.load();
      }
    },

    components: {
      Oodlet,
      SearchBar,
      ThingyTile,
      FlashMessage
    }
  }
</script>

<style lang="sass" scoped>
  #oodletView {
    .page-header {
      margin: 0px 0 10px;
  
      h1, .add-button {
        margin-top: 20px;
        margin-bottom: 10px;
      }
    }

    .filtered-thingies ul {
      padding-left: 0;
      list-style: none;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-wrap: wrap;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
  
      li {
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
      }
    }
  }
</style>
