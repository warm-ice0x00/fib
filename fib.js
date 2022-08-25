'use strict';
// https://www.geeksforgeeks.org/fast-doubling-method-to-find-the-nth-fibonacci-number/
var convertToBinary = function(x) {
  var bin = BigNumber(0);
  var i = BigNumber(1);
  while (x.gt(0)) {
    var rem = x.mod(2);
    x = x.idiv(2);
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
    var b = binOfN.charAt(i);
    var f2i1 = f[1].times(f[1]).plus(f[0].times(f[0]));
    var f2i = f[0].times(BigNumber(2).times(f[1]).minus(f[0]));
    if (b === '0') {
      f = [f2i, f2i1];
    } else {
      f = [f2i1, f2i1.plus(f2i)];
    }
  }
  return f[0];
};
var nInput = $('#n');
var calcButton = $('#calc');
var resultSpan = $('#result');
calcButton.click(function() {
  calcButton.focus();
  resultSpan.html(fib(nInput.val()).toFixed().split('').join('<wbr>'));
});
nInput.keyup(function(e) {
  if (e.key === 'Enter' || e.keyCode === 13) {
    calcButton.click();
  }
});
