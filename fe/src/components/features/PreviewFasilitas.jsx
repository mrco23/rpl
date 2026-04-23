import MoreButton from "../ui/MoreButton";
export default function PreviewFasilitas({ data = [] }) {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* TITLE */}
        <h2 className="text-3xl md:text-5xl font-semibold text-center mb-12">
          Lingkungan Belajar Mendukung Masa Depan
        </h2>

        {/* GRID FASILITAS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <div key={index} className="text-center">
              <img
                src={item.gambar || null}
                alt={item.nama_fasilitas}
                className="w-full aspect-3.5/2.5 object-cover rounded-lg shadow-sm mb-2"
              />
              <p className="text-gray-700 text-sm">{item.nama_fasilitas}</p>
            </div>
          ))}
        </div>

        {/* CTA BUTTON */}
        <MoreButton text={'Lihat Semua Fasilitas'} to="/fasilitas" />
      </div>
    </section>
  );
}
