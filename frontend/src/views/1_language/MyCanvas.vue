<template>
  <canvas width="200" height="200" class="canvas"></canvas>
</template>

<script>
export default {
  props: {
    radius: {
      type: Number,
      default: 50
    }
  },
  watch: {
    radius() {
      this.draw(this.radius)
    }
  },
  methods: {
    draw(radius) {
      this.ctx.beginPath()
      this.ctx.clearRect(0, 0, 200, 200)
      this.ctx.arc(100, 100, radius, 0, Math.PI * 2)
      this.ctx.fill()
    }
  },
  mounted() {
    // mounted 이후부터 canvas의 DOM에 접근할 수 있습니다.
    // CreateJS 등을 사용할 때에도 여기에서 canvas를 매개 변수로 전달해야 합니다.
    // console.log(this.$el)
    this.ctx = this.$el.getContext('2d')
    this.draw(this.radius)
  }
}
</script>

<style scoped>
.canvas {
  border: 1px solid #000;
}
</style>
