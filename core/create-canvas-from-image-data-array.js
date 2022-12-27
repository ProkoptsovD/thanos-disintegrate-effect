export const createCanvasFromImageDataArray = (imageDataArray, w, h) => {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;

  let tempCtx = canvas.getContext('2d');
  tempCtx.putImageData(new ImageData(imageDataArray, w, h), 0, 0);

  return canvas;
};
