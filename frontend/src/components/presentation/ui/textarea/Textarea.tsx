interface TextareaProps {
    value: string;
    className: string;
    onChange: () => void;
};

const Textarea = ({value, onChange, className}: TextareaProps) => (<textarea value={value} onChange={onChange} className={className}/>);

export default Textarea;