import {
  title,
  description,
  favicon,
} from "@/components/common/shared-metadata";
import "@/styles/globals.css";

export const metadata = {
  title: "감정모아보기",
  description: description,
  icons: favicon,
};

export default function EmotionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
