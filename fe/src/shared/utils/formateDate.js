const formateDate = (dateString) => {
	if (!dateString) return "-";
	const date = new Date(dateString);
	return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
};

export default formateDate;
