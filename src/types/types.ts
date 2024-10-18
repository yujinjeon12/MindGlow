export type ButtonProps = {
  bgColor: string;
  textColor: string;
  value: string;
  option: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
};
export interface Diary {
  id: string; // 일기 ID
  nickname: string
  title: string;
  weather: string;
  content: string;
  imageUrl: string;
  createdAt: Date;
}
