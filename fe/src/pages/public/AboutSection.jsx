import labImg from "@assets/about.jpg"; // ganti sesuai gambar kamu

export default function AboutSection() {
  const stats = [
    { value: "20", label: "Tenaga Pengajar" },
    { value: "300", label: "Peserta Didik" },
    { value: "12", label: "Ekstrakurikuler" },
    { value: "25", label: "Prestasi Sekolah" },
  ];

  const fasilitas = [
    { title: "Laboratorium Komputer", img: labImg },
    { title: "Sarana Olahraga & Ekstrakurikuler", img: labImg },
    { title: "Perpustakaan", img: labImg },
    { title: "Lingkungan Sekolah Hijau", img: labImg },
    { title: "Laboratorium IPA Lengkap", img: labImg },
  ];

  return (
    <section className="w-full py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        {/* STATISTIK */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((item, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl px-6 py-6 text-center 
                 shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
            >
              {/* ICON BINTANG */}
              <span className="absolute top-3 right-4 text-blue-900 text-lg">
                ✦
              </span>

              {/* ANGKA */}
              <h3 className="text-3xl font-bold text-blue-900">{item.value}</h3>

              {/* LABEL */}
              <p className="text-gray-600 text-sm mt-1">{item.label}</p>

              {/* GARIS BAWAH */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-900 rounded-b-xl"></div>
            </div>
          ))}
        </div>  

        {/* TITLE */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Lingkungan Belajar Mendukung Masa Depan
        </h2>

        {/* GRID FASILITAS */}
        <div className="grid md:grid-cols-3 gap-6">
          {fasilitas.map((item, index) => (
            <div key={index} className="text-center">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover rounded-xl shadow-md mb-3"
              />
              <p className="text-gray-700 text-sm">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
