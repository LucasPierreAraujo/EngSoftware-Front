import { Toaster } from '@/components/ui/sonner';
import "../globals.css";

export const metadata = {
  title: "Gerenciamento de obra",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
