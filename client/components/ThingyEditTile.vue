<template>
  <div class="thingy-edit-tile">
    <div class="thumbnail">
      <img :src="thingy.pictureUrl">
      <div class="row">
        <form class="form-horizontal col-md-12">
          <div class="form-group">
            <label for="name" class="col-lg-2 control-label">Name</label>
            <div class="col-lg-10">
              <input type="text" v-model="thingy.name" class="form-control" id="name">
            </div>
          </div>
          <div class="form-group">
            <label for="unit" class="col-lg-2 control-label">Unit</label>
            <div class="col-lg-10">
              <input type="text" v-model="thingy.unit" class="form-control" id="unit">
            </div>
          </div>
          <div class="form-group">
            <label for="pictureUrl" class="col-lg-2 control-label">Picture URL</label>
            <div class="col-lg-10">
              <input type="text" v-model="thingy.pictureUrl" class="form-control" id="pictureUrl">
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-5 col-lg-offset-7">
              <button @click="updateThingy" class="btn btn-block btn-success">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  
  export default{
    props: ['thingy'],
    
    methods: {
      updateThingy() {
        this.$http.put('/thingy/'+this.thingy.id,
          {
            name: this.thingy.name,
            unit: this.thingy.unit,
            pictureUrl: this.thingy.pictureUrl
          })
          .then(
            response => {
              this.$emit('thingyUpdate');
            },
            response => {
              
            });
      }
    }
  }
</script>

<style lang="sass" scoped>
  .thingy-edit-tile .thumbnail img{
    margin-bottom: 5px;
  }

</style>
