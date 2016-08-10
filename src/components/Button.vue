<template>
    <div class="hello">
        <h1>{{ txt }}1</h1>
       
    </div>
</template>
<script>
  module.exports = {
       
      data: () => {
          return {
               
          }
      },props:{'txt':{default:'this is button'}}
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    color: blue;
}
</style>
