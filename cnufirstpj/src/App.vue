<template>
  <div id="base">
    <nav>
      <router-link :class="{ noLinkDeco: true }" to="/Login">Login</router-link>
      <div>
        <router-link to="/Option">
          <font-awesome-icon icon="fa-solid fa-gear" size="lg" /></router-link
        ><font-awesome-icon icon="fa-solid fa-toggle-on" size="lg" />
      </div>
    </nav>
    <router-link :class="{ noLinkDeco: true, LargeBold: true }" to="/"
      >Coding Typing Practice</router-link
    >
    <router-view />
    <div id="contactAddress">@ Contact Us : example1234@gamil.com</div>
  </div>
</template>
<script>
export default {
  name: 'App',
  methods: {}
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

* {
  background: skyblue;
}

button {
  cursor: pointer;
}

#contactAddress {
  color: gray;
  font-size: small;
}

.noLinkDeco {
  text-decoration: none;
  color: inherit;
}

.LargeBold {
  font-size: xxx-large;
  font-weight: bold;
}
</style>
