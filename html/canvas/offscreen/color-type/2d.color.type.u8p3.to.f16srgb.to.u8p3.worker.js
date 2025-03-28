// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.color.type.u8p3.to.f16srgb.to.u8p3
// Description:test srgb float16 canvas storing 8-bit display-p3 data accurately
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("test srgb float16 canvas storing 8-bit display-p3 data accurately");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

  var canvas = new OffscreenCanvas(100, 50);
  var ctx = canvas.getContext('2d', {colorType: "float16", colorSpace: "srgb"});

  // Consider the color in Display P3:
  //   (5,250,128)/255
  // In sRGB this is:
  //   (-0.4990661502955996, 0.9982902153915844, 0.43901323244980783)
  // Quantized to float16, this is:
  //   (0xB7FC, 0x3BFC, 0x3706)
  //   (-0.49902344,         0.9980469,          0.43896484)
  // Converted back to Display P3 this is:
  //   (4.783888129523, 249.938708036787, 127.979725000698)/255
  // Quantized to 8-bit, this is:
  //   (5, 250, 128)
  var input = new ImageData(new Uint8ClampedArray([5, 250, 128, 255]),
                            1, 1, {colorSpace: "display-p3"});
  ctx.putImageData(input, 0, 0);
  var readback = ctx.getImageData(0, 0, 1, 1, {colorSpace:"display-p3"});
  const kEpsilon = 2;
  assert_approx_equals(readback.data[0], 5, kEpsilon);
  assert_approx_equals(readback.data[1], 250, kEpsilon);
  assert_approx_equals(readback.data[2], 128, kEpsilon);
  t.done();
});
done();
