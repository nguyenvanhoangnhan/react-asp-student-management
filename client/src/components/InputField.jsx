import React from 'react'

// eslint-disable-next-line react/display-name
const InputField = React.forwardRef((props, ref) => {
    const label = props.label || 'label'
    const type = props.type || 'text'
    const required = props.required || false
    return (
        <div className="input-field relative flex flex-col mt-6 w-full bg-opacity-0">
            <input
                type={type}
                placeholder=" "
                required={required}
                ref={ref}
                onChange={props.onChange}
                value={props.value}
                name={props.name}
                className="w-full p-0 bg-white bg-opacity-0"
            />
            <span className="absolute top-5 left-0 bg-black bg-opacity-0 text-black text-opacity-50 px-1 pointer-events-none font-semibold">
                {label}
            </span>
        </div>
    )
})

export default InputField
