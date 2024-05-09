import React, { useState } from "react";
import Image from "next/image";
import * as faceapi from "face-api.js";
import Dropzone from "react-dropzone";

const AvatarCreator = () => {
  const runFaceDetection = async (imageUrl: string) => {
    //models
    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri("./models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
      faceapi.nets.ageGenderNet.loadFromUri("./models"),
    ]);

    //face
    const img = await faceapi.fetchImage(imageUrl);
    let faceAIdata = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors().withAgeAndGender();

    //canvas
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    //canvas.style.left = img?.offsetLeft;
    //canvas.style.top = img?.offsetTop;
    canvas.height = img?.height;
    canvas.width = img?.width;

    //draw canvas on face
    faceAIdata = faceapi.resizeResults(faceAIdata, img);
    faceapi.draw.drawDetections(canvas, faceAIdata);

    // Draw landmarks on canvas
    faceAIdata.forEach(faceAIdata => {
      const landmarks = faceAIdata.landmarks;
      faceapi.draw.drawFaceLandmarks(canvas, landmarks);
    });
  };

  const [uploadedImage, setUploadedImage] = useState<any>();
  const handleImageUpload = async (files: any) => {
    const imageFile = files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setUploadedImage(imageUrl);
    runFaceDetection(imageUrl);
  };

  return (
    <div>
      <canvas id="canvas"></canvas>
      <Image
        id="face"
        src={uploadedImage}
        alt="dummy image"
        priority={true}
        width="1000"
        height="1000"
        className="object-cover object-left-top w-[40%] -bottom-10 inset-x-0 rounded-xl"
      />
      <Dropzone onDrop={handleImageUpload}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag & drop a photo here, or click to select a photo</p>
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default AvatarCreator;
