import type { Session } from "next-auth";

export type DarkModeState = {
  value: boolean;
};
export type HeaderProps = {
  session: Session | null;
};
export type ButtonProps = {
  bgColor: string;
  textColor: string;
  value: string;
  option: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
