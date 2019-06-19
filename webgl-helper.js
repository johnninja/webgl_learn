function getCanvas(id) {
  var canvas = document.getElementById('canvas')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  return canvas
}

function getWebGLContext(canvas) {
  return canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
}

function createShaderFromScript(gl, type, id) {
  var shaderSource = document.getElementById(id).textContent
  var shader = gl.createShader(type)
  gl.shaderSource(shader, shaderSource)
  gl.compileShader(shader)

  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader
  } else {
    console.log(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  return program
}
function randomColor() {
  return {
    r: Math.random() * 255,
    g: Math.random() * 255,
    b: Math.random() * 255,
    a: 1.0
  }
}

function render(gl) {
  gl.clear(gl.COLOR_BUFFER_BIT)

  if (positions.length > 0) {
    gl.drawArrays(gl.TRIANGLES, 0, positions.length / 6)
  }
}