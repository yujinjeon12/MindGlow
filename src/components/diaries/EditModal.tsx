'use client'

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation'
import axios from 'axios';

import { clearImageData } from '@/lib/features/canvas/CanvasSlice';
import ModalBase from '@/components/modal/ModalBase';

const WeatherOptions = [
  '☀️ 맑음',
  '☁️ 흐림',
  '🌤️ 구름많음',
  '☔️ 비',
  '🌩️ 천둥번개',
  '☃️ 눈',
];

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (x: boolean) => void;
  modalData: {
    idProps: number,
    titleProps: string;
    weatherProps: string;
    dateProps: string;
    contentProps: string;
  }
  getDiaries:  () => void;
}

const EditModal = ({ modalOpen, setModalOpen, modalData, getDiaries }: ModalProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(modalData.idProps);
  const [weather, setWeather] = useState(modalData.weatherProps);
  const [date, setDate] = useState(modalData.dateProps);
  const [title, setTitle] = useState(modalData.titleProps);
  const [content, setContent] = useState(modalData.contentProps);

  useEffect(() => {
    // Update the state when modalData changes
    const dateString = modalData.dateProps // 기존 날짜 값
    const dateObject = new Date(dateString); // Date 객체로 변환
    const formattedDate = !isNaN(dateObject.getTime()) ? dateObject.toISOString().split('T')[0] : "";

    setId(modalData.idProps);
    setWeather(modalData.weatherProps);
    setDate(formattedDate);
    setTitle(modalData.titleProps);
    setContent(modalData.contentProps);
  }, [modalData]);

  const handleSave = async () => {
    if(isLoading) return; // 이미 로딩 중이면 함수 종료
    setIsLoading(true); //로딩 시작
    try {
      //그림 이미지를 입력 데이터와 함께 DB에 저장
      const response = await axios.put('/api/editDiary', {
        id, // 다이어리 ID를 전달합니다.
        title,
        weather,
        date,
        content,
      });

      getDiaries();
      setModalOpen(false);
      alert('일기가 수정되었습니다.');
    }catch (error) {
      alert('일기 저장 중 오류가 발생했습니다. 다시 시도해주세요.'); // 오류 발생 시 알림
    } finally {
      setIsLoading(false); //로딩 끝
    }
  }
  const handleCancel = () => {
    dispatch(clearImageData());
    setModalOpen(false);
  }
  const closeModal = () => {
    setModalOpen(false);
  }
  const handleDeleteDiary = async (diaryId: number) => {
    if (confirm('이 일기를 정말 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.')) {
      try {
        const response = await axios.delete('/api/deleteDiary', {
          data: { diaryId },
        });
  
        getDiaries();
        setModalOpen(false);  
        alert(response.data.message);
      } catch (error) {
        alert('일기 삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };
  

  return (
    modalOpen &&
    <ModalBase title='일기 수정하기' closeModal={closeModal}>
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

        <div className="flex justify-between items-end">
          <span
            className="text-red-500 underline cursor-pointer"
            onClick={() => handleDeleteDiary(id)}
          >
            삭제하기
          </span>

          <div> {/* 버튼들을 묶은 div */}
            <button
              onClick={handleCancel}
              className="bg-light-gray text-dark-gray mr-2 px-4 py-2 rounded-md shadow-md hover:bg-gray-400 focus:outline-none"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className={`text-white px-4 py-2 rounded-md shadow-md focus:outline-none bg-pink ${isLoading ? 'cursor-default opacity-50' : ''}`}
            >
              {isLoading ? '처리 중...' : '수정'}
            </button>
          </div>
        </div>
      </div>
    </ModalBase>
  );
};

export default EditModal;
