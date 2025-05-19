"use client";

import { useState, useEffect } from "react";
import "./PictureCarousel.css";
import CommentSection from "./CommentSection/CommentSection";

// game plan

// 1. Look through code for how picture is being selected
// 2. create comment section
// CommentsContainer component
// useEffect loads comments based on imageId
// renders a list of comments
// Comment component
// renders message
// if hasComments is true, render more comments
// 3. add extra features + optimize

const PictureCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [images, setImages] = useState([
    {
      id: 1,
      url: "https://picsum.photos/800/600?random=1",
      title: "Beautiful Sunset",
    },
    {
      id: 2,
      url: "https://picsum.photos/800/600?random=2",
      title: "Mountain View",
    },
    {
      id: 3,
      url: "https://picsum.photos/800/600?random=3",
      title: "Ocean Waves",
    },
  ]);

  // Initialize comments for each image
  useEffect(() => {
    const initialComments = {};
    images.forEach((image) => {
      initialComments[image.id] = [];
    });
    setComments(initialComments);
  }, [images]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const currentImageId = images[currentIndex].id;
    const comment = {
      id: Date.now(),
      text: newComment,
      timestamp: new Date().toISOString(),
    };

    setComments((prev) => ({
      ...prev,
      [currentImageId]: [...prev[currentImageId], comment],
    }));

    setNewComment("");
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        <button className="nav-button prev" onClick={handlePrev}>
          &lt;
        </button>

        <div className="image-container">
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].title}
            className="carousel-image"
          />
          <div className="image-title">{images[currentIndex].title}</div>
        </div>

        <button className="nav-button next" onClick={handleNext}>
          &gt;
        </button>
      </div>
      <CommentSection imageId={1} />
    </div>
  );
};

export default PictureCarousel;
