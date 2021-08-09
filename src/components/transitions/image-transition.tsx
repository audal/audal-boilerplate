import React from "react";
import * as Chakra from "@chakra-ui/react";

interface ImageTransitionProps {
  images: string[];
  currentImageIndex: number;
}

export function ImageTransition({
  images,
  currentImageIndex,
}: ImageTransitionProps) {
  return (
    <Chakra.AspectRatio
      ratio={691 / 600}
      height="100%"
      width="100%"
      position="relative"
      transition="transform .5s"
      maxWidth={{ base: "100%", lg: "585px" }}
      maxHeight={{ base: "370px", lg: "668px" }}
      transform="scale(1.001)"
      _hover={{ transform: "scale(1.02)" }}
    >
      <Chakra.Box>
        {images.map((image, i) => (
          <Chakra.Image
            width="100%"
            height="100%"
            src={image}
            position={i === 0 ? "relative" : "absolute"}
            top="0"
            objectFit="contain"
            style={currentImageIndex === i ? { opacity: 1 } : { opacity: 0 }}
            transition="0.3s"
          />
        ))}
      </Chakra.Box>
    </Chakra.AspectRatio>
  );
}
