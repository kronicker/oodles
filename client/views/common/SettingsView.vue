<template>
  <div id="settingsView">
    <flash-message @dismissed="dismissed" :message="flashMessage" :type="flashType" ></flash-message>
  
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
    </div>
  </div>
</template>

<script>
  import FlashMessage from '../../components/common/FlashMessage.vue'
  
  export default {
    data() {
      return {
        flashMessage: '',
        flashType: ''
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
              this.flashMessage = 'Please check your email for password reset link!';
              this.flashType = 'info';
            },
            response => {
              this.flashMessage = 'Oops! Something went wrong! Please, try again!';
              this.flashType = 'danger';
            });
      },
      dismissed() {
        this.flashMessage = '';
      }
    },
  
    components: { FlashMessage }
  }
</script>

<style lang="sass" scoped>
  #settingsView {
    .page-header { margin: 0px 0 10px; }

    .jumbotron { margin-top: 200px; }
  }
</style>
