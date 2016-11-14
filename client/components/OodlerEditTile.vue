<template>
  <div class="oodler-edit-tile">
    <div class="well">
      <div class="row">
        <form @submit="updateOodler" class="form-horizontal col-md-12">
          <div v-show="editing.firstName" class="form-group form-group-sm">
            <label for="firstName" class="col-md-2 control-label">First Name</label>
            <div class="col-md-6">
              <input type="text" v-model="editedOodler.firstName" class="form-control input-sm" id="firstName">
            </div>
            <div class="btn-group col-md-4">
              <button type="submit" class="col-md-8 btn btn-sm btn-success">Save</button>
              <button type="reset" @click="cancel('firstName')" class="col-md-4 btn btn-sm btn-default"><span class="glyphicon glyphicon-remove"></span></button>
            </div>
          </div>
          <table v-show="!editing.firstName" class="table table-striped table-hover col-md-12">
            <tbody>
            <tr @click="edit('firstName')">
              <td class="col-md-2">First Name</td>
              <td class="col-md-8">{{ oodler.firstName }}</td>
              <td class="col-md-2"><a class="hover-btn"><span class="glyphicon glyphicon-pencil"></span></a></td>
            </tr>
            </tbody>
          </table>
        </form>
  
        <form @submit="updateOodler" class="form-horizontal col-md-12">
          <div v-show="editing.lastName" class="form-group form-group-sm">
            <label for="lastName" class="col-md-2 control-label">Last Name</label>
            <div class="col-md-6">
              <input type="text" v-model="editedOodler.lastName" class="form-control input-sm" id="lastName">
            </div>
            <div class="btn-group col-md-4">
              <button type="submit" class="col-md-8 btn btn-sm btn-success">Save</button>
              <button type="reset" @click="cancel('lastName')" class="col-md-4 btn btn-sm btn-default"><span class="glyphicon glyphicon-remove"></span></button>
            </div>
          </div>
          <table v-show="!editing.lastName" class="table table-striped table-hover col-md-12">
            <tbody>
            <tr @click="edit('lastName')">
              <td class="col-md-2">Last Name</td>
              <td class="col-md-8">{{ oodler.lastName }}</td>
              <td class="col-md-2"><a class="hover-btn"><span class="glyphicon glyphicon-pencil"></span></a></td>
            </tr>
            </tbody>
          </table>
        </form>
  
        <form @submit="updateOodler" class="form-horizontal col-md-12">
          <div v-show="editing.email" class="form-group form-group-sm">
            <label for="email" class="col-md-2 control-label">Email</label>
            <div class="col-md-6">
              <input type="text" v-model="editedOodler.email" class="form-control input-sm" id="email">
            </div>
            <div class="btn-group col-md-4">
              <button type="submit" class="col-md-8 btn btn-sm btn-success">Save</button>
              <button type="reset" @click="cancel('email')" class="col-md-4 btn btn-sm btn-default"><span class="glyphicon glyphicon-remove"></span></button>
            </div>
          </div>
          <table v-show="!editing.email" class="table table-striped table-hover col-md-12">
            <tbody>
            <tr @click="edit('email')">
              <td class="col-md-2">Email</td>
              <td class="col-md-8">{{ oodler.email }}</td>
              <td class="col-md-2"><a class="hover-btn"><span class="glyphicon glyphicon-pencil"></span></a></td>
            </tr>
            </tbody>
          </table>
        </form>
  
        <form @submit="updateOodler" class="form-horizontal col-md-12">
          <div v-show="editing.office" class="form-group form-group-sm">
            <label for="office" class="col-md-2 control-label">Office</label>
            <div class="col-md-6">
              <input type="text" v-model="editedOodler.office" class="form-control input-sm" id="office">
            </div>
            <div class="btn-group col-md-4">
              <button type="submit" class="col-md-8 btn btn-sm btn-success">Save</button>
              <button type="reset" @click="cancel('office')" class="col-md-4 btn btn-sm btn-default"><span class="glyphicon glyphicon-remove"></span></button>
            </div>
          </div>
          <table v-show="!editing.office" class="table table-striped table-hover col-md-12">
            <tbody>
            <tr @click="edit('office')">
              <td class="col-md-2">office</td>
              <td class="col-md-8">{{ oodler.office }}</td>
              <td class="col-md-2"><a class="hover-btn"><span class="glyphicon glyphicon-pencil"></span></a></td>
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
          .then( response => {
            if(response.ok) {
              this.$emit('oodlerUpdate');
              for(let property in this.editing) {
                this.$set(this.editing, property, false);
              }
            }
          });
      },
      edit(el) {
        this.$set(this.editing, el, true);
      },
      cancel(el) {
        Object.assign(this.editedOodler, this.oodler);
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

<style lang="sass" scoped>
  .oodler-edit-tile .well {
    padding: 5px 10px 0;

    .control-label { padding-left: 21px }
  
    img { margin-bottom: 5px; }
    
    .form-horizontal .control-label { text-align: left; }
    
    .table {
      margin-bottom: 15px;
      tr {
        cursor: text;
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
