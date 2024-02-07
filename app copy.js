// var textures = [
//     "textures8.png",
//     "textures2.jpg",
//     "textures3.jpg",
//     "textures4.jpg",
//     "textures5.jpg",
//     "textures6.jpg",
//     "textures7.jpg",
//     "textures9.jpg",
//     "textures10.webp",
//     "textures11.webp",
//     "textures12.jpg",

//   ];
  

// window.onload = function() {
//     // Array of image filenames
//     // var imageFilenames = ["image1.jpg", "image2.jpg", "image3.jpg"];
//     const body = document.querySelector("body")
//     // Function to create an img element for each image and append it to the body
//     function displayImage(filename) {
//           // Create a new img element
//     var img = new Image();

//     // Set the source of the img element to the image file
//     img.src = "textures/" + filename;

//     // Wait for the image to load before processing it
//     img.onload = function() {
//       const pieces = chopImageIntoPieces(img, 100, 100);
//       body.appendChild() //[0].style.gridTemplateColumns = `repeat(${pieces.length / 10}, 100px)`;
//     };


//     }
  
//     // Iterate over the array of image filenames
//     textures.forEach((item) => displayImage(item));
//   };
  
var textures = [
    "textures8.png",
    "textures2.jpg",
    "textures3.jpg",
    "textures4.jpg",
    "textures5.jpg",
    "textures6.jpg",
    "textures7.jpg",
    "textures9.jpg",
    "textures10.webp",
    "textures11.webp",
    "textures12.jpg",
];

window.onload = function() {
    const body = document.querySelector("body")

    // function displayImage(filename) {
    //     var img = new Image();
    //     img.src = "textures/" + filename;

    //     img.onload = function() {
    //         const pieces = chopImageIntoPieces(img, 100, 100);
    //         pieces.forEach(function(pieceCtx) {
    //             // Append the canvas element, not the context
    //             body.appendChild(pieceCtx);
    //         });
    //     };
    // }
    function displayImage(filename, index) {
        var img = new Image();
        img.src = "textures/" + filename;
        img.onload = function() {
            const pieces = chopImageIntoPieces(img, 100, 100);
            const gridWidth = Math.floor(window.innerWidth / pieces[0].width);
            const gridHeight = Math.floor(window.innerHeight / pieces[0].height);
            let grid = Array(gridWidth * gridHeight).fill().map((_, i) => i);
        
            pieces.forEach(function(piece, pieceIndex) {
                // Get the context from the canvas
                var ctx = piece.getContext('2d');
        
                // Check if the canvas is empty
                const imageData = ctx.getImageData(0, 0, piece.width, piece.height);
                const allPixels = imageData.data;
                let isEmpty = true;
                for (let i = 0; i < allPixels.length; i += 4) {
                    if (allPixels[i+3] !== 0) {
                        isEmpty = false;
                        break;
                    }
                }
        
                // If the canvas is not empty, append it to the body
                if (!isEmpty && grid.length > 0) {
                    const randomIndex = Math.floor(Math.random() * grid.length);
                    const cell = grid.splice(randomIndex, 1)[0];
                    const x = cell % gridWidth;
                    const y = Math.floor(cell / gridWidth);
                    piece.style.position = 'absolute';
                    piece.style.top = `${y * piece.height}px`;
                    piece.style.left = `${x * piece.width}px`;
                    piece.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)'; // Adjust as needed
                    resizeCanvas(piece, 50,50);
                    document.body.appendChild(piece);
                }
            });
        };
    }
    // Iterate over the array of image filenames
    textures.forEach((item) => displayImage(item));
};