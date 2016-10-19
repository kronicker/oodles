<template>
  <div id="resetLoginView">
    <div class="row">
      <div class="col-md-3 col-md-offset-4">
        <form @submit.prevent="" class="form-new-password form-horizontal">
          <h1 class="page-header">Set new password</h1>
          <fieldset class="well">
            <input type="hidden" id="token">
            <div class="form-group">
              <label for="password" class="col-md-2 control-label">Password</label>
              <div class="col-md-10">
                <input v-model="password" class="form-control" id="password" placeholder="Password" type="password">
              </div>
            </div>
            <div class="form-group">
              <label for="repeatPassword" class="col-md-2 control-label">Repeat password</label>
              <div class="col-md-10">
                <input v-model="repeatPassword" class="form-control" id="repeatPassword" placeholder="Repeat password" type="password">
              </div>
            </div>
            <div class="form-group">
              <div class="col-lg-6 col-lg-offset-2">
                <button @click="resetPassword" type="submit" class="btn btn-block btn-success">Send</button>
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
