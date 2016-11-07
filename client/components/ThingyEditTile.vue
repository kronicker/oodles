<template>
  <div class="thingy-edit-tile">
    <div class="thumbnail">
      <img :src="pictureUrl">
      <div class="row">
        <form class="form-horizontal col-md-12">
          <div class="form-group form-group-sm">
            <label for="name" class="col-lg-2 control-label">Name</label>
            <div class="col-lg-10">
              <input type="text" v-model="thingy.name" class="form-control input-sm" id="name" :disabled="!editing">
            </div>
          </div>
          <div class="form-group form-group-sm">
            <label for="unit" class="col-lg-2 control-label">Unit</label>
            <div class="col-lg-10">
              <input type="text" v-model="thingy.unit" class="form-control input-sm" id="unit" :disabled="!editing">
            </div>
          </div>
          <div class="form-group form-group-sm">
            <label for="pictureUrl" class="col-lg-2 control-label">Picture URL</label>
            <div class="col-lg-10">
              <input type="text" v-model="thingy.pictureUrl" class="form-control input-sm" id="pictureUrl" :disabled="!editing">
            </div>
          </div>
          <div class="form-group form-group-sm">
            <div class="col-sm-5 col-sm-offset-2">
              <button @click="cancel" v-show="editing" class="btn btn-sm btn-block btn-danger">Cancel</button>
            </div>
            <div class="col-sm-5">
              <button @click="updateThingy" v-show="editing" class="btn btn-sm btn-block btn-success">Save</button>
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
        originalThingy: {},
        pictureUrl: '',
        editing: false
      }
    },
  
    props: ['thingy'],
    
    methods: {
      updateThingy() {
        this.$http.put('/thingy/'+this.thingy.id,
          {
            name: this.thingy.name,
            unit: this.thingy.unit,
            pictureUrl: this.thingy.pictureUrl
          })
          .then(response => {
            if(response.ok) {
              this.$emit('thingyUpdate');
              Object.assign(this.originalThingy, this.thingy);
              this.pictureUrl = this.originalThingy.pictureUrl;
              this.editing = false;
            }
          });
      },
      edit() {
        this.editing = true;
      },
      cancel() {
        Object.assign(this.thingy, this.originalThingy);
        this.editing = false;
      }
    },
  
    mounted() {
      Object.assign(this.originalThingy, this.thingy);
      this.pictureUrl = this.originalThingy.pictureUrl;
    }
  }
</script>

<style lang="sass" scoped>
  .thingy-edit-tile  .thumbnail {
    padding: 5px 10px 0;
    img { margin-bottom: 5px; }
  }
</style>
