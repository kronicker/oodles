<template>
  <div id="settingsView">
    <div class="page-header">
      <h1 class="text-info">Settings</h1>
    </div>
    <div class="row">
      <div class="col-md-4 col-md-offset-3 jumbotron">
        <h2>{{ oodler.firstName }} {{ oodler.lastName }}</h2>
        <p><strong>Email: </strong> {{ oodler.email }} </p>
        <p v-if="oodler.scope != 'admin'"><strong>Office: </strong> {{ oodler.office }} </p>
        <div>
          <a @click="resetPassword" class="btn btn-danger">Reset password</a>
        </div>
      </div>
      <div id="message" v-show="message" class="col-md-4 col-md-offset-3 alert alert-dismissible">
        <button @click="closeMessage" type="button" class="close">&times;</button>
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message : ''
      }
    },
    
    computed: {
      oodler() {
        return this.$store.getters.oodler;
      }
    },
    
    methods: {
      resetPassword() {
        this.$http.post('/password/reset', {
            email: this.oodler.email
          })
          .then(
            response => {
              this.message = 'Please check your email for password reset link!';
              document.getElementById('message').classList.add('alert-info');
              document.getElementById('message').classList.remove('alert-danger');
            },
            response => {
              this.message = 'Oops! Something went wrong! Please try again!';
              document.getElementById('message').classList.add('alert-danger');
              document.getElementById('message').classList.remove('alert-info');
            });
      },
      closeMessage() {
        this.message = '';
      }
    }
  }
</script>

<style lang="sass" scoped>
  #settingsView {
    .page-header { margin: 0px 0 10px; }

    .jumbotron {
      margin-top: 200px;
    }

  }
</style>
