// Import the necessary modules
import imglyRemoveBackground from "@imgly/background-removal";

// Function to remove background and display image
async function processImage(imageSrc) {
  // Remove the background from the image
  const blob = await imglyRemoveBackground(imageSrc);

  // Convert the blob to a URL
  const url = URL.createObjectURL(blob);

  // Create a new image element
  const img = document.createElement("img");

  // Set the source of the image element to the URL
  img.src = url;

  // Append the image element to the body of the document
  document.body.appendChild(img);
}

// Array of image sources
const imageSources = ["image1.jpg", "image2.jpg", "image3.jpg"];

// Process each image
imageSources.forEach(processImage);
