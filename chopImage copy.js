function removeEmptyCanvases() {
    console.log("HELLLLOO")
    // Get all canvas elements
    // var canvases = document.getElementsByTagName('canvas');
    var canvases = document.querySelectorAll('.piece');

    console.log("canvases", canvases)

    // Convert the HTMLCollection to an array so we can use array methods
    var canvasesArray = Array.prototype.slice.call(canvases);

    canvasesArray.forEach(function(canvas) {
        console.log("canvas", canvas)
        var ctx = canvas.getContext('2d');
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var allPixels = imageData.data;

        // Check if all pixels are transparent
        var allTransparent = true;
        for (var i = 0; i < allPixels.length; i += 4) {
            if (allPixels[i + 3] !== 0) {
                allTransparent = false;
                break;
            }
        }

        // If all pixels are transparent, remove the canvas
        if (allTransparent) {
            canvas.remove();
            return true
        }
    });
    return false
}

function chopImageIntoPieces(img, pieceWidth, pieceHeight) {
    // Create a canvas and get its context
    var canvas = document.createElement('canvas');
    canvas.classList.add("piece")
    
    // Set willReadFrequently to true for optimization
    var ctx = canvas.getContext('2d', { willReadFrequently: true });
  
    // Draw the image to the canvas
    ctx.drawImage(img, 0, 0, img.width, img.height);
  
    // Calculate the number of pieces
    var piecesX = Math.ceil(img.width / pieceWidth);
    var piecesY = Math.ceil(img.height / pieceHeight);
  
    // Array to hold the pieces
    var pieces = [];
    // Loop over the image, piece by piece
    for (var y = 0; y < piecesY; y++) {
      for (var x = 0; x < piecesX; x++) {
        // Get the pixel data for this piece
        var imageData = ctx.getImageData(x * pieceWidth, y * pieceHeight, pieceWidth, pieceHeight);
        // var imageData = ctx.getImageData(x * pieceWidth, y * pieceHeight, Math.min(pieceWidth, img.width - x * pieceWidth), Math.min(pieceHeight, img.height - y * pieceHeight));
        // Create a new canvas for the piece
        var pieceCanvas = document.createElement('canvas');
        pieceCanvas.width = pieceWidth;
        pieceCanvas.height = pieceHeight;

        console.log(pieceCanvas.width, pieceCanvas.height)
  
        // Draw the piece to the new canvas
        pieceCanvas.getContext('2d').putImageData(imageData, 0, 0);
        if(removeEmptyCanvases(pieceCanvas)) {
            continue
        }
        // Add the piece to the array
        pieces.push(pieceCanvas);
      }
    }

    console.log(pieces)
  
    // Return the array of pieces
    return pieces;
  }
  