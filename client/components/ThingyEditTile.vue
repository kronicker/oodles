<template>
  <div class="thingy-edit-tile">
    <div class="thumbnail">
      <img :src="thingy.pictureUrl">
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
            <div class="col-lg-5 col-lg-offset-7">
              <button @click="updateThingy" v-show="editing" class="btn btn-sm btn-block btn-success">Save</button>
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
              this.editing = false;
            }
          });
      },
      edit() {
        this.editing = true;
      }
    }
  }
</script>

<style lang="sass" scoped>
  .thingy-edit-tile  .thumbnail {
    padding: 5px 10px 0;
    img { margin-bottom: 5px; }
  }
</style>
