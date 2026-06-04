export default function StatItem({ icon: Icon, label, value, iconClass, valueClass, bgClass }) {
    return (
        <div className={`${bgClass} rounded-xl p-3 flex flex-col gap-1`}>
            <div className={`flex items-center gap-1.5 ${iconClass}`}>
                <Icon size={13} />
                <span className="text-[10px] font-bold uppercase tracking-wide">{label}</span>
            </div>
            <p className={`text-xl font-black ${valueClass}`}>{value}</p>
        </div>
    );
}