const InputWrapper = ({ children, htmlFor, icon, label }) => {
  return (
    <>
      <div className="mt-1 relative rounded-md shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{icon}</span>
          </div>
        )}
        {children}
        <label htmlFor={htmlFor} className={`input-label floating-label`}>
          {label}
        </label>
      </div>
    </>
  );
};

export default InputWrapper;
