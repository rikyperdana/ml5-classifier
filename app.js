var
targetLabel = 'C',
state = 'collection',
setup = () => [
  createCanvas(600, 600),
  model = ml5.neuralNetwork({
    inputs: ['x', 'y'],
    outputs: ['label'],
    task: 'classification',
    debug: true
  }),
  background(225)
],

keyPressed = () => [
  key === 't' ? [
    console.log('start training'),
    model.normalizeData(),
    model.train(
      {epochs: 200}, // options
      (epoch, loss) => console.log(epoch), // while training
      () => state = 'prediction' // when finished
    )
  ] : [targetLabel = key.toUpperCase()]
],

mousePressed = () =>
  state === 'collection' ? [
    model.addData(
      {x: mouseX, y: mouseY}, // input
      {label: targetLabel}  // target
    ),
    stroke(0), noFill(),
    ellipse(mouseX, mouseY, 24),
    fill(0), noStroke(),
    textAlign(CENTER, CENTER),
    text(targetLabel, mouseX, mouseY)
  ] : model.classify(
    {x: mouseX, y: mouseY},
    (error, results) =>
      error ? console.log(error) : [
        stroke(0), fill(0, 0, 255, 100),
        ellipse(mouseX, mouseY, 24),
        fill(0), noStroke(),
        textAlign(CENTER, CENTER),
        text(results[0].label, mouseX, mouseY)
      ]
  )
