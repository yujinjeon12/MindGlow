'use client'

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { RootState } from '@/lib/store';
import { clearImageData, clearPaths } from '@/lib/features/canvas/CanvasSlice';
import ModalBase from '@/components/modal/ModalBase';

const WeatherOptions = [
  '☀️ 맑음',
  '☁️ 흐림',
  '🌤️ 구름많음',
  '☔️ 비',
  '🌩️ 천둥번개',
  '☃️ 눈',
];

const InputModal = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const imageData = useSelector((state: RootState) => state.CanvasReducer.imageData);

  // Local state for form fields
  const [weather, setWeather] = useState(WeatherOptions[0]);
  // Calculate today's date and use it as initial state
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = async () => {
    try {
      //이미지 데이터를 서버에 업로드
      const { data } = await axios.post('/api/uploadImage', { image: imageData });
      const imageUrl = data.url;

      //그림 이미지를 입력 데이터와 함께 DB에 저장
      await axios.post('/api/saveDiary', {
        title,
        weather,
        content,
        imageUrl
      });

      alert('일기가 저장되었습니다!'); // 저장 완료 알림
      dispatch(clearImageData());
      dispatch(clearPaths()); //clear canvas
      router.back();
    }catch (error) {
      console.error('Error saving diary:', error);
      alert('일기 저장 중 오류가 발생했습니다. 다시 시도해주세요.'); // 오류 발생 시 알림
    }
  }
  const handleCancel = () => {
    dispatch(clearImageData());
    router.back();
  }

  return (
    <ModalBase title='그림 완료! 이제 일기를 작성해보세요.'>
      <div className="space-y-4">
          {/* Date Picker */}
          <div>
            <label htmlFor="date" className="block text-gray-700">날짜</label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              id="date"
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm bg-light-gray dark:bg-cool-gray"
            />
          </div>

          {/* Weather Selector */}
          <div>
            <label htmlFor="weather" className="block text-gray-700">날씨</label>
            <div className="relative">
              <select
                id="weather"
                value={weather}
                onChange={(e) => setWeather(e.target.value)}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm appearance-none bg-light-gray dark:bg-cool-gray pr-8"
              >
                {WeatherOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm">
                ▾
              </span>
            </div>
          </div>

          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-gray-700">제목</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm bg-light-gray dark:bg-cool-gray"
              placeholder="제목을 입력해주세요."
            />
          </div>

          {/* Content Input */}
          <div>
            <label htmlFor="content" className="block text-gray-700">내용</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm bg-light-gray dark:bg-cool-gray"
              placeholder="내용을 입력해주세요."
              rows={4}
            />
          </div>

          {/* 취소/저장 버튼 */}
          <div className="text-right">
            <button
              onClick={handleCancel}
              className="bg-light-gray text-dark-gray mr-2 px-4 py-2 rounded-md shadow-md hover:bg-gray-400 focus:outline-none"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="bg-pink text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
            >
              등록
            </button>
          </div>
        </div>
    </ModalBase>
  );
};

export default InputModal;
