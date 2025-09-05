import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { supabase } from "@/lib/supabase";

type RecordType = {
  title: string
  time: number,
}

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  // フォームの状態管理
  const [title, setTitle] = useState("")
  const [time, setTime] = useState(0)

  // レコードの状態管理
  const [records, setRecords] = useState<RecordType[]>([]);

  // 学習時間の合計値
  const sum = records.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.time;
  }, 0);

  // レコードに学習記録を追加する
  const onSubmit = () => {

    if (title === "" || time <= 0) { return }

    const newRecord: RecordType = {
      title,
      time
    }

    setRecords(prev => [...prev, newRecord]);
    setTitle("");
    setTime(0);
  }

  return (
    <div className="bg-gray-100 min-h-svh flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm md:max-w-3xl">
        {/* ヘッダー部 */}
        <div className="">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">学習記録一覧</h1>
        </div>

        {/* 記録一覧部分 */}
        <div className="mt-6 space-y-3 bg-white border rounded-lg p-4">
          {records.length === 0 ? (
            <div className="text-gray-500 text-center">まだ学習記録がありません</div>
          ) : (
            records.map((record) => (
              <div key={`${record.title}-${record.time}`} className="">
                <h3 className="font-medium">{record.title}</h3>
                <p className="text-gray-600">{record.time}時間</p>
              </div>
            ))
          )}
        </div>
Bell250708
        {/* form 部分 */}
        <div className="mt-6 bg-white border rounded-lg p-6">

          {/* 学習内容入力 */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              学習内容
            </label>
            <input
              type="text"
              className="border rounded px-3 py-1 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* 学習時間入力 */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              学習時間（時間）
            </label>
            <input
              type="number"
              className="border rounded px-3 py-1 w-full"
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
            />
          </div>

          {/* 入力値の確認表示 */}
          <div className="bg-gray-50 p-3 rounded text-sm mb-4">
            現在の入力: 学習内容「{title}」、時間「{time}」、合計時間「{sum}」
          </div>

          {/* 登録ボタン */}
          <button
            onClick={onSubmit}
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            登録
          </button>
        </div>
      </div>
    </div>
  );
}
