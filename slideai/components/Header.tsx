type HeaderProps = {
  onExport?: () => void;
};

export default function Header({ onExport }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm shrink-0">
      <h1 className="text-2xl font-bold text-blue-600">
        SlideAI
      </h1>

      <button
        onClick={onExport}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
      >
        📥 PowerPointを書き出す
      </button>
    </header>
  );
}