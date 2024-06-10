// import React, { useState, useEffect, useCallback } from 'react';
// import Cropper from 'react-easy-crop';
// import 'react-easy-crop/react-easy-crop.css';
// import './App.css';

// function App() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [rotation, setRotation] = useState(0);
//   const [flip, setFlip] = useState({ horizontal: false, vertical: false });
//   const [cropShape, setCropShape] = useState('rect');
//   const [finalImage, setFinalImage] = useState(null);
//   const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

//   const onSelectFile = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const reader = new FileReader();
//       reader.addEventListener('load', () => setSelectedImage(reader.result));
//       reader.readAsDataURL(e.target.files[0]);
//       setFinalImage(null); // Reset final image when a new image is selected
//     }
//   };

//   const handleFlip = (axis) => {
//     setFlip((prev) => ({
//       ...prev,
//       [axis]: !prev[axis],
//     }));
//   };

//   const handleRotation = (direction) => {
//     setRotation((prev) => (direction === 'left' ? prev - 90 : prev + 90));
//   };

//   const calculateZoom = useCallback((rotation) => {
//     const radians = (Math.abs(rotation) % 180) * (Math.PI / 180);
//     const cos = Math.cos(radians);
//     const sin = Math.sin(radians);
//     return 1 / (cos + sin);
//   }, []);

//   useEffect(() => {
//     setZoom(calculateZoom(rotation));
//   }, [rotation, calculateZoom]);

//   useEffect(() => {
//     // Calculate container size based on screen size
//     const updateContainerSize = () => {
//       const screenWidth = window.innerWidth;
//       const screenHeight = window.innerHeight;
//       // Adjust dimensions as needed
//       const width = screenWidth * 0.8; // 80% of screen width
//       const height = screenHeight * 0.6; // 60% of screen height
//       setContainerSize({ width, height });
//     };
//     // Initial call
//     updateContainerSize();
//     // Listen for window resize
//     window.addEventListener('resize', updateContainerSize);
//     // Cleanup listener
//     return () => window.removeEventListener('resize', updateContainerSize);
//   }, []);

//   const transform = `
//     ${flip.horizontal ? 'scaleX(-1)' : ''}
//     ${flip.vertical ? 'scaleY(-1)' : ''}
//   `;


//   const handleUpload = () => {
//     if (selectedImage) {
//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');
  
//       // Set canvas dimensions to match cropped area, but with width halved
//       const { width: cropWidth, height: cropHeight } = containerSize;
  
//       canvas.width = cropWidth / 2; // Set width to half
//       canvas.height = cropHeight;
  
//       const image = new Image();
//       image.src = selectedImage;
  
//       image.onload = function () {
//         // Draw the image onto the canvas with applied transformations
//         ctx.save();
//         ctx.translate((cropWidth / 2) / 2, cropHeight / 2); // Translate to center
//         ctx.rotate((rotation * Math.PI) / 180);
//         ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
//         ctx.drawImage(image, -(cropWidth / 4), -cropHeight / 2, cropWidth / 2, cropHeight); // Draw with halved width
//         ctx.restore();
  
//         // Set the final image to the canvas data URL
//         setFinalImage(canvas.toDataURL('image/jpeg'));
//       };
//     }
//   };
  
//   // const handleUpload = () => {
//   //   if (selectedImage) {
//   //     const canvas = document.createElement('canvas');
//   //     const ctx = canvas.getContext('2d');

//   //     const image = new Image();
//   //     image.src = selectedImage;

//   //     image.onload = function () {
//   //       canvas.width = image.width;
//   //       canvas.height = image.height;

//   //       ctx.save();
//   //       ctx.translate(image.width / 2, image.height / 2);
//   //       ctx.rotate((rotation * Math.PI) / 180);
//   //       ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
//   //       ctx.drawImage(image, -image.width / 2, -image.height / 2);
//   //       ctx.restore();

//   //       setFinalImage(canvas.toDataURL('image/jpeg'));
//   //     };
//   //   }
//   // };

