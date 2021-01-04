import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: string;
  placeholder?: string;
}

const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { type, placeholder, error, ...rest } = props;
  return (
    <div className="form-group">
      <input
        placeholder={placeholder}
        className="input-material"
        ref={ref}
        {...rest}
      />
      {error && <label className="label-material">{error}</label>}
    </div>
  );
});

export default Input;
