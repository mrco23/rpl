export default function EmptyState({ title = "Belum ada data", description = "Data akan muncul setelah ditambahkan." }) {
  return (
    <div className="rounded-[24px] border border-dashed border-slate-300 p-10 text-center bg-slate-50">
      <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-500 leading-7">{description}</p>
    </div>
  );
}
