import MoreButton from "../ui/MoreButton";

export default function PreviewFasilitas({ data = [], loading }) {
  return (
    <section className="w-full py-10 bg-white" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* TITLE */}
        <h2 className="text-3xl md:text-5xl font-semibold text-center mb-12">
          Lingkungan Belajar Mendukung Masa Depan
        </h2>

        {/* GRID FASILITAS */}
        {loading ? (<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((index) => (
            <div key={index} className="text-center animate-pulse">
              <div className="w-full aspect-3.5/2.5 rounded-lg shadow-sm mb-2 bg-gray-200"></div>
              <div className="w-1/2 h-4 bg-gray-200 mx-auto rounded"></div>
            </div>
          ))}
        </div>) : (<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <div key={index} className="text-center " data-aos={`zoom-in`} data-aos-duration="600" data-aos-delay={index * 100}>
              <img
                src={item.gambar || null}
                alt={item.nama_fasilitas}
                className="w-100 mx-auto lg:w-full aspect-3.5/2.5 object-cover rounded-lg shadow-sm mb-2"
              />
              <p className="text-gray-700 text-sm">{item.nama_fasilitas}</p>
            </div>
          ))}
        </div>)}

        {/* CTA BUTTON */}
        <MoreButton text={'Lihat Semua Fasilitas'} to="/fasilitas" />
      </div>
    </section>
  );
}
