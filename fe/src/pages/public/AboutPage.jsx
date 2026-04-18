import labImg from "@assets/about.jpg";

export default function AboutPage() {
  const fasilitas = [
    { title: "Laboratorium", img: labImg },
    { title: "Lapangan Olahraga", img: labImg },
    { title: "Perpustakaan", img: labImg },
  ];

  return (
    <section className="w-full py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* TITLE */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">
          Lingkungan Belajar Mendukung Masa Depan
        </h2>

        {/* GRID FASILITAS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {fasilitas.map((item, index) => (
            <div key={index} className="text-center group cursor-pointer">
              {/* CARD IMAGE */}
              <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-60 object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* TITLE OUTSIDE CARD */}
              <p className="mt-4 text-gray-800 font-semibold text-lg">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {/* CTA BUTTON */}
        <div className="text-center mt-8">
          <button className="px-5 py-2 border border-gray-400 text-gray-700 rounded-xl flex items-center gap-2 mx-auto hover:bg-white hover:shadow-md transition duration-300">
            Lihat Fasilitas Lainnya <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}