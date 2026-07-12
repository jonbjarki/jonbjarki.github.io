import { useRef, useState, type SyntheticEvent } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import "./contact.css";

export default function ContactForm() {
  const [error, setError] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [success, setSuccess] = useState("");

  const tokenRef = useRef("");
  const captchaRef = useRef<HCaptcha>(null);

  const onHCaptchaChange = (token: string) => {
    tokenRef.current = token;
    setCaptchaError("");
  };

  const onLoad = () => {
    captchaRef.current?.execute();
  };

  const onSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (tokenRef.current === "") {
      setCaptchaError("Please fill out the captcha");
      return;
    }

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "ff7f365f-0348-447c-ac32-d3377344f27f"); // Safe public key

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("Error occurred while submitting form");
        setError("An error occurred while submitting the form. Please try again later.");
        return;
      }

      setError("");
      setSuccess("Your message was sent successfully!");
      captchaRef.current?.resetCaptcha();
    } catch (error) {
      console.error("Unexpected error occurred while submitting form", error);
      setError("An unexpected error occurred while submitting the form. Please try again later.");
    }
  };

  return (
    <section aria-labelledby="contact-title">
      <h2 id="contact-title" className="section-title">
        Contact Me
      </h2>
      <form onSubmit={onSubmit} id="contact">
        <div className="form-group">
          <label htmlFor="input-name">Name</label>
          <input type="text" name="name" id="input-name" placeholder="Your name..." required />
        </div>
        <div className="form-group">
          <label htmlFor="input-email">Email</label>
          <input
            type="email"
            name="email"
            id="input-email"
            placeholder="email@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            placeholder="Write your message here..."
            required
          ></textarea>
        </div>
        <div className="captcha-container">
          <HCaptcha
            ref={captchaRef}
            sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
            reCaptchaCompat={false}
            onVerify={onHCaptchaChange}
            onLoad={onLoad}
            theme="dark"
          />
          {captchaError && <p className="captcha-error">{captchaError}</p>}
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </section>
  );
}
