'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';

import ModalBase from '@/components/modal/ModalBase';

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (x: boolean) => void;
  modalData: {
    idProps: number,
    titleProps: string;
    weatherProps: string;
    dateProps: string;
    contentProps: string;
    imgProps: string
  }
  getDiaries:  () => void;
}

const DetailModal = ({ modalOpen, setModalOpen, modalData, getDiaries }: ModalProps) => {
  const [weather, setWeather] = useState(modalData.weatherProps);
  const [date, setDate] = useState(modalData.dateProps);
  const [title, setTitle] = useState(modalData.titleProps);
  const [content, setContent] = useState(modalData.contentProps);
  const [imgURL, setImgURL] = useState(modalData.imgProps);

  useEffect(() => {
    // Update the state when modalData changes
    const dateString = modalData.dateProps // 기존 날짜 값
    const dateObject = new Date(dateString); // Date 객체로 변환
    const formattedDate = !isNaN(dateObject.getTime()) ? dateObject.toISOString().split('T')[0] : "";

    setWeather(modalData.weatherProps);
    setDate(formattedDate);
    setTitle(modalData.titleProps);
    setContent(modalData.contentProps);
    setImgURL(modalData.imgProps);
  }, [modalData]);

  const closeModal = () => {
    setModalOpen(false);
  }  

  return (
    modalOpen &&
    <ModalBase title='일기 상세보기' closeModal={closeModal}>
      <div className='space-y-4'>
        {/* Date Picker */}
        <p className='text-lg font-bold'>{title}</p>
        <div>
          <p className='mb-4'>{date}, {weather}</p>
          <div className="relative w-full h-24 md:h-60 lg:h-80">
            <Image 
              src={imgURL}
              fill
              sizes="100vw"
              priority
              alt="diary image"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/GLFPkQAAAAASUVORK5CYII="
              style={{ objectFit: 'contain' }}
            />
          </div>
          <p className='mt-4'>{content}</p>
        </div>
      </div>
    </ModalBase>
  );
};

export default DetailModal;
