<template>
  <div id="newPasswordView">
    <div class="row">
      <div class="col-md-3 col-md-offset-4">
        <form @submit.prevent="updatePassword" class="form-new-password form-horizontal">
          <h1 class="page-header">Set new password</h1>
          <fieldset class="well">
            <div class="form-group">
              <label for="password" class="col-md-2 control-label">Password</label>
              <div class="col-md-10">
                <input v-model="password" class="form-control" id="password" placeholder="Password" type="password">
              </div>
            </div>
            <div class="form-group">
              <label for="passwordRepeat" class="col-md-2 control-label">Repeat password</label>
              <div class="col-md-10">
                <input v-model="passwordRepeat" class="form-control" id="passwordRepeat" placeholder="Repeat password" type="password">
              </div>
            </div>
            <div id="message" v-show="message" class="alert">
              <button @click="closeMessage" type="button" class="close">&times;</button>
              {{ message }}
            </div>
            <div class="form-group">
              <div class="col-lg-6 col-lg-offset-2">
                <button type="submit" class="btn btn-block btn-success">Send</button>
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
        password: '',
        passwordRepeat: '',
        message: ''
      }
    },

    computed: {
      token() {
        return this.$route.query.token;
      }
    },

    methods: {
      updatePassword() {
        this.$http.put('/password/update', {
            password: this.password,
            passwordRepeat: this.passwordRepeat,
            value: this.token
          })
          .then(
            response => {
              if(response.ok) {
                let oodler = response.body;
                this.$store.dispatch('initStore', oodler);
  
                if (oodler.scope === 'admin') {
                  this.$router.replace({ path: '/admin' });
                }
                else {
                  this.$router.replace({ path: '/' });
                }
              }
            },
            response => {
              this.password = '';
              this.passwordRepeat = '';
              this.message = response.body.msg;
              document.getElementById('message').classList.add('alert-danger');
              this.message = '';
            });
      },
      closeMessage() {
        this.message = '';
      }
    }
  }
</script>

<style lang="scss" scoped>
  #newPasswordView .form-new-password { margin-top: 200px; }
</style>
