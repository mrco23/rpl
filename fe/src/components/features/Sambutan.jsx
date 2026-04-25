import MoreButton from "../ui/MoreButton";

export default function QuotePage({ data = null, loading }) {
  const gambar = data?.gambar || "";
  const nama = data?.nama || "Kepala Sekolah";
  const sambutan = data?.kata_sambutan || "tidak ada data";

  return (
    <section className="w-full py-20 bg-[#e9edf5]" >
      <div className="max-w-3xl mx-auto grid md:grid-cols-2 items-center">
        {loading ? (<div className="w-81 h-97 animate-pulse">
          <div className="h-97 w-81 bg-slate-300 rounded-2xl "></div>
        </div>
        ) : (<div className="w-81 h-97 bg-gray-300 rounded-2xl mx-auto overflow-hidden shadow-md mb-10 lg:mb-0" data-aos="flip-right" data-aos-duration="500" data-aos-delay={500}>
          <img
            src={gambar}
            alt="Kepala Sekolah"
            className="w-full h-full object-cover"
          />
        </div>)}


        {/* TEXT */}
        <div className="relative text-blue-900">
          {/* Quote Icon Atas */}
          <span className="text-6xl absolute -top-6 left-10 md:left-0 text-dark-blue">
            “
          </span>
          {loading ? (<div className="animate-pulse my-10">
            <div className="flex flex-col justify-center space-y-4">
              <div className="w-full h-10 bg-slate-300 rounded"></div>
              <div className="w-full h-10 bg-slate-300 rounded"></div>
              <div className="w-3/4 h-10 bg-slate-300 rounded"></div>
            </div>
          </div>
          ) : (<p className="text-xl lg:text-2xl xl:text-4xl leading-relaxed text-center md:text-start mb-6 pl-6">
            {sambutan}
          </p>)}

          {/* Quote Icon Bawah */}
          <span className="text-6xl absolute bottom-5 xl:bottom-10 right-10 md:right-0 text-dark-blue">
            ”
          </span>

          {loading ? (<div className="animate-pulse mt-10">
            <div className="flex flex-col justify-center space-y-2">
              <div className="w-full h-5 bg-slate-300 rounded"></div>
              <div className="w-full h-5 bg-slate-300 rounded"></div>
            </div>
          </div>) : (<div className="pl-6">
            <p className="text-lg text-center md:text-start">
              Kepala SMP Katolik St. Rafael Manado
            </p>
            <p className="font-semibold text-xl text-center md:text-start">{nama}</p>
          </div>)}


        </div>

      </div>
    </section >
  );
}