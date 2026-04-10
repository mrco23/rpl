import React from "react";
import PublicLayout from "@components/layout/PublicLayout.jsx";
import ekstrakurikler from "@assets/about.jpg";
import { Link } from "react-router";

export default function ExtracurricularPage() {
  const extracurriculars = [
    {
      title: "Dance Club",
      description:
        "Mengembangkan bakat dan kreativitas siswa dalam seni tari sekaligus melatih kepercayaan diri dan kekompakan tim.",
      pembina: ["Elegantia Makarawung", "Lalisa Manoban", "Jeon Jungkook"],
      jadwal: "Senin & Selasa",
      image: ekstrakurikler, // ganti dengan path image mu
    },
    {
      title: "Paduan Suara",
      description:
        "Mengembangkan kemampuan vokal siswa serta membangun kebersamaan melalui harmoni dan kerja sama dalam bernyanyi.",
      pembina: ["Selomitha Nong", "Bruno Mars", "Henry Cavil"],
      jadwal: "Senin & Selasa",
      image: ekstrakurikler, // ganti dengan path image mu
    },
    {
      title: "Pramuka",
      description:
        "Membentuk karakter disiplin, kemandirian, dan kepemimpinan melalui berbagai kegiatan kepramukaan yang edukatif dan menantang.",
      pembina: ["Marcois Makalew", "Reins Maindjanga"],
      jadwal: "Senin & Selasa",
      image: ekstrakurikler, // ganti dengan path image mu
    },
  ];

  return (
    <PublicLayout>
      <section className="w-full bg-blue-900 text-white rounded-b-3xl py-8 px-6 md:px-10 mb-10">
        <h2 className="text-2xl font-medium translate-y-4">Ekstrakurikuler</h2>
      </section>
      <div className=" px-20 py-2 text-md text-gray-600 flex gap-6 -mt-5">
        <span className="font-semibold text-black">Akademik</span>
        <p className="font-semibold">{">"}</p>
        <Link
          to="/program"
          className=" text-gray-600 hover:text-blue-600 font-medium block cursor-pointer"
        >
          Program Unggulan
        </Link>

        <span className="text-blue-600  font-medium">Ekstrakurikuler</span>
        <Link
          to="/prestasi"
          className=" hover:text-blue-600 block cursor-pointer"
        >
          Prestasi Siswa
        </Link>
      </div>
      <div className="px-20 py-6 text-gray-700">
        <section className="text-center max-w-7xl mx-auto px-6 mb-12 mt-10">
          <p className="text-gray-900 text-md leading-relaxed font-semibold">
            Melalui berbagai kegiatan yang menarik dan bermanfaat, siswa
            didorong untuk mengembangkan bakat, membangun kepercayaan diri,
            serta belajar bekerja sama dan berprestasi di berbagai bidang.
            Kegiatan ekstrakurikuler juga menjadi sarana bagi siswa untuk
            bertumbuh dalam nilai-nilai disiplin, tanggung jawab, kreativitas,
            dan kepemimpinan, sehingga mereka dapat berkembang menjadi pribadi
            yang aktif dan berkarakter.
          </p>
        </section>
        <h2 className="text-3xl font-medium font-serif mt-6 mb-4">
          Mari Jelajahi!
        </h2>
      </div>
      {/* Cards */}
      <div className="px-20 py-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {extracurriculars.map((item) => (
          <div key={item.title} className=" flex flex-col">
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="p-4 flex-1 flex flex-col">
              <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-900 mb-4 flex-1">{item.description}</p>
              <p className="text-black font-medium mb-1">
                <span className="font-semibold text-blue-800">Pembina:</span>{" "}
                {item.pembina.join(", ")}
              </p>
              <p className="text-black font-medium">
                <span className="font-semibold text-blue-800">Jadwal:</span>{" "}
                {item.jadwal}
              </p>
            </div>
          </div>
        ))}
      </div>
    </PublicLayout>
  );
}
