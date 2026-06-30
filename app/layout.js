import "./globals.css";

export const metadata = {
  title: "Favour's Profile App",
  description: "Lab 15 Next.js profile app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}