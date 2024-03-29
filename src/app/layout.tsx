import type { Metadata } from "next";
import "../presentation/assets/styles/Global.css";

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
      <body style={{ marginTop: "10vh" }}>{children}</body>
    </html>
  );
}
