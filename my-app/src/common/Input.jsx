export default function Input({ id, name, value, type, onChange }) {
  return (
    <input
      id={id}
      name={name}
      value={value}
      type={type}
      onChange={onChange}
      className='w-full border p-2 rounded'
    />
  )
}
