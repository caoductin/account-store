const FEATURES = [
  { icon: "⚡", title: "Giao ngay tức thì", desc: "Nhận tài khoản trong vài giây sau khi thanh toán thành công." },
  { icon: "🔒", title: "Bảo mật tuyệt đối", desc: "Thông tin tài khoản được mã hóa, chỉ hiển thị sau khi mua." },
  { icon: "🎯", title: "Cam kết chất lượng", desc: "Hoàn tiền 100% nếu tài khoản không đúng mô tả." },
  { icon: "💬", title: "Hỗ trợ 24/7", desc: "Đội ngũ hỗ trợ luôn sẵn sàng giải quyết mọi vấn đề." },
];

export default function Features() {
  return (
    <section className="max-w-6xl mx-auto px-5 py-20">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">Tại sao chọn chúng tôi?</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FEATURES.map((f) => (
          <div key={f.title} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl mb-4">{f.icon}</div>
            <h3 className="font-bold text-slate-800 mb-1.5">{f.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}