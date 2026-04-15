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
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Lingkungan Belajar Mendukung Masa Depan
        </h2>

        {/* GRID FASILITAS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fasilitas.map((item, index) => (
            <div key={index} className="text-center">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg shadow-sm mb-2"
              />
              <p className="text-gray-700 text-sm">{item.title}</p>
            </div>
          ))}
        </div>

        {/* CTA BUTTON */}
        <div className="text-center mt-6">
          <button className="px-4 py-2 border border-gray-400 text-gray-700 rounded-md flex items-center gap-1 mx-auto hover:bg-gray-100 transition">
            Lihat Fasilitas Lainnya <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
