import { useState, ChangeEvent, FormEvent } from "react";

const PhoneOtpForm = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value);
    }
    const handlePhoneNumberSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }
  return (
      <div>
          <form onSubmit={handlePhoneNumberSubmit}>
              <input
                  type="text"
                  placeholder="Phone"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
              />
              <button type="submit">Submit</button>
          </form>
    </div>
  )
}   

export default PhoneOtpForm