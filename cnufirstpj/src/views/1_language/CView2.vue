<template>
  <div>
    <div><h1>코딩 타자 연습</h1></div>
    <div :class="{ flex: true, centerItems: true }">
      <div :key="index" v-for="(word, index) in RandSelectedWordArr">
        <div :class="{ columnDirectionItems: true }">
          <br />
          <span
            :key="index2"
            v-for="(char, index2) in word.value"
            :class="{ charColor: currentWordCharColor[index][index2] }"
          >
            {{ char }}
          </span>
          <br />
          <br />
          <input
            @keydown.enter="index = gotoNextInput(index, word)"
            @keydown.delete="reducecharIdxInWord"
            @keydown="compareAndChangeColor($event, word, index)"
            type="text"
            v-focus
            v-model="currentInput"
            :class="{ hideInput: hideBool[index] }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const focus = {
  // custom directive 만들어서, mounted 될 때랑 el 값이 update 될 때 포커스를 el에 맞추도록 했음.
  // el 옵션은 Vue 인스턴스에 연결할 HTML DOM 요소를 지정
  mounted: (el) => el.focus(),
  updated: (el) => el.focus()
}
export default {
  name: 'CustomDirective',
  // focus 라는 custom Directive 만들어서 v-focus로 쓰기.
  directives: {
    focus
  },
  components: {},
  data() {
    return {
      numberToSelect: 5,
      selectedWordIndex: 0,
      RandSelectedWordArr: [],
      hideBool: [],
      wrongCharBool: [],
      specialKeyCodes: [61, 186, 187, 188, 189, 190, 191, 192, 219, 220, 221, 222],
      charIdxInWord: 0,

      CwordArr: [
        // C 언어에서 사용하는 단어들 배열
        { value: 'apple', originidx: 0 },
        { value: 'scan', originidx: 1 },
        { value: 'circle', originidx: 2 },
        { value: 'water', originidx: 3 },
        { value: 'pipe', originidx: 4 },
        { value: 'man', originidx: 5 },
        { value: 'because', originidx: 6 },
        { value: 'xor', originidx: 8 },
        { value: 'cannot', originidx: 9 },
        { value: 'nono', originidx: 10 },
        { value: ';', originidx: 11 },
        { value: 'disjunction', originidx: 12 },
        { value: 'conjunction', originidx: 13 }
      ],
      currentWordCharColor: [], // input 과 비교 / 기본/일치 false(black), 틀리면 true(red)
      currentInput: '',
      currentWordIndex: 0,
      tempArr: []
    }
  },
  watch: {
    currentInput(newValue, oldValue) {
      if (newValue.length > this.RandSelectedWordArr[this.currentWordIndex].value.length) {
        // 문자 길이 오버
        this.gotoNextInput(this.currentWordIndex)
      } else {
        this.wordCompareFunction(newValue, oldValue)
      }
    }
  },
  setup() {},
  created() {},
  mounted() {
    this.RandSelectedWordArr = this.RandSelectFunction(this.CwordArr, this.numberToSelect)
    for (let i = 0; i < this.numberToSelect; i++) {
      this.wrongCharBool.push([])
      if (i === 0) {
        this.hideBool[i] = false
      } else {
        this.hideBool[i] = true
      }
      this.setCurrentWordCharColor()
    }
  },
  unmounted() {},
  methods: {
    RandSelectFunction(arr, num) {
      // 단어들이 들어있는 배열을 넣으면 그 중에 num 개를 뽑아서 새로운 배열을 return 하는 함수
      const shuffled = [...arr].sort(() => 0.5 - Math.random())
      // sort 함수 참고, compare 함수 리턴값이 음수,양수가 랜덤하게 나오니
      // 랜덤하게 arr가 정렬됨.
      // ...은 전개 연산자로 넣지 않으면
      const RandSelectedWordArr = shuffled.slice(0, num)
      // 그렇게 랜덤하게 정렬된 배열을 num으로 지정한 길이만큼 잘라냄
      return RandSelectedWordArr
    },
    gotoNextInput(index) {
      this.currentInput = ''
      this.visibleNextOf(index)
      this.charIdxInWord = 0
      // 해당 단어에 input으로 넣었던 값 초기화.
      if (index + 1 === this.numberToSelect) {
        // index가 끝에 다다르면 새로 RandSelect 함.
        this.RandSelectedWordArr = this.RandSelectFunction(this.CwordArr, this.numberToSelect)
        this.visibleNextOf(-1)
        console.log(index)
        // index가 0인 input 칸이 보이도록 함

        //각 글자별 색깔 bool 값 초기화
        this.setCurrentWordCharColor()
        this.currentWordIndex = 0
        return 0
      }
      this.currentWordIndex = index + 1

      return index + 1
    },
    visibleNextOf(index) {
      this.hideBool[index] = true
      this.hideBool[index + 1] = false
    },
    setCurrentWordCharColor() {
      this.currentWordCharColor = []
      this.tempArr = []
      for (let i = 0; i < this.numberToSelect; i++) {
        // 각 글자별 색깔 bool 값 초기화
        for (let j = 0; j < this.RandSelectedWordArr[i].value.length; j++) {
          this.tempArr[j] = false
        }
        this.tempArr = []
        this.currentWordCharColor.push(this.tempArr)
      }
    },
    wordCompareFunction(newValue, oldValue) {
      var compareChar = this.currentInput[newValue.length - 1]
      var compareChar2 = this.RandSelectedWordArr[this.currentWordIndex].value[newValue.length - 1]
      console.log(this.currentWordIndex)

      if (compareChar === compareChar2) {
        // 문자열 같으면 검은색 / 틀리면 빨간색
        this.currentWordCharColor[this.currentWordIndex][newValue.length - 1] = false
      } else {
        this.currentWordCharColor[this.currentWordIndex][newValue.length - 1] = true
      }
      if (newValue.length < oldValue.length) {
        //delete 시 이전값 검은색
        this.currentWordCharColor[this.currentWordIndex][oldValue.length - 1] = false
      }
      console.log(this.currentWordCharColor)
    }
  }
}
</script>
<style scoped>
.flex {
  display: flex;
}
.hideInput {
  visibility: hidden;
}
.columnDirectionItems {
  flex-direction: column;
}
.rowDirectionItems {
  flex-direction: row;
}
.centerItems {
  justify-content: center;
}
.charColor {
  color: red;
}
</style>
