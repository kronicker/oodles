<template>
  <div class="oodler-edit-tile">
    <div class="well">
      <div class="row">
        <form @submit="updateOodler" class="form-horizontal col-md-12">
          <div v-show="editing.firstName" class="form-group form-group-sm">
            <label for="firstName" class="col-md-3 control-label">First Name</label>
            <div class="col-md-5">
              <input type="text" v-model="editedOodler.firstName" class="form-control input-sm" id="firstName">
            </div>
            <div class="btn-group col-md-4">
              <button type="submit" class="col-md-8 btn btn-sm btn-success">Save</button>
              <button type="reset" @click="cancel('firstName')" class="col-md-4 btn btn-sm btn-default"><span class="glyphicon glyphicon-remove"></span></button>
            </div>
          </div>
        </form>
        <div class="col-md-12">
          <table v-show="!editing.firstName" class="table table-striped table-hover col-md-12">
            <tbody>
            <tr @click="edit('firstName')">
              <td class="col-md-3">First Name</td>
              <td class="col-md-8">{{ oodler.firstName }}</td>
              <td class="col-md-1"><a class="hover-btn"><span class="glyphicon glyphicon-pencil"></span></a></td>
            </tr>
            </tbody>
          </table>
        </div>
  
        <form @submit="updateOodler" class="form-horizontal col-md-12">
          <div v-show="editing.lastName" class="form-group form-group-sm">
            <label for="lastName" class="col-md-3 control-label">Last Name</label>
            <div class="col-md-5">
              <input type="text" v-model="editedOodler.lastName" class="form-control input-sm" id="lastName">
            </div>
            <div class="btn-group col-md-4">
              <button type="submit" class="col-md-8 btn btn-sm btn-success">Save</button>
              <button type="reset" @click="cancel('lastName')" class="col-md-4 btn btn-sm btn-default"><span class="glyphicon glyphicon-remove"></span></button>
            </div>
          </div>
        </form>
        <div class="col-md-12">
          <table v-show="!editing.lastName" class="table table-striped table-hover col-md-12">
            <tbody>
            <tr @click="edit('lastName')">
              <td class="col-md-3">Last Name</td>
              <td class="col-md-8">{{ oodler.lastName }}</td>
              <td class="col-md-1"><a class="hover-btn"><span class="glyphicon glyphicon-pencil"></span></a></td>
            </tr>
            </tbody>
          </table>
        </div>
        
        <form @submit="updateOodler" class="form-horizontal col-md-12">
          <div v-show="editing.email" class="form-group form-group-sm">
            <label for="email" class="col-md-3 control-label">Email</label>
            <div class="col-md-5">
              <input type="text" v-model="editedOodler.email" class="form-control input-sm" id="email">
            </div>
            <div class="btn-group col-md-4">
              <button type="submit" class="col-md-8 btn btn-sm btn-success">Save</button>
              <button type="reset" @click="cancel('email')" class="col-md-4 btn btn-sm btn-default"><span class="glyphicon glyphicon-remove"></span></button>
            </div>
          </div>
        </form>
        <div class="col-md-12">
          <table v-show="!editing.email" class="table table-striped table-hover col-md-12">
            <tbody>
            <tr @click="edit('email')">
              <td class="col-md-3">Email</td>
              <td class="col-md-8">{{ oodler.email }}</td>
              <td class="col-md-1"><a class="hover-btn"><span class="glyphicon glyphicon-pencil"></span></a></td>
            </tr>
            </tbody>
          </table>
        </div>
  
        <form @submit="updateOodler" class="form-horizontal col-md-12">
          <div v-show="editing.office" class="form-group form-group-sm">
            <label for="office" class="col-md-3 control-label">Office</label>
            <div class="col-md-5">
              <input type="text" v-model="editedOodler.office" class="form-control input-sm" id="office">
            </div>
            <div class="btn-group col-md-4">
              <button type="submit" class="col-md-8 btn btn-sm btn-success">Save</button>
              <button type="reset" @click="cancel('office')" class="col-md-4 btn btn-sm btn-default"><span class="glyphicon glyphicon-remove"></span></button>
            </div>
          </div>
        </form>
        <div class="col-md-12">
          <table v-show="!editing.office" class="table table-striped table-hover col-md-12">
            <tbody>
            <tr @click="edit('office')">
              <td class="col-md-3">Office</td>
              <td class="col-md-8">{{ oodler.office }}</td>
              <td class="col-md-1"><a class="hover-btn"><span class="glyphicon glyphicon-pencil"></span></a></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="form-group col-md-12">
          <div class="btn-group btn-group-justified">
            <a type="button" data-toggle="modal" :data-target="'#' + oodler.id + 'delete'" class="btn btn-xs btn-danger">Delete</a>
          </div>
        </div>
      </div>
    </div>
  
    <div class="modal fade" data-backdrop="static" data-keyboard="false" :id="oodler.id + 'delete'">
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
                <td class="col-md-8">{{ oodler.firstName }} {{ oodler.lastName }}</td>
              </tr>
              <tr>
                <td class="col-md-4">Email</td>
                <td class="col-md-8">{{ oodler.email }}</td>
              </tr>
              <tr>
                <td class="col-md-4">Office</td>
                <td class="col-md-8">{{ oodler.office }}</td>
              </tr>
              </tbody>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal" @click="removeOodler">Delete</button>
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
        editedOodler: {},
        editing: {
          firstName: false,
          lastName: false,
          email: false,
          office: false
        }
      }
    },
    
    props: ['oodler'],
    
    methods: {
      updateOodler() {
        this.$http.put('/oodler/' + this.oodler.id,
          {
            firstName: this.editedOodler.firstName,
            lastName: this.editedOodler.lastName,
            email: this.editedOodler.email,
            office: this.editedOodler.office,
            scope: this.editedOodler.scope
          })
          .then(
            response => {
              this.$emit('oodlerUpdate');
              for (let property in this.editing) {
                this.$set(this.editing, property, false);
              }
            },
            response => {
              for(let property in this.editing) {
                this.$set(this.editing, property, false);
              }
            });
      },
      removeOodler() {
        this.$http.delete('/oodler/' + this.oodler.id)
          .then(response => {
            this.$emit('oodlerUpdate');
          });
      },
      edit(el) {
        this.$set(this.editing, el, true);
      },
      cancel(el) {
        this.$set(this.editedOodler, el, this.oodler[el]);
        this.$set(this.editing, el, false);
      }
    },
  
    mounted() {
      Object.assign(this.editedOodler, this.oodler);
    },
  
    beforeUpdate() {
      Object.assign(this.editedOodler, this.oodler);
    }
  }
</script>

<style lang="scss" scoped>
  .oodler-edit-tile .well {
    padding: 5px 10px 0;
    max-width: 100%;
  
    .control-label { padding-left: 21px; }
    
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
