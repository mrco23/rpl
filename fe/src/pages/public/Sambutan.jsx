import labImg from "@assets/kepsek.jpg";

export default function QuotePage() {
  return (
    <section className="w-full py-20 bg-[#e9edf5]">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        {/* IMAGE */}
        <div className="w-full h-64 md:h-80 bg-gray-300 rounded-2xl overflow-hidden shadow-md">
          <img
            src={labImg}
            alt="Kepala Sekolah"
            className="w-full h-full object-cover"
          />
        </div>

        {/* TEXT */}
        <div className="relative text-blue-900">
          {/* Quote Icon Atas */}
          <span className="text-5xl absolute -top-6 left-0 text-blue-700">
            “
          </span>

          <p className="text-lg leading-relaxed mb-6 pl-6">
            Kami Bertekad membentuk generasi beriman, berkarakter, dan mencintai
            tanah air, serta membekali mereka dengan ilmu, keterampilan, dan
            sikap agar mandiri, ulet, dan berprestasi.
          </p>

          {/* Quote Icon Bawah */}
          <span className="text-5xl absolute bottom-10 right-0 text-blue-700">
            ”
          </span>

          <div className="pl-6">
            <p className="font-semibold">
              Kepala SMP Katolik St. Rafael Manado
            </p>
            <p className="text-sm">Marcois Sol S.T.</p>
          </div>
        </div>

      </div>
    </section>
  );
}