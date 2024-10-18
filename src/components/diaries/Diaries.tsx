'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Diary } from '@/types/types';

const DiaryList = () => {
    const [diaries, setDiaries] = useState<Diary[]>([]);

    useEffect(() => {
        const getDiaries = async () => {
            try {
                const response = await fetch('/api/diaries'); // API 호출
                const data = await response.json();
                setDiaries(data.diaries);
            } catch (error) {
                console.error('Error fetching diaries:', error);
            }
        };

        getDiaries();
    }, []);

    return (
        <div className="grid gap-2 my-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {diaries?.map((diary) => (
                <div
                    key={diary.id}
                    className="flex flex-col items-center p-2 bg-light-gray dark:bg-cool-gray rounded-sm shadow-sm"
                >
                    <Image
                        src={diary.imageUrl || '/default-image.jpg'} // 기본 이미지 경로 설정
                        alt={diary.title}
                        width={300} // 실제 비율을 유지하기 위해 원래 비율의 너비 설정
                        height={300} // 실제 비율을 유지하기 위해 원래 비율의 높이 설정
                        className="rounded-sm"
                    />
                    <p className="text-sm pt-2 text-left truncate w-full text-dark-gray dark:text-white">{diary.weather}, {diary.title}</p> {/* 날씨와 제목 표시 */}
                </div>
            ))}
        </div>
    );
};

export default DiaryList;
