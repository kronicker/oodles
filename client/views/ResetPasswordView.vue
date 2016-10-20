<template>
  <div id="resetPasswordView">
    <div class="row">
      <div class="col-md-3 col-md-offset-4">
        <form @submit.prevent="resetPassword" class="form-reset-password form-horizontal">
          <h1 class="page-header">Reset password</h1>
          <fieldset class="well">
            <div class="form-group">
              <label for="email" class="col-lg-2 control-label">Email</label>
              <div class="col-md-10">
                <input v-model="email" class="form-control" id="email" placeholder="Email" type="text">
              </div>
            </div>
            <div v-if="infoMessage" class="alert alert-dismissible alert-info">
              <button @click="closeInfoMessage" type="button" class="close" data-dismiss="alert">&times;</button>
              <strong>Email sent!</strong> Please check your email for reset link!
            </div>
            <div v-if="warningMessage" class="alert alert-dismissible alert-danger">
              <button @click="closeWarningMessage" type="button" class="close" data-dismiss="alert">&times;</button>
              <strong>Something went wrong!</strong> Please try again!
            </div>
            <div class="form-group">
              <div class="col-lg-6 col-lg-offset-2">
                <button type="submit" class="btn btn-block btn-success">Send reset email</button>
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
  export default {
    data() {
      return {
        email: '',
        infoMessage: false,
        warningMessage: false
      }
    },

    methods: {
      resetPassword() {
        this.$http.post('/password/reset', {
            email: this.email
          })
          .then(
            response => {
              this.email = '';
              this.infoMessage = true;
            },
            response => {
              this.email = '';
              this.warningMessage = true;
            });
      },
      goBack() {
        this.$router.replace('/login');
      },
      closeInfoMessage() {
        this.infoMessage = false;
      },
      closeWarningMessage() {
        this.warningMessage = false;
      }
    }
  }
</script>

<style lang="sass" scoped>
  #resetPasswordView .form-reset-password { margin-top: 200px; }
</style>
