<template>
  <div class="thingy-edit-tile">
    <div class="thumbnail">
      <img :src="thingy.pictureUrl">
      <div class="row">
        <form @submit="updateThingy" class="form-horizontal col-md-12">
          <div v-show="editing.name" class="form-group form-group-sm">
            <label for="name" class="col-md-2 control-label">Name</label>
            <div class="col-md-6">
              <input type="text" v-model="editedThingy.name" class="form-control input-sm" id="name">
            </div>
            <div class="btn-group col-md-4">
              <button type="submit" class="col-md-8 btn btn-sm btn-success">Save</button>
              <button type="reset" @click="cancel('name')" class="col-md-4 btn btn-sm btn-default"><span class="glyphicon glyphicon-remove"></span></button>
            </div>
          </div>
        </form>
        <div class="col-md-12">
          <table v-show="!editing.name" class="table table-striped table-hover col-md-12">
            <tbody>
            <tr @click="edit('name')">
              <td class="col-md-2">Name</td>
              <td class="col-md-9">{{ thingy.name }}</td>
              <td class="col-md-1"><a class="hover-btn"><span class="glyphicon glyphicon-pencil"></span></a></td>
            </tr>
            </tbody>
          </table>
        </div>
        
        <form @submit="updateThingy" class="form-horizontal col-md-12">
          <div v-show="editing.unit" class="form-group form-group-sm">
            <label for="unit" class="col-md-2 control-label">Unit</label>
            <div class="col-md-6">
              <input type="text" v-model="editedThingy.unit" class="form-control input-sm" id="unit">
            </div>
            <div class="btn-group col-md-4">
              <button type="submit" class="col-md-8 btn btn-sm btn-success">Save</button>
              <button type="reset" @click="cancel('unit')" class="col-md-4 btn btn-sm btn-default"><span class="glyphicon glyphicon-remove"></span></button>
            </div>
          </div>
        </form>
        <div class="col-md-12">
          <table v-show="!editing.unit" class="table table-striped table-hover col-md-12">
            <tbody>
            <tr @click="edit('unit')">
              <td class="col-md-2">Unit</td>
              <td class="col-md-9">{{ thingy.unit }}</td>
              <td class="col-md-1"><a class="hover-btn"><span class="glyphicon glyphicon-pencil"></span></a></td>
            </tr>
            </tbody>
          </table>
        </div>
        
        <form @submit="updateThingy" class="form-horizontal col-md-12">
          <div v-show="editing.pictureUrl" class="form-group form-group-sm">
            <label for="name" class="col-md-2 control-label">Picture Url</label>
            <div class="col-md-6">
              <input type="text" v-model="editedThingy.pictureUrl" class="form-control input-sm" id="pictureUrl">
            </div>
            <div class="btn-group col-md-4">
              <button type="submit" class="col-md-8 btn btn-sm btn-success">Save</button>
              <button type="reset" @click="cancel('pictureUrl')" class="col-md-4 btn btn-sm btn-default"><span class="glyphicon glyphicon-remove"></span></button>
            </div>
          </div>
        </form>
        <div class="col-md-12">
          <table v-show="!editing.pictureUrl" class="table table-striped table-hover col-md-12">
            <tbody>
              <tr @click="edit('pictureUrl')">
                <td class="col-md-2">Picture Url</td>
                <td class="col-md-9">{{ thingy.pictureUrl }}</td>
                <td class="col-md-1"><a class="hover-btn"><span class="glyphicon glyphicon-pencil"></span></a></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="form-group col-md-12">
          <div class="btn-group btn-group-justified">
            <a type="button" data-toggle="modal" :data-target="'#' + thingy.id + 'delete'" class="btn btn-xs btn-danger">Delete</a>
          </div>
        </div>
      </div>
    </div>
  
    <div class="modal fade" data-backdrop="static" data-keyboard="false" :id="thingy.id + 'delete'">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">Do you really want to remove this user?</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <tbody>
              <tr>
                <td class="col-md-4">Name</td>
                <td class="col-md-8">{{ thingy.name }}</td>
              </tr>
              <tr>
                <td class="col-md-4">Unit</td>
                <td class="col-md-8">{{ thingy.unit }}</td>
              </tr>
              <tr>
                <td class="col-md-4">Picture Url</td>
                <td class="col-md-8">{{ thingy.pictureUrl }}</td>
              </tr>
              </tbody>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal" @click="removeThingy">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  
  export default {
    data() {
      return {
        editedThingy: {},
        editing: {
          name: false,
          unit: false,
          pictureUrl: false
        }
      }
    },
  
    props: ['thingy'],
    
    methods: {
      updateThingy() {
        this.$http.put('/thingy/' + this.thingy.id,
          {
            name: this.editedThingy.name,
            unit: this.editedThingy.unit,
            pictureUrl: this.editedThingy.pictureUrl
          })
          .then(response => {
            if(response.ok) {
              this.$emit('thingyUpdate');
              for(let property in this.editing) {
                this.$set(this.editing, property, false);
              }
            }
          });
      },
      removeThingy() {
        this.$http.delete('/thingy/' + this.thingy.id)
          .then(response => {
            this.$emit('thingyUpdate');
          });
      },
      edit(el) {
        this.$set(this.editing, el, true);
      },
      cancel(el) {
        this.$set(this.editedThingy, el, this.thingy[el]);
        this.$set(this.editing, el, false);
      }
    },
  
    mounted() {
      Object.assign(this.editedThingy, this.thingy);
    },
    
    beforeUpdate() {
      Object.assign(this.editedThingy, this.thingy);
    }
  }
</script>

<style lang="scss" scoped>
  .thingy-edit-tile  .thumbnail {
    padding: 5px 10px 0;
    max-width: 100%;
  
    .control-label { padding-left: 21px }
  
    img { margin-bottom: 5px; }
    
    .form-horizontal .control-label { text-align: left; }
    
    .table {
      table-layout:fixed;
      margin-bottom: 15px;
      tr {
        cursor: text;
        td {overflow: hidden; overflow-wrap: break-word;}
        .hover-btn {
          position: absolute;
          right: 15px;
          display: none;
        }
      }
      tr:hover .hover-btn { display: block; }
    }
  }
</style>
