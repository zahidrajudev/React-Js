import React from 'react'


function Button({ children, type = 'button', classNames = 'btn-primary', ...rest }) {
    return (
        <a className={`btn ` + `${classNames}`} type={type} {...rest}>{children}</a>
    )
}

function SelectButton({ children, classNames, ...rest }) {
    return (
        <select className={classNames} {...rest}> {children} </select>
    )
}

export { SelectButton };

export default Button;