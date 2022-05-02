import React from 'react'

const InputField = React.forwardRef((props, ref) => {

  const label = props.label || "label"
  const type = props.type || "text";
  const required = props.required || false;
  return (
    <div className="input-field">
        <input type={type} placeholder=" " required={required} ref={ref} />
        <span>{label}</span>
    </div>
  )
})

export default InputField;