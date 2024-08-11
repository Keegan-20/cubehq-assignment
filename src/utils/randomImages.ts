// src/utils/randomImages.ts

export const generateRandomPhotos = (count: number): string[] => {
    return Array.from({ length: count }, () => `https://picsum.photos/200/200?random=${Math.random()}`);
  };