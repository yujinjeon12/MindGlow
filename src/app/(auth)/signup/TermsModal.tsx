import React from 'react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal = ({ isOpen, onClose }: TermsModalProps) => {
  if (!isOpen) return null;

  // 모달 외부를 클릭했을 때 모달을 닫는 함수
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 클릭한 요소가 모달 내부가 아닐 때만 닫기
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div className="w-10/12 sm:w-3/4 md:w-1/2 bg-white dark:bg-dark-gray p-4 rounded shadow-lg text-black dark:text-white text-left overflow-y-auto">
        <h1 className="font-bold mb-2">약관 및 개인정보 처리방침</h1>
        <p>이 서비스는 감정일기를 작성하고 공유하는 서비스입니다.</p>

        <h3 className='mt-4'>1. 수집하는 정보:</h3>
        <ul>
          <li>이메일: 서비스 가입 및 로그인 용도</li>
          <li>닉네임: 사용자 식별 및 상호작용 용도</li>
          <li>작성한 일기와 그림: 사용자의 기록으로 활용되며, 다른 사용자에게 공개됩니다.</li>
        </ul>

        <h3 className='mt-4'>2. 정보의 사용 목적:</h3>
        <ul>
          <li>사용자 경험 개선 및 통계 자료로 사용</li>
          <li>서비스 관련 정보 전달을 위한 커뮤니케이션</li>
        </ul>

        <h3 className='mt-4'>3. 정보의 보관 기간:</h3>
        <p>사용자가 서비스 탈퇴 요청 시 즉시 삭제되며, 법적 의무 준수를 위해 최소한의 정보는 보관될 수 있습니다.</p>

        <h3 className='mt-4'>4. 제3자 제공:</h3>
        <p>원칙적으로 제3자에게 제공되지 않으며, 사용자의 동의가 있는 경우에만 제공됩니다.</p>

        <p className='mt-4'>이 서비스는 개인 정보를 안전하게 관리하기 위해 최선을 다하며, 본 약관에 동의함으로써 개인 정보의 수집 및 이용에 동의한 것으로 간주됩니다.</p>
        <p onClick={onClose} className='underline text-black dark:text-white mt-4 cursor-pointer'>
          닫기
        </p>
      </div>
    </div>
  );
};

export default TermsModal;
