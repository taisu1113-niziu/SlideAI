"use client";

import { useEffect, useState } from "react";
import { Slide } from "@/types/slide";

export function useSlides() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // 初回読み込み
  useEffect(() => {
    const savedSlides = sessionStorage.getItem("slides");

    if (savedSlides) {
      setSlides(JSON.parse(savedSlides));
    }
  }, []);

  // 自動保存
  useEffect(() => {
    if (slides.length > 0) {
      sessionStorage.setItem("slides", JSON.stringify(slides));
    }
  }, [slides]);

  return {
    slides,
    setSlides,
    currentSlide,
    setCurrentSlide,
  };
}