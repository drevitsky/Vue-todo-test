<template>
  <div id="app">
    <div class="container">
      <router-view/>
    </div>  
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #232642;

    &.router-link-exact-active {
      color: #F9703E;
    }
  }
}
</style>
<style lang="scss" src="./assets/scss/common.scss" />