//   return (
//     <div className="app-container">
//       <input type="file" accept="image/*" onChange={onSelectFile} />
//       {!finalImage && selectedImage && (
//         <div
//           className="crop-container"
//           style={{ width: containerSize.width, height: containerSize.height }}
//         >
//           <Cropper
//             image={selectedImage}
//             crop={crop}
//             zoom={zoom}
//             rotation={rotation}
//             aspect={1}
//             cropShape={cropShape}
//             onCropChange={setCrop}
//             onZoomChange={setZoom}
//             style={{ containerStyle: { transform } }}
//           />
//         </div>
//       )}
//       {!finalImage && selectedImage && (
//         <div className="controls-container">
//           <button onClick={() => handleFlip('horizontal')}>Flip Horizontal</button>
//           <button onClick={() => handleFlip('vertical')}>Flip Vertical</button>
//           <button onClick={() => handleRotation('left')}>Rotate Left</button>
//           <button onClick={() => handleRotation('right')}>Rotate Right</button>
//           <button onClick={() => setCropShape('rect')}>Rectangle</button>
//           <button onClick={() => setCropShape('heart')}>heart</button>
//           <button onClick={() => setCropShape('round')}>Circle</button>

//           <button onClick={handleUpload}>Use this image</button>
//         </div>
//       )}
//       {finalImage && (
//         <div className="final-image-container">
//           <img src={finalImage} alt="Final" />
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;




// import React, { useState, useEffect, useCallback } from 'react';
// import Cropper from 'react-easy-crop';
// import 'react-easy-crop/react-easy-crop.css';
// import './App.css';

// function App() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [rotation, setRotation] = useState(0);
//   const [flip, setFlip] = useState({ horizontal: false, vertical: false });
//   const [cropShape, setCropShape] = useState('rect');
//   const [finalImage, setFinalImage] = useState(null);
//   const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

//   const onSelectFile = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const reader = new FileReader();
//       reader.addEventListener('load', () => setSelectedImage(reader.result));
//       reader.readAsDataURL(e.target.files[0]);
//       setFinalImage(null); // Reset final image when a new image is selected
//     }
//   };

//   const handleFlip = (axis) => {
//     setFlip((prev) => ({
//       ...prev,
//       [axis]: !prev[axis],
//     }));
//   };

//   const handleRotation = (direction) => {
//     setRotation((prev) => (direction === 'left' ? prev - 90 : prev + 90));
//   };

//   const calculateZoom = useCallback((rotation) => {
//     const radians = (Math.abs(rotation) % 180) * (Math.PI / 180);
//     const cos = Math.cos(radians);
//     const sin = Math.sin(radians);
//     return 1 / (cos + sin);
//   }, []);

//   useEffect(() => {
//     setZoom(calculateZoom(rotation));
//   }, [rotation, calculateZoom]);

//   useEffect(() => {
//     // Calculate container size based on screen size
//     const updateContainerSize = () => {
//       const screenWidth = window.innerWidth;
//       const screenHeight = window.innerHeight;
//       // Adjust dimensions as needed
//       const width = screenWidth * 0.8; // 80% of screen width
//       const height = screenHeight * 0.6; // 60% of screen height
//       setContainerSize({ width, height });
//     };
//     // Initial call
//     updateContainerSize();
//     // Listen for window resize
//     window.addEventListener('resize', updateContainerSize);
//     // Cleanup listener
//     return () => window.removeEventListener('resize', updateContainerSize);
//   }, []);

//   const transform = `
//     ${flip.horizontal ? 'scaleX(-1)' : ''}
//     ${flip.vertical ? 'scaleY(-1)' : ''}
//   `;

//   const handleUpload = () => {
//     if (selectedImage) {
//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');

//       // Set canvas dimensions to match cropped area, but with width halved
//       const { width: cropWidth, height: cropHeight } = containerSize;

//       canvas.width = cropWidth / 2; // Set width to half
//       canvas.height = cropHeight;

//       const image = new Image();
//       image.src = selectedImage;

//       image.onload = function () {
//         // Draw the image onto the canvas with applied transformations
//         ctx.save();
//         ctx.translate((cropWidth / 2) / 2, cropHeight / 2); // Translate to center
//         ctx.rotate((rotation * Math.PI) / 180);
//         ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
//         ctx.drawImage(image, -(cropWidth / 4), -cropHeight / 2, cropWidth / 2, cropHeight); // Draw with halved width
//         ctx.restore();

