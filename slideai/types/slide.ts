export type SlideElement = {
  id: string;
  type: "image";
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Slide = {
  id: string;
  title: string;
  bullets: string[];
  elements: SlideElement[];
};