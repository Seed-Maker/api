CanvasRenderingContext2D.prototype.drawImageByPixel = async function (img, ...params) {
  let tempCanvas = document.createElement('canvas'),
      tempCtx = tempCanvas.getContext('2d'),
      _tempCanvas_ = document.createElement('canvas'),
      _tempCtx_ = _tempCanvas_.getContext('2d'),
      tempImg = new Image;
  const QUALITY = 5,
        IW = img.width,
        IH = img.height;

  _tempCanvas_.width = IW;
  _tempCanvas_.height = IH;
  _tempCtx_.drawImage(img, 0, 0);

  function getPixel(x, y) {
    return _tempCtx_.getImageData(x, y, 1, 1).data;
  }

  tempCanvas.width = IW * QUALITY;
  tempCanvas.height = IH * QUALITY;

  for (let i = 0; i < IW; i++) {
    for (let k = 0; k < IH; k++) {
      const pixel = getPixel(i, k),
            SX = i * QUALITY,
            SY = k * QUALITY;

      if (!pixel[3]) continue;

      let color = `rgb(${
        pixel[0]
      },${
        pixel[1]
      },${
        pixel[2]
      })`;

      tempCtx.fillStyle = color;
      tempCtx.fillRect(SX, SY, QUALITY, QUALITY);
    }
  }

  await new Promise((resolve, reject) => {
    tempImg.src = tempCanvas.toDataURL();
    tempImg.onload = resolve();
    tempImg.onerror = reject();
  });

  await wait(50);

  this.drawImage(tempImg, ...params);
}
