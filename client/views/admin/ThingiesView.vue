<template>
  <div id="thingiesView">
    <flash-message v-if="flashMessage" @dismissed="dismissed" :message="flashMessage" :type="flashType" ></flash-message>
    <div class="header page-header">
      <div class="row">
        <div class="col-md-3">
          <h1 class="text-info">Items</h1>
        </div>
        <div class="add-button col-md-offset-8 col-md-1">
          <button class="btn btn-block btn-success" data-toggle="modal" data-target="#newThingy"><span class="glyphicon glyphicon-plus"></span> Add</button>
        </div>
      </div>
    </div>
    <div class="row">
      <search-bar class="col-md-12" subject="item" @searchBarUpdate="searchBarUpdate"></search-bar>
    </div>
    <div class="row filtered-thingies">
      <div v-for="thingy in filteredThingies" :key="thingy.id" class="col-md-3">
        <thingy-edit-tile  @thingyUpdate="load" :thingy="thingy"></thingy-edit-tile>
      </div>
    </div>
    <div class="modal fade" data-backdrop="static" data-keyboard="false" id="newThingy">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">Add new item</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <form class="form-horizontal col-md-10 col-md-offset-1">
                <fieldset>
                  <div class="form-group">
                    <input v-model="newThingy.name" type="text" class="form-control" placeholder="Name">
                  </div>
                  <div class="form-group">
                    <input v-model="newThingy.unit" type="text" class="form-control" placeholder="Unit">
                  </div>
                  <div class="form-group">
                    <input v-model="newThingy.pictureUrl" type="url" class="form-control" placeholder="Picture URL">
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success" data-dismiss="modal" @click="save">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import sortBy from 'lodash/sortBy';

  import FlashMessage from '../../components/common/FlashMessage.vue';
  import SearchBar from '../../components/common/SearchBar.vue';
  import ThingyEditTile from '../../components/admin/ThingyEditTile.vue';

  export default{
    data() {
      return {
        searchString: '',
        thingies: [],
        flashMessage: '',
        flashType: '',
        newThingy: {
          name: '',
          unit: '',
          pictureUrl: ''
        }
      };
    },
    computed: {
      appInitialized() {
        return this.$store.getters.appInitialized;
      },
      filteredThingies() {
        if (this.searchString.length < 1) {
          return this.thingies;
        }

        const searchString = this.searchString.toLowerCase();
        return this.thingies.filter(item => item.name.toLowerCase().includes(searchString));
      }
    },
    watch: {
      appInitialized() {
        this.load();
      }
    },
    methods: {
      searchBarUpdate(query) {
        this.searchString = query;
      },
      load() {
        this.$http.get('/thingy').then(response => {
          this.thingies = sortBy(response.body, thingy => thingy.name.toLowerCase());
        });
      },
      save() {
        this.$http.post('/thingy', this.newThingy).then(
          () => {
            Object.keys(this.newThingy).forEach(key => {
              this.newThingy[key] = '';
            });
            this.flashMessage = 'Success! New item added!';
            this.flashType = 'success';
            this.load();
          },
          () => {
            Object.keys(this.newThingy).forEach(key => {
              this.newThingy[key] = '';
            });
            this.flashMessage = 'Oops! Something went wrong! Please, try again!';
            this.flashType = 'danger';
            this.load();
         });
      },
      dismissed() {
        this.flashMessage = '';
      }
    },
    beforeCreate() {
      if (this.$store.getters.oodler.scope === 'user') {
        this.$router.replace({ path: '/' });
      }
    },
    mounted() {
      if (this.appInitialized) {
        this.load();
      }
    },
    components: {
      SearchBar,
      ThingyEditTile,
      FlashMessage
    }
  };
</script>

<style lang="scss" scoped>
  #thingiesView {
    .page-header {
      margin: 0px 0 10px;

      h1, .add-button {
        margin-top: 20px;
        margin-bottom: 10px;
      }
    }

    .filtered-thingies {
      padding-left: 0;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-wrap: wrap;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;

      .thingy-edit-tile {
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
      }
    }
  }
</style>
