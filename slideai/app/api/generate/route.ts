import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { theme, slides } = await req.json();

    const prompt = `
あなたは優秀なプレゼン資料作成AIです。

テーマ: ${theme}
スライド枚数: ${slides}

以下のJSON形式だけを返してください。
説明文やコードブロック(\`\`\`)は絶対に付けないでください。

{
  "slides": [
    {
      "title": "タイトル",
      "bullets": [
        "箇条書き1",
        "箇条書き2",
        "箇条書き3"
      ]
    }
  ]
}

ルール
・スライド数は必ず${slides}枚
・1枚目は表紙
・最後はまとめ
・各スライドは3〜5個の箇条書き
・日本語で作成
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text ?? "";

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let json;

    try {
      json = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        {
          error: "AIがJSON形式で返しませんでした。",
          raw: cleaned,
        },
        { status: 500 }
      );
    }

    // 新しいSlide型へ変換
    const convertedSlides = json.slides.map((slide: any) => ({
      id: crypto.randomUUID(),
      title: slide.title,
      bullets: slide.bullets,
      elements: [],
    }));

    return NextResponse.json({
      slides: convertedSlides,
    });

  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}