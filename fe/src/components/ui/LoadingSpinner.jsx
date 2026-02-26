export default function LoadingSpinner() {
    return (
        <div className={"min-w-screen min-h-screen flex items-center justify-center fixed backdrop-blur-xs"}>
            <div className="spinner-4 w-12 animate-spin">
                <div className="absolute top-0 left-0  bg-sky-600 w-4 h-4 rounded-full"></div>
                <div className="absolute top-1/2 right-0 bg-black w-4 h-4 rounded-full"></div>
            </div>
        </div>
    )
}

