"use client";

type RightPanelProps = {
  onAddImage: (file: File) => void;
};

export default function RightPanel({
  onAddImage,
}: RightPanelProps) {
  function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    onAddImage(file);

    // 同じ画像も選択できるようにする
    e.target.value = "";
  }

  return (
    <aside className="w-60 bg-white border-l p-5 shrink-0 overflow-y-auto">

      <h2 className="font-bold text-lg mb-5">
        編集
      </h2>

      <div className="space-y-4">

        <button className="w-full rounded-lg bg-gray-100 py-3 hover:bg-gray-200 transition">
          🎨 デザイン
        </button>

        <label className="block cursor-pointer w-full rounded-lg bg-gray-100 py-3 text-center hover:bg-gray-200 transition">
          🖼️ 画像追加

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>

        <button className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700 transition">
          📥 PPTX出力
        </button>

      </div>

    </aside>
  );
}