<template>
  <div class="thingy-edit-tile">
    <div class="thumbnail">
      <img :src="thingy.pictureUrl">
      <div class="row">
        
        <form @submit="updateThingy('name')" class="form-horizontal col-md-12">
          <div v-show="editing.name" class="form-group form-group-sm">
            <label for="name" class="col-lg-2 control-label">Name</label>
            <div class="col-lg-6">
              <input type="text" v-model="editThingy.name" class="form-control input-sm" id="name">
            </div>
            <div class="btn-group col-lg-4">
              <button type="submit" class="col-lg-8 btn btn-sm btn-success">Save</button>
              <button type="reset" @click="cancel('name')" class="col-lg-4 btn btn-sm btn-default"><span class="glyphicon glyphicon-remove"></span></button>
            </div>
          </div>
          
          <table v-show="!editing.name" class="table table-striped table-hover col-md-12">
            <tbody>
            <tr @click="edit('name')">
              <td class="col-lg-2 right">Name</td>
              <td class="col-lg-8">{{ thingy.name }}</td>
              <td class="col-lg-2"><a class="hover-btn"><span class="glyphicon glyphicon-pencil"></span></a></td>
            </tr>
            </tbody>
          </table>
        </form>
        
        <form @submit="updateThingy('unit')" class="form-horizontal col-md-12">
          <div v-show="editing.unit" class="form-group form-group-sm">
            <label for="unit" class="col-lg-2 control-label">Unit</label>
            <div class="col-lg-6">
              <input type="text" v-model="editThingy.unit" class="form-control input-sm" id="unit">
            </div>
            <div class="btn-group col-lg-4">
              <button type="submit" class="col-lg-8 btn btn-sm btn-success">Save</button>
              <button type="reset" @click="cancel('unit')" class="col-lg-4 btn btn-sm btn-default"><span class="glyphicon glyphicon-remove"></span></button>
            </div>
          </div>
          
          <table v-show="!editing.unit" class="table table-striped table-hover col-md-12">
            <tbody>
            <tr @click="edit('unit')">
              <td class="col-lg-2 right">Unit</td>
              <td class="col-lg-8">{{ thingy.unit }}</td>
              <td class="col-lg-2"><a class="hover-btn"><span class="glyphicon glyphicon-pencil"></span></a></td>
            </tr>
            </tbody>
          </table>
        </form>
        
        <form @submit="updateThingy('pictureUrl')" class="form-horizontal col-md-12">
          <div v-show="editing.pictureUrl" class="form-group form-group-sm">
            <label for="name" class="col-lg-2 control-label">Picture Url</label>
            <div class="col-lg-6">
              <input type="text" v-model="editThingy.pictureUrl" class="form-control input-sm" id="pictureUrl">
            </div>
            <div class="btn-group col-lg-4">
              <button type="submit" class="col-lg-8 btn btn-sm btn-success">Save</button>
              <button type="reset" @click="cancel('pictureUrl')" class="col-lg-4 btn btn-sm btn-default"><span class="glyphicon glyphicon-remove"></span></button>
            </div>
          </div>
          
          <table v-show="!editing.pictureUrl" class="table table-striped table-hover col-md-12">
            <tbody>
            <tr @click="edit('pictureUrl')">
              <td class="col-lg-2 right">Picture Url</td>
              <td class="col-lg-8">{{ thingy.pictureUrl }}</td>
              <td class="col-lg-2"><a class="hover-btn"><span class="glyphicon glyphicon-pencil"></span></a></td>
            </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  
  export default {
    data() {
      return {
        editThingy: {},
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
        this.$http.put('/thingy/'+this.thingy.id,
          {
            name: this.editThingy.name,
            unit: this.editThingy.unit,
            pictureUrl: this.editThingy.pictureUrl
          })
          .then(response => {
            if(response.ok) {
              this.$emit('thingyUpdate');
              for(let property in this.editing) {
                console.log(property);
                this.$set(this.editing, property, false);
              }
            }
          });
      },
      edit(el) {
        this.$set(this.editing, el, true);
      },
      cancel(el) {
        Object.assign(this.editThingy, this.thingy);
        this.$set(this.editing, el, false);
      }
    },
  
    mounted() {
      Object.assign(this.editThingy, this.thingy);
    },
    
    beforeUpdate() {
      Object.assign(this.editThingy, this.thingy);
    }
  }
</script>

<style lang="sass" scoped>
  .thingy-edit-tile  .thumbnail {
    padding: 5px 10px 0;
    img { margin-bottom: 5px; }

    .hover-btn {
      position: absolute;
      right: 15px;
      display: none;
    }

    tr:hover .hover-btn {
      display: block;
    }
  }
</style>
