"use client";

import Header from "@/components/Header";
import SlideSidebar from "@/components/SlideSidebar";
import SlideCanvas from "@/components/SlideCanvas";
import RightPanel from "@/components/RightPanel";

import { useSlides } from "@/hooks/useSlides";
import { Slide } from "@/types/slide";

import { arrayMove } from "@dnd-kit/sortable";
import { DragEndEvent } from "@dnd-kit/core";

export default function ResultPage() {
  const {
    slides,
    setSlides,
    currentSlide,
    setCurrentSlide,
  } = useSlides();

  function handleTitleChange(title: string) {
    const updatedSlides = [...slides];

    updatedSlides[currentSlide] = {
      ...updatedSlides[currentSlide],
      title,
    };

    setSlides(updatedSlides);
  }

  function handleBulletChange(index: number, value: string) {
    const updatedSlides = [...slides];

    const bullets = [...updatedSlides[currentSlide].bullets];
    bullets[index] = value;

    updatedSlides[currentSlide] = {
      ...updatedSlides[currentSlide],
      bullets,
    };

    setSlides(updatedSlides);
  }

  function handleAddSlide() {
    const newSlide: Slide = {
      id: crypto.randomUUID(),
      title: "新しいスライド",
      bullets: ["内容を入力してください", "", ""],
      elements: [],
    };

    const updatedSlides = [...slides, newSlide];

    setSlides(updatedSlides);
    setCurrentSlide(updatedSlides.length - 1);
  }

  function handleDeleteSlide(index: number) {
    if (slides.length <= 1) return;

    const updatedSlides = slides.filter((_, i) => i !== index);

    setSlides(updatedSlides);

    if (currentSlide === index) {
      setCurrentSlide(Math.max(0, index - 1));
    } else if (currentSlide > index) {
      setCurrentSlide(currentSlide - 1);
    }
  }

  function handleDuplicateSlide(index: number) {
    const slide = slides[index];

    const copiedSlide: Slide = {
      ...slide,
      id: crypto.randomUUID(),
      title: `${slide.title}（コピー）`,
      bullets: [...slide.bullets],
      elements: slide.elements.map((element) => ({
        ...element,
        id: crypto.randomUUID(),
      })),
    };

    const updatedSlides = [...slides];
    updatedSlides.splice(index + 1, 0, copiedSlide);

    setSlides(updatedSlides);
    setCurrentSlide(index + 1);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = slides.findIndex((slide) => slide.id === active.id);
    const newIndex = slides.findIndex((slide) => slide.id === over.id);

    const reorderedSlides = arrayMove(slides, oldIndex, newIndex);

    setSlides(reorderedSlides);

    if (currentSlide === oldIndex) {
      setCurrentSlide(newIndex);
    }
  }

  return (
    <main className="h-screen flex flex-col bg-slate-100">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <SlideSidebar
          slides={slides}
          currentSlide={currentSlide}
          onSelectSlide={setCurrentSlide}
          onAddSlide={handleAddSlide}
          onDeleteSlide={handleDeleteSlide}
          onDuplicateSlide={handleDuplicateSlide}
          onDragEnd={handleDragEnd}
        />

        <SlideCanvas
          slide={slides[currentSlide]}
          onTitleChange={handleTitleChange}
          onBulletChange={handleBulletChange}
        />

        <RightPanel />
      </div>
    </main>
  );
}