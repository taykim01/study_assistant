import dynamic from 'next/dynamic'
import type { Metadata } from "next";
import "../presentation/assets/styles/Global.css";

const DynamicHeader = dynamic(() => import('@/presentation/components/header'), {
  ssr: false
})

export const metadata: Metadata = {
  title: "Study Assistant",
  description: "공부할 때 쓰려고 만든 프로젝트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <DynamicHeader />
      <body style={{ marginTop: "10vh" }}>{children}</body>
    </html>
  );
}
