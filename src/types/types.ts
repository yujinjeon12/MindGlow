export type ButtonProps = {
  bgColor: string;
  textColor: string;
  value: string;
  option: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  disabled?: boolean;
};
export interface Diary {
  id: number; // 일기 ID
  userId: string;
  nickname: string
  title: string;
  weather: string;
  content: string;
  imageUrl: string;
  createdAt: Date;
}
