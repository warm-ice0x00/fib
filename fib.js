'use strict';
// https://www.geeksforgeeks.org/fast-doubling-method-to-find-the-nth-fibonacci-number/
var convertToBinary = function(x) {
  var bin = BigNumber(0);
  var i = BigNumber(1);
  while (x.gt(0)) {
    var quot = x.times(0.5).integerValue(BigNumber.ROUND_DOWN);
    var rem = x.minus(quot.times(2));
    x = quot;
    bin = bin.plus(rem.times(i));
    i = i.times(10);
  }
  return bin.toFixed();
};
var fib = function(n) {
  n = BigNumber(n);
  var binOfN = convertToBinary(n);
  var f = [BigNumber(0), BigNumber(1)];
  for (var i = 0; i < binOfN.length; i++) {
    var f2i1 = f[1].times(f[1]).plus(f[0].times(f[0]));
    var f2i = f[0].times(f[1].times(2).minus(f[0]));
    if (binOfN.charAt(i) === '0') {
      f = [f2i, f2i1];
    } else {
      f = [f2i1, f2i1.plus(f2i)];
    }
  }
  return f[0];
};
var nInput = document.getElementById('n');
var calcButton = document.getElementsByTagName('button')[0];
var resultSpan = document.getElementsByTagName('span')[0];
calcButton.onclick = function() {
  resultSpan.innerHTML = fib(nInput.value).toFixed().split('').join('<wbr>');
};
nInput.onkeyup = function(e) {
  e = e || window.event;
  if (e.key === 'Enter' || e.keyCode === 13) {
    calcButton.click();
  }
};
