'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import BeatLoader from 'react-spinners/BeatLoader';

import { MdEdit } from "react-icons/md";

import { Diary } from '@/types/types';
import { useSession } from 'next-auth/react';
import EditModal from './EditModal'
import DetailModal from './DetailModal';

const DiaryList = () => {
  const { data: session } = useSession();

  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    idProps: 0,
    titleProps: '',
    contentProps: '',
    dateProps: '',
    weatherProps: '',
    imgProps: ''
  });

  const getDiaries = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/diaries'); // API 호출
      const data = await response.json();
      setDiaries(data.diaries);
    } catch (error) {
      alert('일기를 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDiaries();
  }, []);

  const showDiary = (id: number, title:string, weather:string, date:string, content:string, img: string) => {
    setModalData({
      idProps: id,
      titleProps: title,
      weatherProps: weather,
      dateProps: date,
      contentProps: content,
      imgProps: img
    });
    // 상태 업데이트가 끝난 후 실행되도록 setTimeout 사용
    setTimeout(() => {
      setDetailModalOpen(true);
    }, 0);
  };
  
  const editDiary = (event: React.MouseEvent<SVGElement, MouseEvent>, id: number, title:string, weather:string, date:string, content:string) => {
    event.stopPropagation(); // 클릭 이벤트 전파 차단
    setModalData({
      idProps: id,
      titleProps: title,
      weatherProps: weather,
      dateProps: date,
      contentProps: content,
      imgProps: ''
    });
    // 상태 업데이트가 끝난 후 실행되도록 setTimeout 사용
    setTimeout(() => {
      setEditModalOpen(true);
    }, 0);
  };

  return (
    loading ? 
      <div className='mt-16'><BeatLoader size={12} color={"#D05A68"} /></div> :
      <div className="grid gap-2 my-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {diaries?.map((diary) => (
          <div
            key={diary.id}
            className="flex flex-col items-center p-2 bg-light-gray dark:bg-cool-gray rounded-sm shadow-sm cursor-pointer"
            onClick={() => showDiary(diary.id, diary.title, diary.weather, diary.createdAt.toString(), diary.content, diary.imageUrl)}
          >
            <Image
              src={diary.imageUrl || '/default-image.jpg'} // 기본 이미지 경로 설정
              alt="diary image"
              width={300}
              height={300}
              className="rounded-sm h-full pb-2"
              priority
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/GLFPkQAAAAASUVORK5CYII="
            />
            <p className="text-sm text-left pr-4 truncate w-full text-dark-gray dark:text-white relative">
              {diary.weather}, {diary.title}
              {/* 일기 작성자일 경우에만 수정 아이콘 표시 */}
              {diary.userId === session?.user?.id && (
                <MdEdit 
                  className='absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer'
                  onClick={(event) => editDiary(event, diary.id, diary.title, diary.weather, diary.createdAt.toString(), diary.content)}
                />
              )}
            </p>
          </div>
        ))}
        <DetailModal 
          modalOpen={detailModalOpen} 
          setModalOpen={setDetailModalOpen} 
          modalData={modalData}
          getDiaries={getDiaries}
        />
        <EditModal 
          modalOpen={editModalOpen} 
          setModalOpen={setEditModalOpen} 
          modalData={modalData}
          getDiaries={getDiaries}
        />
      </div>
  );
};

export default DiaryList;
