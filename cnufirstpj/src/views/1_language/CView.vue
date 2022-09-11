<template>
  <div>
    <h3>코딩연습이다!!!!!</h3>
  </div>
  <!-- <div>
    <button @click="makeWordArr">시작</button>
  </div> -->
  <div :key="word" v-for="(word, index) in wordArr">
    <p>{{ word }}</p>
    <input
      type="text"
      v-focus
      @keyup.enter="typing(index)"
      v-if="canType[index]"
      v-model="input"
    />
  </div>
  <h3>{{ wordArr }}</h3>
</template>

<script>
const focus = {
  mounted: (el) => el.focus()
}

export default {
  name: 'CustomDirective',
  directives: {
    focus
  },
  components: {},
  data() {
    return {
      wordData: [
        'apple',
        'banana',
        'water',
        'circle',
        'chicken',
        'lab',
        'mouse',
        'print',
        'scan'
      ],
      wordArr: [],
      canType: [true, false, false, false, false],
      input: '',
      randNum: 0
    }
  },
  setup() {},
  created() {},
  mounted() {
    for (let i = 0; i < 5; i++) {
      this.randomNum(0, 4)
      this.wordArr.push(this.wordData[this.randNum])
    }
    this.$refs.type?.focus()
  },
  unmounted() {},
  methods: {
    typing(idx) {
      this.canType[idx++] = false
      this.canType[idx] = true
      this.input = ''
      if (idx > 4) {
        idx = 0
      }
    },
    makeWordArr() {
      for (let i = 0; i < 5; i++) {
        this.randomNum(0, 4)
        this.wordArr.push(this.wordData[this.randNum])
      }
    },
    randomNum(min, max) {
      this.randNum = Math.floor(Math.random() * (max - min + 1) + min)
    }
  }
}
</script>
