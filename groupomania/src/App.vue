<template>
  <div id="app">
    <Navigation/>
  </div> 
</template>

<script>
import Navigation from '@/components/Navigation'

export default {
  components: {
    Navigation
  }
  
}
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background-color: $color6;
}
</style>
