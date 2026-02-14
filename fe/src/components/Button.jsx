export function Button({ className, children }) {
	return <button className={`${className} cursor-pointer`}>{children}</button>;
}

export default function ButtonAction() {
	return <button></button>;
}
