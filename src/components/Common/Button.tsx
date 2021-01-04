import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    type: 'submit' | 'reset' | 'button';
    children?: React.ReactNode;
    className?: string;
    onClick?: any;
}

const Button = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
    const {
        type = 'button',
        className = 'btn btn-primary',
        children = 'Ok',
        onClick = null,
        ...rest
    } = props

    return (
        <div className="form-group">
            <button
                type={type}
                className={className}
                onClick={onClick}
                ref={ref}
                {...rest}
            >
                {children}
            </button>
        </div>
    )
});

export default Button;