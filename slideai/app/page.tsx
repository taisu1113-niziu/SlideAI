import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl p-10">
        <h1 className="text-6xl font-bold text-center mb-4">
          SlideAI
        </h1>

        <p className="text-center text-gray-600 mb-12">
          AIでプレゼン資料をもっと簡単に
        </p>

        <div className="grid gap-6">
          <Link href="/ai">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold py-6 rounded-2xl transition">
              ✨ AIで作る
            </button>
          </Link>

          <Link href="/editor">
            <button className="w-full bg-white hover:bg-gray-50 border text-xl font-semibold py-6 rounded-2xl transition">
              📝 自分で作る
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}