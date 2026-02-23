export function Button({className, onClick,type, children}) {
    return <button onClick={onClick} type={type} className={`${className} cursor-pointer bg-red-300 h-20 w-20`}>{children}</button>;
}

export default function ButtonAction() {
    return <button className={``}></button>;
}
