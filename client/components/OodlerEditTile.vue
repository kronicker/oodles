<template>
  <div class="oodler-edit-tile">
    <div class="thumbnail">
      <div class="row">
        <form @submit="updateOodler('firstName')" class="form-horizontal col-md-12">
          <div v-show="editing.firstName" class="form-group form-group-sm">
            <label for="firstName" class="col-lg-2 control-label">First Name</label>
            <div class="col-lg-6">
              <input type="text" v-model="editOodler.firstName" class="form-control input-sm" id="firstName">
            </div>
            <div class="btn-group col-lg-4">
              <button type="submit" class="col-lg-8 btn btn-sm btn-success">Save</button>
              <button type="reset" @click="cancel('firstName')" class="col-lg-4 btn btn-sm btn-default"><span class="glyphicon glyphicon-remove"></span></button>
            </div>
          </div>
          <table v-show="!editing.firstName" class="table table-striped table-hover col-md-12">
            <tbody>
            <tr @click="edit('firstName')">
              <td class="col-lg-2 right">First Name</td>
              <td class="col-lg-8">{{ oodler.firstName }}</td>
              <td class="col-lg-2"><a class="hover-btn"><span class="glyphicon glyphicon-pencil"></span></a></td>
            </tr>
            </tbody>
          </table>
        </form>
  
        <form @submit="updateOodler('lastName')" class="form-horizontal col-md-12">
          <div v-show="editing.lastName" class="form-group form-group-sm">
            <label for="lastName" class="col-lg-2 control-label">Last Name</label>
            <div class="col-lg-6">
              <input type="text" v-model="editOodler.lastName" class="form-control input-sm" id="lastName">
            </div>
            <div class="btn-group col-lg-4">
              <button type="submit" class="col-lg-8 btn btn-sm btn-success">Save</button>
              <button type="reset" @click="cancel('lastName')" class="col-lg-4 btn btn-sm btn-default"><span class="glyphicon glyphicon-remove"></span></button>
            </div>
          </div>
          <table v-show="!editing.lastName" class="table table-striped table-hover col-md-12">
            <tbody>
            <tr @click="edit('lastName')">
              <td class="col-lg-2 right">Last Name</td>
              <td class="col-lg-8">{{ oodler.lastName }}</td>
              <td class="col-lg-2"><a class="hover-btn"><span class="glyphicon glyphicon-pencil"></span></a></td>
            </tr>
            </tbody>
          </table>
        </form>
  
        <form @submit="updateOodler('email')" class="form-horizontal col-md-12">
          <div v-show="editing.email" class="form-group form-group-sm">
            <label for="email" class="col-lg-2 control-label">Email</label>
            <div class="col-lg-6">
              <input type="text" v-model="editOodler.email" class="form-control input-sm" id="email">
            </div>
            <div class="btn-group col-lg-4">
              <button type="submit" class="col-lg-8 btn btn-sm btn-success">Save</button>
              <button type="reset" @click="cancel('email')" class="col-lg-4 btn btn-sm btn-default"><span class="glyphicon glyphicon-remove"></span></button>
            </div>
          </div>
          <table v-show="!editing.email" class="table table-striped table-hover col-md-12">
            <tbody>
            <tr @click="edit('email')">
              <td class="col-lg-2 right">Email</td>
              <td class="col-lg-8">{{ oodler.email }}</td>
              <td class="col-lg-2"><a class="hover-btn"><span class="glyphicon glyphicon-pencil"></span></a></td>
            </tr>
            </tbody>
          </table>
        </form>
  
        <form @submit="updateOodler('office')" class="form-horizontal col-md-12">
          <div v-show="editing.office" class="form-group form-group-sm">
            <label for="office" class="col-lg-2 control-label">Office</label>
            <div class="col-lg-6">
              <input type="text" v-model="editOodler.office" class="form-control input-sm" id="office">
            </div>
            <div class="btn-group col-lg-4">
              <button type="submit" class="col-lg-8 btn btn-sm btn-success">Save</button>
              <button type="reset" @click="cancel('office')" class="col-lg-4 btn btn-sm btn-default"><span class="glyphicon glyphicon-remove"></span></button>
            </div>
          </div>
          <table v-show="!editing.office" class="table table-striped table-hover col-md-12">
            <tbody>
            <tr @click="edit('office')">
              <td class="col-lg-2 right">office</td>
              <td class="col-lg-8">{{ oodler.office }}</td>
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
        editOodler: {},
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
        console.log(this.oodler.scope);
        this.$http.put('/oodler/'+this.oodler.id,
          {
            firstName: this.editOodler.firstName,
            lastName: this.editOodler.lastName,
            email: this.editOodler.email,
            office: this.editOodler.office,
            scope: this.editOodler.scope
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
        Object.assign(this.editOodler, this.oodler);
        this.$set(this.editing, el, false);
      }
    },
  
    mounted() {
      Object.assign(this.editOodler, this.oodler);
    },
  
    beforeUpdate() {
      Object.assign(this.editOodler, this.oodler);
    }
  }
</script>

<style lang="sass" scoped>
  .oodler-edit-tile .thumbnail {
    padding: 10px 15px 0;

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
