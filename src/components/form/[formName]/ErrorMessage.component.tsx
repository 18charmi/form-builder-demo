
export default function ErrorMessage({ show = false, text = '' }) {
    if (!show) return <></>;

    return <span className="text-rose-700">
        {text}
    </span>
}