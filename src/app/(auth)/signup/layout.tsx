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
  return (
    <section className="flex justify-center items-center h-full flex-wrap">
      {children}
    </section>
  );
}
