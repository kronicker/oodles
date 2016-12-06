<template>
  <div class="flash-message" v-if="message" :class="'alert alert-dismissible alert-' + type">
    <button @click="dismiss" type="button" data-dismiss="alert" class="close">&times;</button>
    {{ message }}
  </div>
</template>

<script>
  export default {
    props: ['message', 'type'],
    
    methods: {
      dismiss() {
        this.$emit('dismissed');
      }
    }
  }
</script>
