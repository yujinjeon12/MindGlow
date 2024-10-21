import {
  description,
  favicon,
} from "@/components/common/shared-metadata";

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
