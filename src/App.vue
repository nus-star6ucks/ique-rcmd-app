<template>
  <div>
    <!-- <Header></Header> -->
    <Store></Store>
  </div>
</template>

<script>
import Store from './pages/Store/Store.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Store,
    // Header
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