//         if (cropShape === 'heart') {
//           ctx.globalCompositeOperation = 'destination-in';
//           ctx.fillStyle = 'black';
//           ctx.beginPath();
//           ctx.moveTo(canvas.width / 2, canvas.height * 0.917);
//           ctx.lineTo(canvas.width * 0.442, canvas.height * 0.86);
//           ctx.quadraticCurveTo(canvas.width * 0.192, canvas.height * 0.604, canvas.width * 0.192, canvas.height * 0.279);
//           ctx.quadraticCurveTo(canvas.width * 0.192, canvas.height * 0.167, canvas.width * 0.283, canvas.height * 0.1);
//           ctx.quadraticCurveTo(canvas.width * 0.325, canvas.height * 0.1, canvas.width * 0.383, canvas.height * 0.188);
//           ctx.quadraticCurveTo(canvas.width / 2, canvas.height * 0.303, canvas.width * 0.617, canvas.height * 0.188);
//           ctx.quadraticCurveTo(canvas.width * 0.675, canvas.height * 0.13, canvas.width * 0.745, canvas.height * 0.1);
//           ctx.quadraticCurveTo(canvas.width * 0.812, canvas.height * 0.1, canvas.width * 0.923, canvas.height * 0.167);
//           ctx.quadraticCurveTo(canvas.width, canvas.height * 0.279, canvas.width * 0.808, canvas.height * 0.604);
//           ctx.lineTo(canvas.width * 0.558, canvas.height * 0.86);
//           ctx.lineTo(canvas.width / 2, canvas.height * 0.917);
//           ctx.closePath();
//           ctx.fill();
//         }

//         // Set the final image to the canvas data URL
//         setFinalImage(canvas.toDataURL('image/jpeg'));
//       };
//     }
//   };

//   return (
//     <div className="app-container">
//       {/* Add the SVG definition here */}
//       <svg width="0" height="0">
//         <defs>
//           <clipPath id="heart-shape" clipPathUnits="objectBoundingBox">
//             <path d="M0.5,0.917 L0.442,0.86 C0.192,0.604 0,0.435 0,0.279 C0,0.167 0.077,0.1 0.188,0.1 C0.255,0.1 0.325,0.13 0.383,0.188 L0.5,0.303 L0.617,0.188 C0.675,0.13 0.745,0.1 0.812,0.1 C0.923,0.1 1,0.167 1,0.279 C1,0.435 0.808,0.604 0.558,0.86 L0.5,0.917 Z"></path>
//           </clipPath>
//         </defs>
//       </svg>
      
//       <input type="file" accept="image/*" onChange={onSelectFile} />
//       {!finalImage && selectedImage && (
//         <div
//           className="crop-container"
//           style={{ width: containerSize.width, height: containerSize.height }}
//         >
//           <Cropper
//             image={selectedImage}
//             crop={crop}
//             zoom={zoom}
//             rotation={rotation}
//             aspect={1}
//             cropShape={cropShape === 'rect' ? 'rect' : 'rect'}
//             onCropChange={setCrop}
//             onZoomChange={setZoom}
//             style={{ containerStyle: { transform } }}
//           />
//           {cropShape === 'heart' && <div className="heart-shape-overlay"></div>}
//         </div>
//       )}
//       {!finalImage && selectedImage && (
//         <div className="controls-container">
//           <button onClick={() => handleFlip('horizontal')}>Flip Horizontal</button>
//           <button onClick={() => handleFlip('vertical')}>Flip Vertical</button>
//           <button onClick={() => handleRotation('left')}>Rotate Left</button>
//           <button onClick={() => handleRotation('right')}>Rotate Right</button>
//           <button onClick={() => setCropShape('rect')}>Rectangle</button>
//           <button onClick={() => setCropShape('heart')}>Heart</button>
//           <button onClick={() => setCropShape('round')}>Circle</button>
//           <button onClick={handleUpload}>Use this image</button>
//         </div>
//       )}
//       {finalImage && (
//         <div className="final-image-container">
//           <img src={finalImage} alt="Final" />
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
