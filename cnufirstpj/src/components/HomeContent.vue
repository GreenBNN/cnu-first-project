<template>
  <div class="hello">
    <h2>
      This is a project description <br />
      make for ~~~ <br />
      make by ~~~~<br />how to use<br />
    </h2>
    <div id="Clanguages">
      <router-link to="/language/c2" :class="{ languageBox: true, noLinkDeco: true }">
        C</router-link
      >
      <div :class="{ languageBox: true }">C++</div>
      <div :class="{ languageBox: true }">Python</div>
      <div :class="{ languageBox: true }">Java</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeContent'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#Clanguages {
  font-size: x-large;
  display: flex;
  justify-content: center;
}

.languageBox {
  font-weight: bold;
  width: 80px;
  height: 50px;
  padding: 50px;
  background-color: yellow;
  margin: 50px;
}

.noLinkDeco {
  text-decoration: none;
  color: inherit;
}

.hoveringHand {
  cursor: pointer;
}
</style>
