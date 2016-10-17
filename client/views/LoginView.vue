<template>
  <div id="loginView">
    <div class="row">
      <div class="col-md-3 col-md-offset-4">
        <form class="form-login form-horizontal">
          <h1 class="page-header">Log in</h1>
          <fieldset class="well">
            <div class="form-group">
              <label for="inputEmail" class="col-lg-2 control-label">Email</label>
              <div class="col-md-10">
                <input v-model="email" class="form-control" id="inputEmail" placeholder="Email" type="text">
              </div>
            </div>
            <div class="form-group">
              <label for="inputPassword" class="col-md-2 control-label">Password</label>
              <div class="col-md-10">
                <input v-model="password" class="form-control" id="inputPassword" placeholder="Password" type="password">
              </div>
            </div>
            <div v-if="warning" class="alert alert-dismissible alert-danger">
              <button type="button" class="close" data-dismiss="alert">&times;</button>
              <strong>Login failed!</strong>Incorrect email or password!
            </div>
            <div class="form-group">
              <div class="col-md-12">
                <button @click="logIn" type="submit" class="btn btn-block btn-primary">Log In</button>
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
      logIn() {
        this.$http.post('/session/create', {
          email: this.email,
          password: this.password
        })
        .then(response => {
          if(response.ok) {
            this.$store.commit('oodlerSave', response.body);
          }
          else {
            this.email='';
            this.password='';
            this.warning=true;
          }
        });
      }
    }
  }
</script>

<style lang="sass" scoped>
  #loginView {
    .form-login {
      margin-top: 200px;
    }

  }
</style>
