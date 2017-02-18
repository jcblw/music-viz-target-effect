const TWEEN = require('tween.js')
const freqWave = require('./freq-wave')
const waveCircle = require('./wave-circle')
const color = opacity => `rgba(103,100,232,${opacity})`

const pointSize = 1
const spread = 100
const startRadius = 10
const segmentAmount = 5

let data = []
let prevData = []

freqWave((_data) => {
  data = _data.filter((n, i) => i % 2)
})

module.exports = (ctx, canvas) => {
  TWEEN.update()
  const center = [canvas.width / 2, canvas.height / 2]
  ctx.beginPath()
  ctx.translate(0, 0)
  ctx.scale(1, 1)

  const points = waveCircle(data, center, startRadius, pointSize)
  prevData.forEach((dataset, index) => {
    if (!dataset) return
    if (!dataset.length === 0) return
    const prevPoints = waveCircle(dataset, center, (index * spread) + spread, pointSize)
    prevPoints.forEach((path, i) => {
      ctx.stroke(path)
      ctx.strokeStyle = color((prevData.length - index) / prevData.length)
      ctx.closePath()
    })
  })
  points.forEach((path, i) => {
    ctx.stroke(path)
    ctx.strokeStyle = color(1)
    ctx.closePath()
  })
  prevData.unshift(data)
  if (prevData.length >= segmentAmount) {
    prevData.pop()
  }
}
