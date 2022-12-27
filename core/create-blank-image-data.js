export const createBlankImageData = (pixelsArray, canvasCount, imageDataArray) => {
  for (let i = 0; i < canvasCount; i += 1) {
    let arr = new Uint8ClampedArray(pixelsArray);
    for (let j = 0; j < arr.length; j++) {
      arr[j] = 0;
    }
    imageDataArray.push(arr);
  }
};
