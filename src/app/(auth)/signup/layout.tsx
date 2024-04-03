import {
  title,
  description,
  favicon,
} from "@/components/common/shared-metadata";
import "@/styles/globals.css";

export const metadata = {
  title: "회원가입",
  description: description,
  icons: favicon,
};
export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
