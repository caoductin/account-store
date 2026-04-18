import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="bg-[#F8FAFC]">
        <Header />
        <AuthProvider >
          <main className="min-h-screen">
            {children}
          </main>
        </AuthProvider>

        <Footer />
      </body>
    </html>
  );
}