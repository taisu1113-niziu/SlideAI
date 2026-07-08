"use client";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Slide } from "@/types/slide";

type Props = {
  slide: Slide;
  index: number;
  currentSlide: number;
  onSelectSlide: (index: number) => void;
  onDeleteSlide: (index: number) => void;
  onDuplicateSlide: (index: number) => void;
  totalSlides: number;
};

export default function SortableSlideItem({
  slide,
  index,
  currentSlide,
  onSelectSlide,
  onDeleteSlide,
  onDuplicateSlide,
  totalSlides,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: slide.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-lg border p-3 ${
        currentSlide === index
          ? "bg-blue-100 border-blue-500"
          : "bg-white"
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab text-xs text-gray-400 mb-2"
      >
        ☰ Slide {index + 1}
      </div>

      <button
        onClick={() => onSelectSlide(index)}
        className="w-full text-left"
      >
        <div className="font-semibold truncate">
          {slide.title}
        </div>
      </button>

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => onDuplicateSlide(index)}
          className="flex-1 rounded bg-blue-500 py-2 text-sm text-white hover:bg-blue-600"
        >
          📄
        </button>

        {totalSlides > 1 && (
          <button
            onClick={() => onDeleteSlide(index)}
            className="flex-1 rounded bg-red-500 py-2 text-sm text-white hover:bg-red-600"
          >
            🗑️
          </button>
        )}
      </div>
    </div>
  );
}