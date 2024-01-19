import { useState, ChangeEvent, KeyboardEvent, FC, useRef, useEffect } from 'react';

interface IOtpInputProps {
    length: number;
    handleSubmit: (otp: string) => void;
}

const OtpInput: FC<IOtpInputProps> = ({ length = 4, handleSubmit }) => {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
     const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

     useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0]?.focus();
        }
     }, []);
    
    const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.slice(-1);
        if (isNaN(Number(value))) return;
        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);
        // Moving it to next input
        if (index < length - 1 && value !== "" && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
        // Submit trigger
        const combainedOtp = updatedOtp.join("");
        if (combainedOtp.length === length) handleSubmit(combainedOtp);
    };

    const handleClick = (index: number) => {
        inputRefs.current[index]?.setSelectionRange(1, 1);
        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf("")]?.focus();
        }
    };

    const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
        if (index > 0 && event.key === "Backspace" && !otp[index] && inputRefs.current[index - 1]) {
            // Moving it to prev input
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div>
            {otp.map((item, index) => (
                <input
                    key={index}
                    type="text"
                    value={item}
                    ref={(input)=> (inputRefs.current[index] = input)}
                    className="otp-input"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(index, event)}
                    onClick={() => handleClick(index)}
                    onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, event)}
                />
            ))}
        </div>
    );
}

export default OtpInput;
