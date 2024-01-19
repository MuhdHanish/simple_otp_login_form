import { useState, ChangeEvent, FormEvent } from "react";
import OtpInput from "./otp-input";
const phoneNumberRegex = /^\d{10}$/;

const PhoneOtpForm = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [showOtp, setShowOtp] = useState<boolean>(false);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value);
    }
    const handlePhoneNumberSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!phoneNumberRegex.test(phoneNumber)) {
            alert(`Invalid Phone Number`);
            return;
        }
        // call api
        // show otp field
        setShowOtp(true);
    }
    const handleOtpSubmit = (otp: string) => {
      // Implement your OTP verification logic here
      console.log(`Login successful with OTP: ${otp}`);
    };
  return (
      <div>
          {!showOtp ?
              (<form onSubmit={handlePhoneNumberSubmit}>
              <input
                  type="text"
                  placeholder="Phone"
                  value={phoneNumber}
                  onChange={handleChange}
              />
              <button type="submit">Submit</button>
              </form>)
              :
              (<div>
                  <p>Enter Otp</p>
                  <OtpInput length={4} handleSubmit={handleOtpSubmit}/>
              </div>)}
    </div>
  )
}   

export default PhoneOtpForm