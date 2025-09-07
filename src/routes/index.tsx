import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import type { Tables } from "@/types/database.types";
import { createRecords, deleteRecords, getRecords } from './querys';

type RecordType = Tables<"study_record">;

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  // フォームの状態管理
  const [formData, setFormData] = useState({title : "", time : 0});
  // レコードの状態管理
  const [records, setRecords] = useState<RecordType[]>([]);
  const [loading, setLoading] = useState<{fetch : boolean; submit: boolean}>({fetch : false, submit : false});
  // エラー状態の管理
  const [error , setError] = useState<string>("");


  // 学習時間の合計値
  const sum = records.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.time;
  }, 0);

  // レコードに学習記録を追加する
  const onCreate = async () => {

    if (formData.title === "" || formData.time <= 0) { return }

    setLoading(prev => ({...prev, submit : true}));

    
    const result = await createRecords(formData);

    if (typeof result !== "string") {
      setRecords(prev => [result, ...prev]);
      setFormData({title : "", time : 0});
    } else {
      setError(result);
    }
    setLoading(prev => ({...prev, submit : false}))
    return
  }

  // 学習記録を削除
  const onDelete = async(id : string) => {
    if (!id) { return };
    setLoading(prev => ({...prev, submit : true}));

    const result = await deleteRecords(id);

    if (typeof result !== "string") {
      const newRecords = records.filter(record => record.id !== result.id);
      setRecords(newRecords);
    } else {
      setError(result);
    }
    setLoading(prev => ({...prev, submit : false}));
    return;
  }

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(prev => ({...prev, fetch : true}));

      const result = await getRecords();
      if (typeof result !== "string") {
        setRecords(result);
      } else {
        setError(result);
      }
      setLoading(prev => ({...prev, fetch : false}));
    }
    fetchRecords();
  },[])

  return (
    <div className="bg-gray-100 min-h-svh flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm md:max-w-3xl">
        {/* ヘッダー部 */}
        <div className="">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">学習記録一覧</h1>
        </div>

        {/* 記録一覧部分 */}
        {loading.fetch ? (
          <div className='mt-6 space-y-3 bg-white border rounded-lg p-4'>
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bulue-600 mr-3"/>
              <span className='text-gray-600'>読込中...</span>
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-3 bg-white border rounded-lg p-4">
          {records.length === 0 ? (
            <div className="text-gray-500 text-center border-3">まだ学習記録がありません</div>
          ) : (
            records.map((record) => (
              <div key={`${record.title}-${record.time}`} className="flex items-center space-x-1.5">
                <h3 className="border-1 font-medium">{record.title}</h3>
                <p className="text-gray-600 border-1">{record.time}時間</p>
                <button type="submit" className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 border-1' onClick={() => onDelete(record.id)} disabled={loading.submit} >削除</button>
              </div>
            ))
          )}
        </div>
        )}
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
              value={formData.title}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                title : e.target.value
              }))}
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
              value={formData.time}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                time : parseInt(e.target.value)
              }))}
            />
          </div>

          {/* 入力値の確認表示 */}
          <div className="bg-gray-50 p-3 rounded text-sm mb-4">
            現在の入力: 学習内容「{formData.title}」、時間「{formData.time}」、合計時間「{sum}」
          </div>

          {/* 登録ボタン */}
          <button
            onClick={onCreate}
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            disabled={loading.submit}
          >
            登録
          </button>
        </div>
        {error ? (
          <div className="">{error}</div>
        ) : null}
      </div>
    </div>
  );
}
