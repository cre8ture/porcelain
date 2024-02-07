function resizeCanvas(canvas, newWidth, newHeight) {
    // Create a temporary canvas to hold the resized image
    var tempCanvas = document.createElement('canvas');
    var tempCtx = tempCanvas.getContext('2d');

    // Set the dimensions of the temporary canvas
    tempCanvas.width = newWidth;
    tempCanvas.height = newHeight;

    // Draw the content of the original canvas onto the temporary canvas, resizing it in the process
    tempCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, newWidth, newHeight);

    // Set the dimensions of the original canvas
    canvas.width = newWidth;
    canvas.height = newHeight;

    // Get the context of the original canvas
    var ctx = canvas.getContext('2d');

    // Draw the content of the temporary canvas onto the original canvas
    ctx.drawImage(tempCanvas, 0, 0, newWidth, newHeight, 0, 0, newWidth, newHeight);
}
function removeBackgroundFromImage(imageElement, net) {
    return new Promise((resolve, reject) => {
      // Perform segmentation
      net.segmentPerson(imageElement).then(segmentation => {
        // Create a mask from the segmentation
        const foregroundColor = {r: 255, g: 255, b: 255, a: 255};
        const backgroundColor = {r: 0, g: 0, b: 0, a: 0};
        const mask = bodyPix.toMask(segmentation, foregroundColor, backgroundColor);
  
        // Create a new canvas element
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = imageElement.width;
        canvas.height = imageElement.height;
  
        // Draw the image onto the canvas
        ctx.drawImage(imageElement, 0, 0);
  
        // Create an off-screen canvas for the mask
        const maskCanvas = document.createElement('canvas');
        const maskCtx = maskCanvas.getContext('2d');
        maskCanvas.width = imageElement.width;
        maskCanvas.height = imageElement.height;
  
        // Draw the mask onto the off-screen canvas
        maskCtx.putImageData(mask, 0, 0);
  
        // Use the mask to cut out the person from the original image
        ctx.globalCompositeOperation = 'destination-in';
        ctx.drawImage(maskCanvas, 0, 0);
  
        // Resolve the promise with the canvas
        resolve(canvas);
      }).catch(error => {
        // Reject the promise if there's an error
        reject(error);
      });
    });
  }
  