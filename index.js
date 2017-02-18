const {canvas} = require('./src/canvas')()
const draw = require('./src/draw')
const raf = require('raf')

document.body.appendChild(canvas)
document.body.onload = tick
document.body.style = `
  background: #000;
`

function tick () {
  const ctx = canvas.getContext('2d')
  ctx.save()
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  draw(ctx, canvas)
  ctx.restore()
  raf(tick)
}
