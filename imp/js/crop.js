function getRoundedCanvas(sourceCanvas) {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  var width = sourceCanvas.width;
  var height = sourceCanvas.height;

  canvas.width = width;
  canvas.height = height;
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, 0, 0, width, height);
  context.globalCompositeOperation = "destination-in";
  context.beginPath();

  context.fill();
  return canvas;
}

window.addEventListener("DOMContentLoaded", function () {
  var image = document.getElementById("crop-img");
  var button = document.getElementById("crop-btn");
  var result = document.getElementById("crop-res");
  var croppable = false;
  var cropper = new Cropper(image, {
    aspectRatio: 1,
    viewMode: 1,
    ready: function () {
      croppable = true;
    },
  });

  button.onclick = function () {
    var croppedCanvas;
    var roundedCanvas;
    var roundedImage;

    if (!croppable) {
      return;
    }
    // Crop
    croppedCanvas = cropper.getCroppedCanvas();
    // Round
    roundedCanvas = getRoundedCanvas(croppedCanvas);
    // Show
    roundedImage = document.createElement("img");
    roundedImage.src = roundedCanvas.toDataURL();
    result.innerHTML = "";
    result.appendChild(roundedImage);
  };
});
