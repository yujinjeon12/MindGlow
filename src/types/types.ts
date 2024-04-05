export type ButtonProps = {
  bgColor: string;
  textColor: string;
  value: string;
  option: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
};
