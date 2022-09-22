<template>
  <div>
    <div><h1>코딩 타자 연습</h1></div>
    <div :class="{ flex: true, centerItems: true }">
      <div :key="index" v-for="(word, index) in RandSelectedWordArr">
        <div>
          <span
            :key="(charIdx, wrongCharBool)"
            v-for="(char, charIdx) in word.value"
            :class="{ wrongChar: wrongCharBool[index][charIdx] }"
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
            v-model="word.UserInput"
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
      specialKeyCodes: [
        61, 186, 187, 188, 189, 190, 191, 192, 219, 220, 221, 222
      ],
      charIdxInWord: 0,

      CwordArr: [
        // C 언어에서 사용하는 단어들 배열
        { value: 'apple', originIdx: 0, UserInput: '' },
        { value: 'scan', originIdx: 1, UserInput: '' },
        { value: 'circle', originIdx: 2, UserInput: '' },
        { value: 'water', originIdx: 3, UserInput: '' },
        { value: 'pipe', originIdx: 4, UserInput: '' },
        { value: 'man', originIdx: 5, UserInput: '' },
        { value: 'because', originIdx: 6, UserInput: '' },
        { value: 'xor', originIdx: 8, UserInput: '' },
        { value: 'cannot', originIdx: 9, UserInput: '' },
        { value: 'nono', originIdx: 10, UserInput: '' },
        { value: ';', originIdx: 11, UserInput: '' },
        { value: 'disjunction', originIdx: 12, UserInput: '' },
        { value: 'conjunction', originIdx: 13, UserInput: '' }
        // 이렇게 하니까 랜덤하게 다시 뽑았을 때 input 해준 값이 그대로 있음.
      ]
    }
  },
  setup() {},
  created() {},
  mounted() {
    this.RandSelectedWordArr = this.RandSelectFunction(
      this.CwordArr,
      this.numberToSelect
    )
    for (let i = 0; i < this.numberToSelect; i++) {
      this.wrongCharBool.push([])
      if (i === 0) {
        this.hideBool[i] = false
      } else {
        this.hideBool[i] = true
      }
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
    gotoNextInput(index, word) {
      this.visibleNextOf(index)
      this.charIdxInWord = 0
      word.UserInput = ''
      // 해당 단어에 input으로 넣었던 값 초기화.
      if (index + 1 === this.numberToSelect) {
        // index가 끝에 다다르면 새로 RandSelect 함.
        this.RandSelectedWordArr = this.RandSelectFunction(
          this.CwordArr,
          this.numberToSelect
        )
        this.visibleNextOf(-1)
        // index가 0인 input 칸이 보이도록 함
        this.wrongCharBool = [false]
        return 0
      }
      return index + 1
    },
    visibleNextOf(index) {
      this.hideBool[index] = true
      this.hideBool[index + 1] = false
    },
    compareAndChangeColor(event, word, index) {
      if (
        this.isNumberKey(event) ||
        this.isLetterKey(event) ||
        this.isSpecialKey(event)
      ) {
        if (word.value[this.charIdxInWord] === event.key) {
          console.log('right alphabet')
          this.wrongCharBool[index][this.charIdxInWord] = false
          console.log(this.wrongCharBool)
        } else if (word.value[this.charIdxInWord] !== event.key) {
          console.log('wrong alphabet')
          this.wrongCharBool[index][this.charIdxInWord] = true
          console.log(this.wrongCharBool)
        }
        this.charIdxInWord++
      }
    },
    isNumberKey(event) {
      if (event.keyCode >= 48 && event.keyCode <= 57) {
        // keyCode range of numbers
        return true
      } else {
        return false
      }
    },
    isLetterKey(event) {
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        // keyCode range of letters
        return true
      } else {
        return false
      }
    },
    isSpecialKey(event) {
      if (this.specialKeyCodes.includes(event.keyCode)) {
        return true
      } else {
        return false
      }
    },
    reducecharIdxInWord() {
      this.charIdxInWord--
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
.wrongChar {
  color: red;
}
</style>
