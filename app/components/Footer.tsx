import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-xl">🎁</span>
              </div>
              <span className="text-xl font-bold text-white">TúiMù.VN</span>
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              Website xé túi mù uy tín hàng đầu Việt Nam. 
              Trải nghiệm cảm giác hồi hộp và nhận những phần thưởng giá trị.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Liên kết</h4>
            <div className="space-y-2">
              <Link href="/about" className="block text-gray-400 hover:text-purple-400 text-sm">Giới thiệu</Link>
              <Link href="/policy" className="block text-gray-400 hover:text-purple-400 text-sm">Chính sách</Link>
              <Link href="/terms" className="block text-gray-400 hover:text-purple-400 text-sm">Điều khoản</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Liên hệ</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>📞 Hotline: 1900-xxxx</p>
              <p>📧 Email: support@tuimu.vn</p>
              <p>💬 Zalo: 0xxx-xxx-xxx</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          © 2024 TúiMù.VN - All rights reserved
        </div>
      </div>
    </footer>
  )
}
