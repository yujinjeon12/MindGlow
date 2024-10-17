import {
  title,
  description,
  favicon,
} from "@/components/common/shared-metadata";
import "@/styles/globals.css";

export const metadata = {
  title: "감정 일기 쓰기",
  description: description,
  icons: favicon,
};

export default function WriteEmotionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
