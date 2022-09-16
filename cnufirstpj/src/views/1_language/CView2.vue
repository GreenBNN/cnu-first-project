<template>
  <!-- 이제 input 칸에 포커스 하게 해주는 거랑, 다 입력하면 새로 랜덤하게 불러오는 기능 만들면 됨. -->
  <div>
    <div :key="index" v-for="(word, index) in RandSelectedWordArr">
      <div>
        {{ word.value }}
        <input
          @keyup.enter="index = gotoNextInput(index)"
          type="text"
          :class="{ hideInput: hideBool[index] }"
          v-model="typedArr[index]"
        />
      </div>
    </div>
    <div>
      <button @click="testf(index)">파라미터 값 보기</button>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      numberToSelect: 5,
      selectedWordIndex: 0,
      RandSelectedWordArr: [],
      hideBool: [],

      CwordArr: [
        // C 언어에서 사용하는 단어들 배열
        { value: 'apple', originidx: 0 },
        { value: 'scan', originidx: 1 },
        { value: 'circle', originidx: 2 },
        { value: 'water', originidx: 3 },
        { value: 'pipe', originidx: 4 },
        { value: 'man', originidx: 5 },
        { value: 'because', originidx: 6 },
        { value: 'xor', originidx: 7 }
      ],

      typedArr: []
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
      console.log(shuffled)
      console.log(RandSelectedWordArr)
      return RandSelectedWordArr
    },
    gotoNextInput(index) {
      console.log(this.selectedWordIndex, index)
      console.log(this.hideBool)
      this.changeNowNextBool(index)
      return index + 1
    },
    changeNowNextBool(index) {
      this.hideBool[index] = true
      this.hideBool[index + 1] = false
    },

    testf(toSee) {
      console.log(this.toSee)
    }
  }
}
</script>
<style scoped>
.hideInput {
  visibility: hidden;
}
</style>
