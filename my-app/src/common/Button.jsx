export default function Button({
  children,
  type = 'button',
  onClick,
  bgColor = 'bg-gray-900',
  hoverBgColor = 'hover:bg-gray-600',
  color = 'text-white',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full text-white py-2 rounded ${bgColor} ${hoverBgColor} ${color} transition`}
    >
      {children}
    </button>
  )
}
