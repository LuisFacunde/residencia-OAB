export const ModalInput2 = ({ label, placeholder, type = "text", name, value, onChange, showLabel = true }) => {
  const handleChange = (e) => {
    onChange({
      target: {
        name: name,
        value: e.target.value
      }
    });
  };

  return (
    <div className="mb-4">
      {showLabel && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#062360] focus:border-transparent transition-all"
      />
    </div>
  );
};