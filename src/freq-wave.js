const soundBoard = require('sound-board')

module.exports = onData => {
  soundBoard.downloadSound('song', './sounds/Red-Velvet.mp3')
    .then(() => soundBoard.play('song'))

  soundBoard.on('frequencyData', (key, bufferLength, dataArray) => {
    const data = []
    const sliceWidth = 100 * 1.0 / bufferLength
    let x = 0
    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0
      const y = v * 100 / 2
      data.push([x, y])
      x += sliceWidth
    }
    onData(data)
  })
}
