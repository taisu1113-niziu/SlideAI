export default function RightPanel() {
  return (
    <aside className="w-60 bg-white border-l p-5 shrink-0 overflow-y-auto">

      <h2 className="font-bold text-lg mb-5">
        編集
      </h2>

      <div className="space-y-4">

        <button className="w-full rounded-lg bg-gray-100 py-3 hover:bg-gray-200 transition">
          🎨 デザイン
        </button>

        <button className="w-full rounded-lg bg-gray-100 py-3 hover:bg-gray-200 transition">
          🖼️ 画像追加
        </button>

        <button className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700 transition">
          📥 PPTX出力
        </button>

      </div>

    </aside>
  );
}