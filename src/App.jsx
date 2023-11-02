import { useState } from "react";
import "./App.css";

function App() {
  const images = [
    { id: 1, src: "../src/assets/image-1.webp" },
    { id: 2, src: "../src/assets/image-2.webp" },
    { id: 3, src: "../src/assets/image-3.webp" },
    { id: 4, src: "../src/assets/image-4.webp" },
    { id: 5, src: "../src/assets/image-5.webp" },
    { id: 6, src: "../src/assets/image-6.webp" },
    { id: 7, src: "../src/assets/image-7.webp" },
    { id: 8, src: "../src/assets/image-8.webp" },
    { id: 9, src: "../src/assets/image-9.webp" },
    { id: 10, src: "../src/assets/image-10.jpeg" },
    { id: 11, src: "../src/assets/image-11.jpeg" },
  ];
  const [imageList, setImageList] = useState(images);
  const [selectedImages, setSelectedImages] = useState([]);
  // const [featureImage, setFeatureImage] = useState(imageList[0]);

  const handleImageClick = (image) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(
        selectedImages.filter((selected) => selected !== image)
      );
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  const handleFirstImageClick = () => {
    if (selectedImages.includes(imageList[0])) {
      setSelectedImages(
        selectedImages.filter((selected) => selected !== imageList[0])
      );
    } else {
      setSelectedImages([imageList[0], ...selectedImages]);
    }
  };

  const handleDeleteImages = () => {
    const filteredImages = imageList.filter(
      (image) => !selectedImages.includes(image)
    );
    setImageList(filteredImages);
    setSelectedImages([]);
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, id) => {
    const draggedId = e.dataTransfer.getData("text/plain");
    const draggedImage = imageList.find(
      (image) => image.id === parseInt(draggedId, 10)
    );
    const droppedImage = imageList.find(
      (image) => image.id === parseInt(id, 10)
    );

    const draggedImageIndex = imageList.indexOf(draggedImage);
    const droppedImageIndex = imageList.indexOf(droppedImage);

    const updatedImageList = [...imageList];
    updatedImageList[draggedImageIndex] = droppedImage;
    updatedImageList[droppedImageIndex] = draggedImage;

    setImageList(updatedImageList);
  };

  return (
    <div className="container mx-auto p-4 bg-white">
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-2 sm:mb-0">
          <h4 className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">{`Selected Items: ${selectedImages.length}`}</h4>
        </div>
        <div>
          <h3>Gallery</h3>
        </div>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDeleteImages}>
          Delete Item
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
        <div
          className="row-span-2 col-span-2 border text-center image-container"
          onClick={handleFirstImageClick}
          draggable
          onDragStart={(e) => handleDragStart(e, imageList[0].id)}
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, imageList[0].id)}
        >
          <img
            src={imageList[0].src}
            alt={`Image ${imageList[0].id}`}
            className="w-full h-auto"
          />
          <div className="overlay absolute">
            <input
              type="checkbox"
              className="m-2 relative bottom-[450px]"
              checked={selectedImages.includes(imageList[0])}
              onChange={handleFirstImageClick}
            />
          </div>
        </div>
        {imageList.slice(1).map((image) => (
          <div
            key={image.id}
            className="image-container"
            onClick={() => handleImageClick(image)}
            draggable
            onDragStart={(e) => handleDragStart(e, image.id)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, image.id)}
          >
            <img
              src={image.src}
              alt={`Image ${image.id}`}
              className="w-full h-auto border"
            />
            <div className="overlay absolute">
              <input
                type="checkbox"
                className="m-2 relative bottom-[220px]"
                checked={selectedImages.includes(image)}
                onChange={() => handleImageClick(image)}
              />
            </div>
          </div>
        ))}
        <div className="image-container add-image border flex justify-center items-center">
          <span>Add Image</span>
        </div>
      </div>
    </div>
  );
}

export default App;
