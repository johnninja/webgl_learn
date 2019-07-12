function Vector3(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
}

Vector3.prototype.setX = function (x) {
  this.x = x || 0;
  return this;
}
Vector3.prototype.setY = function (y) {
  this.y = y || 0;
  return this;
}
Vector3.prototype.setZ = function (z) {
  this.z = z || 0;
  return this;
}
Vector3.prototype.normalize = function () {
  var length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
  if (length > 0.00001) {
    return new Vector3(this.x / length, this.y / length, this.z / length);
  }
  return new Vector3()
}
Vector3.prototype.addVectors = function (vec1, vec2) {
  this.x = vec1.x + vec2.x;
  this.y = vec1.y + vec2.y;
  this.z = vec1.z + vec2.z;
  return this
}
Vector3.prototype.add = function (vec1, vec2) {
  if (vec2) {
    return this.addVectors(vec1, vec2)
  }
  this.x += vec1.x;
  this.y += vec1.y;
  this.z += vec1.z;
  return this;
}
Vector3.prototype.sub = function (vec1, vec2) {
  if (vec2) {
    return this.addVectors(vec1, -vec2);
  }
  this.x -= vec1.x;
  this.y -= vec1.y;
  this.z -= vec1.z;
  return this;
}
Vector3.prototype.multiplyScalar = function (scalar) {
  this.x *= scalar;
  this.y *= scalar;
  this.z *= scalar;
  return this;
}
Vector3.prototype.multiplyVector = function (vec1, vec2) {
  this.x = vec1.x * vec2.x;
  this.y = vec1.y * vec2.y;
  this.z = vec1.z * vec2.z;
  return this;
}
Vector3.prototype.multiply = function (vec1, vec2) {
  if (vec2) {
    return this.multiplyVector(vec1, vec2)
  }
  this.x *= vec1.x;
  this.y *= vec1.y;
  this.z *= vec1.z;
  return this;
}
function dot(vec1, vec2) {
  return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
}
function cross(vec1, vec2) {
  var x = vec1.y * vec2.z - vec2.y * vec1.z;
  var y = vec2.x * vec1.z - vec1.x * vec2.z;
  var z = vec1.x * vec2.y - vec1.y * vec2.x;
  return new Vector3(x, y, z);
}
function identity(target) {
  target = target || new Float32Array(16)
  // 第一列
  target[0] = 1;
  target[1] = 0;
  target[2] = 0;
  target[3] = 0;
  // 第二列
  target[4] = 0;
  target[5] = 1;
  target[6] = 0;
  target[7] = 0;
  // 第三列
  target[8] = 0;
  target[9] = 0;
  target[10] = 1;
  target[11] = 0;
  // 第四列
  target[12] = 0;
  target[13] = 0;
  target[14] = 0;
  target[15] = 1;

  return target;
}
function initialize(source, target) {
  if (source) {
    if (target) {
      for (var i = 0; i < source.length; i++) {
        target[i] = source[i]
      }
      return target;
    }
    return new Float32Array(source);
  }
  return identity(target)
}

function addMatrix(m1, m2, target) {
  target = target || new Float32Array(16);
  for (var i = 0; i < m1.length; i++) {
    target[i] = m1[i] + m2[i]
  }
  return target;
}
function substractMatrix(m1, m2, target) {
  target = target || new Float32Array(16);
  for (var i = 0; i < m1.length; i++) {
    target[i] = m1[i] - m2[i]
  }
  return target;
}

function multiply(next, prev, target){
   target = target || new Float32Array(16);
   // 第一列
   var p00 = prev[0];
   var p10 = prev[1];
   var p20 = prev[2];
   var p30 = prev[3];
   // 第二列
   var p01 = prev[4];
   var p11 = prev[5];
   var p21 = prev[6];
   var p31 = prev[7];
   // 第三列
   var p02 = prev[8];
   var p12 = prev[9];
   var p22 = prev[10];
   var p32 = prev[11];

   // 第四列
   var p03 = prev[12];
   var p13 = prev[13];
   var p23 = prev[14];
   var p33 = prev[15];

   // 第一行
   var n00 = next[0];
   var n01 = next[4];
   var n02 = next[8];
   var n03 = next[12];
   // 第二行
   var n10 = next[1];
   var n11 = next[5];
   var n12 = next[9];
   var n13 = next[13];
   // 第三行
   var n20 = next[2];
   var n21 = next[6];
   var n22 = next[10];
   var n23 = next[14];

   // 第四行
   var n30 = next[3];
   var n31 = next[7];
   var n32 = next[11];
   var n33 = next[15];

   target[0] = p00 * n00 + p10 * n01 + p20 * n02 + p30 * n03;
   target[1] = p00 * n10 + p10 * n11 + p20 * n12 + p30 * n13;
   target[2] = p00 * n20 + p10 * n21 + p20 * n22 + p30 * n23;
   target[3] = p00 * n30 + p10 * n31 + p20 * n32 + p30 * n33;

   target[4] = p01 * n00 + p11 * n01 + p21 * n02 + p31 * n03;
   target[5] = p01 * n10 + p11 * n11 + p21 * n12 + p31 * n13;
   target[6] = p01 * n20 + p11 * n21 + p21 * n22 + p31 * n23;
   target[7] = p01 * n30 + p11 * n31 + p21 * n32 + p31 * n33;

   target[8] = p02 * n00 + p12 * n01 + p22 * n02 + p32 * n03;
   target[9] = p02 * n10 + p12 * n11 + p22 * n12 + p32 * n13;
   target[10] = p02 * n20 + p12 * n21 + p22 * n22 + p32 * n23;
   target[11] = p02 * n30 + p12 * n31 + p22 * n32 + p32 * n33;

   target[12] = p03 * n00 + p13 * n01 + p23 * n02 + p33 * n03;
   target[13] = p03 * n10 + p13 * n11 + p23 * n12 + p33 * n13;
   target[14] = p03 * n20 + p13 * n21 + p23 * n22 + p33 * n23;
   target[15] = p03 * n30 + p13 * n31 + p23 * n32 + p33 * n33;

   return target;
}
function multiplyScalar(m, scalar){
    if(scalar === undefined || scalar === null){
        return m;
    }
    for(var i = 0; i < m.length; i++){
        m[i] *= scalar;
    }
    return m;
}
function transpose(m, target){
    target  = target || new Float32Array(16);
    //转置矩阵的第一列
    target[0] = m[0];
    target[1] = m[4];
    target[2] = m[8];
    target[3] = m[12];
    //转置矩阵的第二列
    target[4] = m[1];
    target[5] = m[5];
    target[6] = m[9];
    target[7] = m[13];
    //转置矩阵的第三列
    target[8] = m[2];
    target[9] = m[6];
    target[10] = m[10];
    target[11] = m[14];
    //转置矩阵的第四列
    target[12] = m[3];
    target[13] = m[7];
    target[14] = m[11];
    target[15] = m[15];
    
    return target;
}