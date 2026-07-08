"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AIPage() {
  const router = useRouter();

  const [theme, setTheme] = useState("");
  const [slides, setSlides] = useState("5");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!theme.trim()) {
      alert("テーマを入力してください。");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          theme,
          slides,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "AI生成に失敗しました。");
        console.error(data);
        return;
      }

      sessionStorage.setItem("theme", theme);
      sessionStorage.setItem(
        "slides",
        JSON.stringify(data.slides)
      );

      router.push("/result");
    } catch (error) {
      console.error(error);
      alert("AI生成に失敗しました。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">

        <h1 className="text-3xl font-bold mb-8 text-center">
          ✨ AIでプレゼン作成
        </h1>

        <div className="space-y-6">

          <div>
            <label className="font-semibold block mb-2">
              テーマ
            </label>

            <input
              type="text"
              placeholder="例：地球温暖化"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">
              スライド枚数
            </label>

            <select
              value={slides}
              onChange={(e) => setSlides(e.target.value)}
              className="w-full border rounded-lg p-3"
            >
              <option value="5">5枚</option>
              <option value="10">10枚</option>
              <option value="15">15枚</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? "生成中..." : "🚀 生成する"}
          </button>

        </div>

      </div>
    </main>
  );
}