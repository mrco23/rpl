import labImg from "@assets/kepsek.jpg";
import MoreButton from "../ui/MoreButton";

export default function QuotePage({ data = null }) {
  const gambar = data?.gambar || labImg;
  const nama = data?.nama || "Marcois Sol S.T.";
  const sambutan = data?.kata_sambutan || "Kami Bertekad membentuk generasi beriman, berkarakter, dan mencintai tanah air, serta membekali mereka dengan ilmu, keterampilan, dan sikap agar mandiri, ulet, dan berprestasi.";

  return (
    <section className="w-full py-20 bg-[#e9edf5]">
      <div className="max-w-3xl mx-auto grid md:grid-cols-2 items-center">

        <div className="w-81 h-97 bg-gray-300 rounded-2xl overflow-hidden shadow-md">
          <img
            src={gambar}
            alt="Kepala Sekolah"
            className="w-full h-full object-cover"
          />
        </div>

        {/* TEXT */}
        <div className="relative text-blue-900">
          {/* Quote Icon Atas */}
          <span className="text-6xl absolute -top-6 left-0 text-dark-blue">
            “
          </span>

          <p className="text-4xl leading-relaxed mb-6 pl-6">
            {sambutan}
          </p>

          {/* Quote Icon Bawah */}
          <span className="text-6xl absolute bottom-10 right-0 text-dark-blue">
            ”
          </span>

          <div className="pl-6">
            <p className="text-lg">
              Kepala SMP Katolik St. Rafael Manado
            </p>
            <p className="font-semibold text-xl">{nama}</p>
          </div>
        </div>

      </div>
    </section>
  );
}