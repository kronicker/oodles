<template>
  <div id="resetLoginView">
    <div class="row">
      <div class="col-md-3 col-md-offset-4">
        <form @submit.prevent="" class="form-new form-horizontal">
          <h1 class="page-header">Reset password</h1>
          <fieldset class="well">
            <div class="form-group">
              <label for="email" class="col-lg-2 control-label">Email</label>
              <div class="col-md-10">
                <input v-model="email" class="form-control" id="email" placeholder="Email" type="text">
              </div>
            </div>
            <div class="form-group">
              <div class="col-lg-6 col-lg-offset-2">
                <button @click="resetPassword" type="submit" class="btn btn-block btn-success">Send reset email</button>
              </div>
              <div class="col-lg-4">
                <button @click="goBack" class="btn btn-block btn-danger">Cancel</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style lang="sass" scoped>
</style>
