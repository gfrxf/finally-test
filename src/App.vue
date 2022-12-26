<template>
  <div id="app">
    <nav>
      <router-link to="/"></router-link> 
      <!-- <router-link to="/about">About</router-link> -->
    </nav>
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
    margin: 0;
    padding: 0;
}

a {
    color: #000;
    text-decoration: none;
}
i {
    display: block;
    font-style: normal;
}
input {
    vertical-align: middle;
    border-radius: 0;
}
ul,
li {
    list-style-type: none;
}
</style>
