"use client";

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Slide } from "@/types/slide";
import SortableSlideItem from "./SortableSlideItem";

type SlideSidebarProps = {
  slides: Slide[];
  currentSlide: number;
  onSelectSlide: (index: number) => void;
  onAddSlide: () => void;
  onDeleteSlide: (index: number) => void;
  onDuplicateSlide: (index: number) => void;
  onDragEnd: (event: any) => void;
};

export default function SlideSidebar({
  slides,
  currentSlide,
  onSelectSlide,
  onAddSlide,
  onDeleteSlide,
  onDuplicateSlide,
  onDragEnd,
}: SlideSidebarProps) {
  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  return (
    <aside className="w-60 bg-white border-r overflow-y-auto p-4 shrink-0">
      <h2 className="font-bold text-lg mb-4">
        スライド一覧
      </h2>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={slides.map((slide) => slide.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {slides.map((slide, index) => (
              <SortableSlideItem
                key={slide.id}
                slide={slide}
                index={index}
                currentSlide={currentSlide}
                onSelectSlide={onSelectSlide}
                onDeleteSlide={onDeleteSlide}
                onDuplicateSlide={onDuplicateSlide}
                totalSlides={slides.length}
              />
            ))}

            <button
              onClick={onAddSlide}
              className="w-full rounded-lg border-2 border-dashed border-blue-400 py-6 text-blue-600 font-bold hover:bg-blue-50 transition"
            >
              ＋ 新しいスライド
            </button>
          </div>
        </SortableContext>
      </DndContext>
    </aside>
  );
}