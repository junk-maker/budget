interface InputProps {
    type: string;
    value: string;
    result: object;
    strength: boolean;
    className: string;
    placeholder: string;
    onChange: () => void;
    autoComplete: string;
};

const Input = ({type, value, result, strength, onChange, className, autoComplete, placeholder}: InputProps) => {
    return (
        <>
            <input
                value={value}
                onChange={onChange}
                className={className}
                type={type || 'text'}
                placeholder={placeholder}
                autoComplete={autoComplete}
            />
            {/* {strength ?  <span className={'strength-password'}  data-score={result?.score}/> : null} */}
        </>
    );
};

export default Input;