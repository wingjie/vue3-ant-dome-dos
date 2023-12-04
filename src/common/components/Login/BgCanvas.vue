<template>
  <div class="login-bg" ref="bgRef">
    <canvas id="canvas" ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
const canvasRef = ref()
const bgRef = ref()

function canvasApp(
  options = {
    conWidth: 1200,
    conHeight: 768,
  }
) {
  function canvasSupport() {
    return true
  }
  if (!canvasSupport()) {
    return
  }

  const numBalls = 25
  const minSize = 4
  const maxSize = 4
  const maxSpeed = maxSize + 1
  const balls: any = []
  let tempBall
  let tempX
  let tempY
  let tempSpeed
  let tempAngle
  let tempRadius
  let tempRadians
  let tempXunits
  let tempYunits
  let tempColor
  const distance = 150
  const speedDiff = 4
  const theCanvas: any = document.getElementById('canvas')
  theCanvas.width = options.conWidth + 100
  theCanvas.height = options.conHeight + 100
  const context = theCanvas.getContext('2d')
  for (let i = 0; i < numBalls; i++) {
    tempRadius = Math.floor(Math.random() * maxSize) + minSize
    tempX =
      tempRadius * 2 +
      (Math.floor(Math.random() * theCanvas.width) - tempRadius * 2)
    tempY =
      tempRadius * 2 +
      (Math.floor(Math.random() * theCanvas.height) - tempRadius * 2)
    tempSpeed = maxSpeed - tempRadius + speedDiff
    tempAngle = Math.floor(Math.random() * 360)
    tempRadians = (tempAngle * Math.PI) / 180
    tempXunits = Math.cos(tempRadians) * tempSpeed
    tempYunits = Math.sin(tempRadians) * tempSpeed
    tempColor = '#F4FBFE'
    tempBall = {
      x: tempX,
      y: tempY,
      radius: tempRadius,
      speed: 2,
      angle: tempAngle,
      xunits: tempXunits,
      yunits: tempYunits,
      color: tempColor,
    }
    balls.push(tempBall)
  }

  function drawScreen() {
    context.globalCompositeOperation = 'source-over'
    // 画布背景
    context.fillStyle = 'rgba(255, 255, 255, 1)'
    context.fillRect(0, 0, theCanvas.width, theCanvas.height)
    // context.globalCompositeOperation = "lighter";
    let gradient = context.createRadialGradient(
      theCanvas.width * 0.5,
      theCanvas.height * 0.5,
      0,
      theCanvas.width * 0.5,
      theCanvas.height * 0.5,
      500
    )
    // gradient.addColorStop(0, 'rgba(0, 70, 70, 1)')
    // gradient.addColorStop(1, 'rgba(0, 8, 14, 1)')
    context.fillStyle = gradient
    context.fillRect(0, 0, theCanvas.width, theCanvas.height)
    let ball
    for (let i = 0; i < balls.length; i++) {
      ball = balls[i]
      ball.x += ball.xunits
      ball.y += ball.yunits
      context.beginPath()
      gradient = context.createRadialGradient(
        ball.x,
        ball.y,
        0,
        ball.x,
        ball.y,
        ball.radius + 15
      )
      gradient.addColorStop(0, '#D6F6FD')
      // gradient.addColorStop(0.4, 'rgba(255,255,255,0.75)')
      gradient.addColorStop(0.4, '#fff')
      context.fillStyle = gradient
      context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true)
      // context.shadowColor = '#999'
      context.shadowBlur = 10
      context.shadowOffsetX = 10
      context.shadowOffsetY = 15
      context.closePath()
      context.fill()
      if (ball.x > theCanvas.width || ball.x < 0) {
        ball.angle = 180 - ball.angle
        updateBall(ball)
      } else if (ball.y > theCanvas.height || ball.y < 0) {
        ball.angle = 360 - ball.angle
        updateBall(ball)
      }
      for (let z = 0; z < balls.length; z++) {
        if (z !== i) {
          /*
           *  balls connecting
           */
          let zxLower = balls[z].x - distance
          let zxHigher = balls[z].x + distance
          let zyLower = balls[z].y - distance
          let zyHigher = balls[z].y + distance
          if (
            balls[i].x >= zxLower &&
            balls[i].x <= zxHigher &&
            balls[i].y >= zyLower &&
            balls[i].y <= zyHigher
          ) {
            context.beginPath()
            context.lineWidth = 0.3
            context.strokeStyle = '#E7F0F8'
            context.moveTo(balls[i].x, balls[i].y)
            context.lineTo(balls[z].x, balls[z].y)
            context.stroke()
          }
          /*
           *  balls bouncing
           */
          zxLower = balls[z].x - balls[z].radius
          zxHigher = balls[z].x + balls[z].radius
          zyLower = balls[z].y - balls[z].radius
          zyHigher = balls[z].y + balls[z].radius
          if (
            balls[i].x >= zxLower &&
            balls[i].x <= zxHigher &&
            balls[i].y >= zyLower &&
            balls[i].y <= zyHigher
          ) {
            balls[i].angle = 180 - balls[i].angle
            updateBall(balls[i])
            balls[z].angle = 180 - balls[z].angle
            updateBall(balls[z])
          }
        }
      }
    }
  }

  function updateBall(ball: any) {
    ball.radians = (ball.angle * Math.PI) / 180
    ball.xunits = Math.cos(ball.radians) * ball.speed
    ball.yunits = Math.sin(ball.radians) * ball.speed
  }
  function loop() {
    window.setTimeout(loop, 20)
    drawScreen()
  }
  loop()
}
onMounted(() => {
  const $bgEl = bgRef.value
  canvasApp({
    conWidth: $bgEl.offsetWidth,
    conHeight: $bgEl.offsetHeight,
  })
})
</script>

<style scoped lang="scss">
.login-bg {
  position: fixed;
  top: -50px;
  left: -50px;
  width: 100vw;
  height: 100vh;
  min-width: 1200px;
  min-height: 768px;
  z-index: -100;
}
.canvas-ref {
  width: 100%;
  height: 100%;
}
</style>
