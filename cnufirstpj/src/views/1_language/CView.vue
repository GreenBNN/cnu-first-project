<template>
  <div>
    <h3>코딩연습이다!!!!!</h3>
  </div>
  <div :key="word" v-for="(word, index) in wordArr">
    <p>{{ word }}</p>
    <input
      type="text"
      v-focus
      @keyup.enter="typing(index)"
      @keyup.space="typing(index)"
      v-if="canType[index]"
      v-model="input"
    />
  </div>
  <h3>{{ wordArr }}</h3>
  <h3>{{ canType }}</h3>
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
        // 단어 데이터
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
      wordArr: [], // 타이핑 할 단어 배열
      canType: [true, false, false, false, false], // 타이핑 단어 순서
      input: '', // 타이핑 입력 데이터
      randNum: 0
    }
  },
  setup() {},
  created() {},
  mounted() {
    for (let i = 0; i < 5; i++) {
      this.randomNum(0, 8)
      this.wordArr.push(this.wordData[this.randNum])
    }
    this.$refs.type?.focus()
  },
  unmounted() {},
  methods: {
    typing(idx) {
      // enter
      this.canType[idx] = false
      idx++
      if (idx > 4) {
        idx = 0
        this.wordArr = []
        this.makeWordArr()
      }
      this.canType[idx] = true
      this.input = ''
    },
    makeWordArr() {
      for (let i = 0; i < 5; i++) {
        this.randomNum(0, 8)
        this.wordArr.push(this.wordData[this.randNum])
      }
    },
    randomNum(min, max) {
      this.randNum = Math.floor(Math.random() * (max - min + 1) + min)
    }
  }
}
</script>
