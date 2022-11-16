<template>
  <div id="base">
    <nav>
      <router-link :class="{ noLinkDeco: true }" to="/Login">Login</router-link>
      <div>
        <router-link to="/Option">
          <font-awesome-icon
            icon="fa-solid fa-gear"
            style="margin: 10px"
            size="lg" /></router-link
        ><font-awesome-icon
          :class="{ hoveringHand: true }"
          :icon="['fas', darkMode ? 'toggle-off' : 'toggle-on']"
          @click="changeMode"
          style="margin: 10px"
          size="lg"
        />
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
  data() {
    return {
      darkMode: false,
      bodyStyles: document.body.style
    }
  },
  methods: {
    changeMode(Mode) {
      if (this.darkMode === false) {
        this.darkMode = true
        this.bodyStyles.setProperty('--text-color', 'white')
        this.bodyStyles.setProperty('--background-color', 'black')
      } else {
        this.darkMode = false
        this.bodyStyles.setProperty('--text-color', 'black')
        this.bodyStyles.setProperty('--background-color', 'skyblue')
      }
      console.log(this.darkMode)
    }
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

:root {
  --text-color: black;
  --background-color: skyblue;
}

body {
  color: var(--text-color);
  background: var(--background-color);
}

button {
  cursor: pointer;
}

.hoveringHand {
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

.darkMode {
  background-color: black;
}
</style>
