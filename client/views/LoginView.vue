<template>
  <div id="loginView">
    <div class="row">
      <div class="col-md-3 col-md-offset-4">
        <form @submit.prevent="login" class="form-login form-horizontal">
          <h1 class="page-header">Log in</h1>
          <fieldset class="well">
            <div class="form-group">
              <label for="email" class="col-lg-2 control-label">Email</label>
              <div class="col-md-10">
                <input v-model="email" class="form-control" id="email" placeholder="Email" type="text">
              </div>
            </div>
            <div class="form-group">
              <label for="password" class="col-md-2 control-label">Password</label>
              <div class="col-md-10">
                <input v-model="password" class="form-control" id="password" placeholder="Password" type="password">
              </div>
            </div>
            <div v-if="warning" class="alert alert-dismissible alert-danger">
              <button @click="closeWarning" type="button" class="close" data-dismiss="alert">&times;</button>
              <strong>Login failed!</strong> Incorrect email or password!
            </div>
            <div class="form-group">
              <div class="col-md-12">
                <router-link to="/password/reset"><p>Forgot your password?</p></router-link>
                <button type="submit" class="btn btn-block btn-primary">Log In</button>
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
        email:'',
        password: '',
        warning: false
      }
    },

    methods: {
      login() {
        this.$http.post('/session/create', {
          email: this.email,
          password: this.password
        })
        .then(
          response => {
            this.$store.dispatch('initStore', response.body);
            this.$router.replace({ path: '/' });
          },
          response => {
            this.email = '';
            this.password = '';
            this.warning = true;
          });
      },
      closeWarning() {
        this.warning = false;
      }
    }
  }
</script>

<style lang="sass" scoped>
  #loginView .form-login { margin-top: 200px; }
</style>
