export type SlideElement = {
  id: string;
  type: "title" | "bullet" | "image";

  x: number;
  y: number;
  width: number;
  height: number;

  content: string;
};

export type Slide = {
  id: string;
  title: string;
  bullets: string[];

  elements: SlideElement[];
};