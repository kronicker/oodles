<template>
  <div class="oodler-edit-tile">
    <div class="thumbnail">
      <div class="row">
        <form class="form-horizontal col-md-12">
          <div class="form-group form-group-sm">
            <label for="firstName" class="col-lg-2 control-label">First name</label>
            <div class="col-lg-10">
              <input type="text" v-model="oodler.firstName" class="form-control input-sm" id="firstName" :disabled="!editing">
            </div>
          </div>
          <div class="form-group form-group-sm">
            <label for="lastName" class="col-lg-2 control-label">Last name</label>
            <div class="col-lg-10">
              <input type="text" v-model="oodler.lastName" class="form-control input-sm" id="lastName" :disabled="!editing">
            </div>
          </div>
          <div class="form-group form-group-sm">
            <label for="unit" class="col-lg-2 control-label">Email</label>
            <div class="col-lg-10">
              <input type="text" v-model="oodler.email" class="form-control input-sm" id="unit" :disabled="!editing">
            </div>
          </div>
          <div class="form-group form-group-sm">
            <label for="office" class="col-lg-2 control-label">Office</label>
            <div class="col-lg-10">
              <input type="text" v-model="oodler.office" class="form-control input-sm" id="office" :disabled="!editing">
            </div>
          </div>
          <div class="form-group form-group-sm">
            <div class="col-sm-5 col-sm-offset-2">
              <button @click="cancel" v-show="editing" class="btn btn-sm btn-block btn-danger">Cancel</button>
            </div>
            <div class="col-sm-5">
              <button @click="updateOodler" v-show="editing" class="btn btn-sm btn-block btn-success">Save</button>
            </div>
            <div class="col-sm-10 col-sm-offset-2">
              <button @click="edit" v-show="!editing" class="btn btn-sm btn-block btn-primary">Edit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  
  export default {
    data() {
      return {
        originalOodler: {},
        editing: false
      }
    },
    
    props: ['oodler'],
    
    methods: {
      updateOodler() {
        console.log(this.oodler.scope);
        this.$http.put('/oodler/'+this.oodler.id,
          {
            firstName: this.oodler.firstName,
            lastName: this.oodler.lastName,
            email: this.oodler.email,
            office: this.oodler.office,
            scope: this.oodler.scope
          })
          .then( response => {
            if(response.ok) {
              this.$emit('oodlerUpdate');
              Object.assign(this.originalOodler, this.oodler);
              this.editing = false;
            }
          });
      },
      edit() {
        this.editing = true;
      },
      cancel() {
        Object.assign(this.oodler, this.originalOodler);
        this.editing = false;
      }
    },
  
    mounted() {
      Object.assign(this.originalOodler, this.oodler);
    }
  }
</script>

<style lang="sass" scoped>
  .oodler-edit-tile .thumbnail { padding: 10px 15px 0; }
</style>
