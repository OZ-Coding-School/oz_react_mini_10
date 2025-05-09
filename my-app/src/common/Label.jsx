export default function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className='font-semibold text-sm'>
      {children}
    </label>
  )
}
