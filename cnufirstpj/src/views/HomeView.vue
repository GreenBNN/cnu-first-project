<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Code Typing Practice" />
    <HomeContent msg="제대로 갔니?" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import HomeContent from '@/components/HomeContent.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    HomeContent
  }
}
</script>
