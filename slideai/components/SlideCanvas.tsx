import { Slide } from "@/types/slide";

type SlideCanvasProps = {
  slide?: Slide;
  onTitleChange?: (title: string) => void;
  onBulletChange?: (index: number, value: string) => void;
};

export default function SlideCanvas({
  slide,
  onTitleChange,
  onBulletChange,
}: SlideCanvasProps) {
  if (!slide) {
    return (
      <section className="flex-1 flex justify-center items-center p-6">
        <div className="text-gray-500 text-xl">
          スライドがありません
        </div>
      </section>
    );
  }

  return (
    <section className="flex-1 flex justify-center items-center overflow-auto p-6">
      <div
        className="relative bg-white rounded-xl shadow-2xl aspect-video w-full max-w-5xl p-10 overflow-hidden"
      >
        {/* タイトル */}
        <input
          type="text"
          value={slide.title}
          onChange={(e) => onTitleChange?.(e.target.value)}
          className="w-full text-4xl font-bold mb-10 outline-none border-b-2 border-transparent focus:border-blue-500 transition"
        />

        {/* 箇条書き */}
        <div className="space-y-4">
          {slide.bullets.map((bullet, index) => (
            <input
              key={index}
              type="text"
              value={bullet}
              onChange={(e) =>
                onBulletChange?.(index, e.target.value)
              }
              className="w-full text-xl outline-none border-b border-transparent focus:border-blue-400 py-1"
            />
          ))}
        </div>

        {/* 画像 */}
        {slide.elements
          .filter((element) => element.type === "image")
          .map((element) => (
            <img
              key={element.id}
              src={element.src}
              alt=""
              className="absolute rounded-lg shadow-lg object-cover"
              style={{
                left: element.x,
                top: element.y,
                width: element.width,
                height: element.height,
              }}
            />
          ))}
      </div>
    </section>
  );
}