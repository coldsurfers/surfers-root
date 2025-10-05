'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { StyledLandingImageContainer } from './landing-image.styled';

export function LandingImage({ imageUrls }: { imageUrls: string[] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  // State to track image cycling
  const [isImageCycling, setIsImageCycling] = useState(false);

  // Handle mouse move to update mouse position
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;

    // Calculate rotations based on mouse position relative to window center
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Calculate rotation angles
    const rotX = ((clientY - centerY) / centerY) * 15; // Vertical tilt, max 15 degrees
    const rotY = ((clientX - centerX) / centerX) * 15; // Horizontal tilt, max 15 degrees

    // Smoothly update rotation states
    setRotateX(-rotX);
    setRotateY(rotY);
  }, []);

  // Handle image click to manually cycle images
  const handleImageClick = useCallback(() => {
    setIsImageCycling(true);
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);

    // Reset cycling state after a short delay
    setTimeout(() => {
      setIsImageCycling(false);
    }, 600);
  }, [imageUrls.length]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  // Automatically cycle images every 4 seconds
  useEffect(() => {
    const imageCycleInterval = setInterval(() => {
      setIsImageCycling(true);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);

      // Reset cycling state after a short delay
      setTimeout(() => {
        setIsImageCycling(false);
      }, 600); // Match this with your transition duration
    }, 5000); // 4 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(imageCycleInterval);
  }, [imageUrls.length]);

  return (
    <StyledLandingImageContainer>
      <motion.div
        animate={{
          rotateX: rotateX, // Apply dynamic X-axis rotation
          rotateY: rotateY, // Apply dynamic Y-axis rotation
          scale: isImageCycling ? 0.9 : 1, // Slight scale down during image change
          opacity: isImageCycling ? 0.8 : 1, // Slight opacity change
        }}
        transition={{
          type: 'spring',
          stiffness: 50, // Lower stiffness for smoother movement
          damping: 5, // Lower damping for more responsive tracking
        }}
        style={{
          transformPerspective: 1000, // Add perspective for 3D effect
        }}
        onClick={handleImageClick}
      >
        <Image
          width={500}
          height={500}
          src={imageUrls[currentImageIndex]}
          alt="Landing Image"
          priority
          style={{
            width: '100%',
            height: '100%',
            aspectRatio: '1 / 1',
            objectFit: 'contain',
          }}
        />
      </motion.div>
    </StyledLandingImageContainer>
  );
}
