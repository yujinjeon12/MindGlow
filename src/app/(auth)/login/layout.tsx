import {
  title,
  description,
  favicon,
} from "@/components/common/shared-metadata";

export const metadata = {
  title: "로그인",
  description: description,
  icons: favicon,
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
