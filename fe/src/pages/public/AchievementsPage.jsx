import img from "@assets/prestasi.jpg"; // ganti dengan gambar asli nanti

export default function AchievementsPage() {
  const achievements = [
    {
      title: "Juara 1 Lomba Sains",
      desc: "Tingkat Kota Manado",
      img: img,
    },
    {
      title: "Juara Basket",
      desc: "Kompetisi Antar Sekolah",
      img: img,
    },
    {
      title: "Juara Paduan Suara",
      desc: "Festival Nasional",
      img: img,
    },
  ];

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-10 md:px-16">
        
        {/* TITLE */}
        <div className="mb-10">
          <h2 className="text-xl md:text-2xl font-semibold border-l-4 border-blue-600 pl-4">
            Prestasi Sekolah Kami
          </h2>
        </div>

        {/* CARD GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-md group"
            >
              {/* IMAGE */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-96 object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 text-white">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <div className="flex justify-center mt-10">
          <button className="border border-gray-400 px-6 py-2 rounded-lg text-sm hover:bg-gray-100">
            Lihat Semua
          </button>
        </div>

      </div>
    </section>
  );
}