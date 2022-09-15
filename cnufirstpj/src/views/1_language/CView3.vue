<template>
  <div>
    <h3>코딩연습이다!!!!!</h3>
  </div>
  <div :style="divStyle" :key="index" v-for="(word, index) in wordArr">
    <span
      :key="index2"
      v-for="(char, index2) in word"
      :style="currentWordType[index][index2]"
    >
      {{ char }}
    </span>

    <p>{{ index }}</p>
    <input
      type="text"
      v-focus
      @keydown.enter="nextUpdate(index, index2)"
      @keydown.space="nextUpdate(index, index2)"
      v-if="canType[index]"
      v-model="currentInput"
    />
  </div>
  <div>
    <br /><br /><br />
    <br /><br /><br />
  </div>
  <h3>{{ input }}</h3>
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
      wordLen: [],
      canType: [true, false, false, false, false], // 타이핑 단어 순서 / true 가 타이핑 해야하는 단어
      currentWord: [], // 타이핑해야하는 단어의 char 들
      currentWordIndex: 0, // 타이핑 해야하는 단어의 순서
      currentCharIndex: 0, // 타이핑 해야하는 단어의 글자 순서
      currentWordType: [], // input 과 비교 / 일치하면 black, 틀리면 red
      currentWordLen: 0, // 타이핑 해야하는 단어의 길이
      currentInput: '', // 타이핑 입력 데이터
      currentInputLen: 0,
      tempArr: [],
      tempArr2: [],

      randNum: 0,
      divStyle: {
        width: '200px',
        height: '100px',
        float: 'left'
      }
    }
  },
  watch: {
    currentInput(newValue, oldValue) {
      this.currentInputLen = this.currentInput.length
      if (newValue == ' ') {
        this.currentInput = ''
      }
      if (newValue.length < oldValue.length) {
        // 지우기가 실행되었으면 : 기환; @click.delete 이벤트 받으면 실행되는 함수로 하면 좋을 듯
        this.tempArr2[oldValue.length - 1] = 'color: black;'
      } else if (this.currentInputLen > this.currentWordLen) {
      } else {
        if (this.currenCharIndex != 0) {
          // 주어진 문자열 글자와 입력된 문자 비교
          for (let i = 0; i < this.currentInputLen; i++) {
            this.compare(
              this.currentWord[i],
              this.currentInput[i],
              this.currentWordIndex,
              this.currentInputLen - 1
            )
          }
        }
      }
    }
  },
  setup() {},
  created() {},
  mounted() {
    for (let i = 0; i < 5; i++) {
      this.randomNum(0, 8)
      this.wordArr.push(this.wordData[this.randNum])
    }
    // this.$refs.type?.focus()
    // 초기 현재 단어, 길이 초기화 // 기환 ; type? 이게 뭐지?
    this.currentWordLen = this.wordArr[0].length
    for (let i = 0; i < this.currentWordLen; i++) {
      this.currentWord[i] = this.wordArr[0][i]
    }
    for (let i = 0; i < 5; i++) {
      this.wordLen[i] = this.wordArr[i].length
      for (let j = 0; j < this.wordLen[i]; j++) {
        this.tempArr[j] = 'color: black;'
      }
      this.currentWordType.push(this.tempArr)
      this.tempArr = []
    }
  },
  unmounted() {},
  methods: {
    nextUpdate(idx, idx2) {
      // Enter 시 문자열 비교 함수 구현

      // 현재 입력된 Input, Word 초기화
      this.currentInput = ''
      this.currentWord = []
      this.currentWordIndex = idx + 1 // 비교해야하는 기준 문자열
      this.currentCharIndex = 0 // 입력된 문자

      // Enter 시 Input
      this.canType[idx] = false
      idx++

      if (idx > 4) {
        this.wordArr = []
        idx = 0
        this.makeWordArr()
      } else {
        this.currentWordLen = this.wordArr[idx].length
        for (let i = 0; i < this.currentWordLen; i++) {
          this.currentWord[i] = this.wordArr[idx][i]
          this.tempArr[i] = 'color: black;'
        }
        this.currentWordType.push(this.tempArr)
        this.tempArr = []
      }

      this.canType[idx] = true
    },
    makeWordArr() {
      // 다시 색깔 바꾸어야 하니까 초기화
      this.currentWordType = []

      this.currentWordIndex = 0

      // wordArr 초기화
      for (let i = 0; i < 5; i++) {
        this.randomNum(0, 8)
        this.wordArr.push(this.wordData[this.randNum])
      }
      // 초기 현재 단어, 길이 초기화
      this.currentWordLen = this.wordArr[0].length
      for (let i = 0; i < this.currentWordLen; i++) {
        this.currentWord[i] = this.wordArr[0][i]
      }
      // currentWordType 초기화
      for (let i = 0; i < 5; i++) {
        // wordLen 초기화
        this.wordLen[i] = this.wordArr[i].length
        for (let j = 0; j < this.wordLen[i]; j++) {
          // i 번째 단어 char 색 초기화
          this.tempArr[j] = 'color: black;'
        }
        this.currentWordType.push(this.tempArr)
        this.tempArr = []
      }
      console.log(this.currentWordType[0])
    },
    randomNum(min, max) {
      this.randNum = 0
      this.randNum = Math.floor(Math.random() * (max - min + 1) + min)
    },
    compare(a, b, idx, idx2) {
      console.log(a)
      console.log(b)
      console.log(idx)
      console.log(idx2)
      console.log(this.currentWordType[idx])
      if (a == b) {
        // 문자가 같으면 색 black
        this.tempArr2 = this.currentWordType[idx]
        this.tempArr2[idx2] = 'color: black;'
      } else {
        this.tempArr2 = this.currentWordType[idx]
        this.tempArr2[idx2] = 'color: red;'
      }
    }
  }
}
</script>
