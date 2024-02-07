let piecesMap = new Map();
const limit = 5;

// Global variables for Matter.js
let Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint;
let engine, world;
let shards = [];
let ropes = [];
let mConstraint;

  
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

var bonsais_white = [
    "tree1.jpg",
    "tree2.jpg",
    "tree3.jpg",
    "tree4.jpg",
    "tree5.jpg",
    "tree6.jpg",
];


var bonsais = [
"tree10.png",
"tree11.png",
];
let gridContainer = document.createElement('div');
function preload() {
// window.onload = function() {
    // const gridContainer = document.createElement('div');
    gridContainer.style.width = '500px';
    gridContainer.style.height = '500px';
    gridContainer.style.position = 'absolute';
    gridContainer.style.left = '50%';
    gridContainer.style.top = '50%';
    gridContainer.style.transform = 'translate(-50%, 0%)';
    gridContainer.style.display = 'grid';
    document.body.appendChild(gridContainer);

gridContainer.style.position = 'relative';

// Adjust displayImage function
function displayImage(filename, path) {
    var img = new Image();
    img.src = path+"/" + filename;
    img.onload = function() {
        const pieces = chopImageIntoPieces(img, 100, 100);
        
        pieces.forEach(function(piece, pieceIndex) {
            // Assume chopImageIntoPieces returns canvases or similar
            // Apply CSS class or direct styles as needed for size, etc.

            var ctx = piece ? piece.getContext('2d') : null;
            ctx.fillStyle = 'transparent';
            ctx.fillRect(0, 0, piece.width, piece.height);
    

            // Calculate random position within the container's bounds
            const x = Math.random() * (gridContainer.offsetWidth - piece.width);
            const y = Math.random() * (gridContainer.offsetHeight - piece.height);

            // Random rotation for variety
            const angle = Math.random() * 360;

            // Apply styles for positioning and rotation
            piece.style.position = 'absolute';
            piece.style.left = `${x}px`;
            piece.style.top = `${y}px`;
            piece.style.transform = `rotate(${angle}deg)`;

            gridContainer.appendChild(piece);
        });

        // createPhysicsBodiesForPieces(pieces.slice(0, 5));
    };
}

 
textures.forEach((item) => displayImage(item, "textures"));
}

function setup() {
  createCanvas(800, 600);

  // Initialize Matter.js engine and world
  engine = Matter.Engine.create();
  world = engine.world;

  // Add mouse control
  let canvasmouse = Matter.Mouse.create(canvas.elt);
  canvasmouse.pixelRatio = pixelDensity();
  let options = {
    mouse: canvasmouse
  };
  mConstraint = Matter.MouseConstraint.create(engine, options);
  Matter.World.add(world, mConstraint);

  // Run the engine
  Matter.Engine.run(engine);

}

let isDragging = false;
let lastMouseX, lastMouseY;
let targetX, targetY;
let dampingFactor = 0.00005; // Adjust this value as necessary

// Listen for the mousedown event
gridContainer.addEventListener('mousedown', function(event) {
    isDragging = true;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
    let rect = gridContainer.getBoundingClientRect();
    targetX = rect.left;
    targetY = rect.top;
});

// Listen for the mousemove event
window.addEventListener('mousemove', function(event) {
    if (isDragging) {
        // Calculate the change in mouse position
        let dx = (event.clientX - lastMouseX) * dampingFactor;
        let dy = (event.clientY - lastMouseY) * dampingFactor;

        // Update the target position
        targetX += dx;
        targetY += dy;

        // Update the last mouse position
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    }
});

// Listen for the mouseup event
window.addEventListener('mouseup', function(event) {
    isDragging = false;
});

// Listen for the mouseleave event
gridContainer.addEventListener('mouseleave', function(event) {
    isDragging = false;
});

// Update the position of the gridContainer using linear interpolation
function update() {
    let rect = gridContainer.getBoundingClientRect();
    let x = lerp(rect.left, targetX, 0.05); // Adjust the third argument as necessary
    let y = lerp(rect.top, targetY, 0.05); // Adjust the third argument as necessary
    gridContainer.style.left = `${x}px`;
    gridContainer.style.top = `${y}px`;

    requestAnimationFrame(update);
}

update();

// Linear interpolation function
function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}