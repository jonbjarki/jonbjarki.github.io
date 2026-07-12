import { useRef, useState, type SyntheticEvent } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import "./contact.css";

export default function ContactForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const tokenRef = useRef("");
  const captchaRef = useRef<HCaptcha>(null);

  const onHCaptchaChange = (token: string) => {
    tokenRef.current = token;
  };

  const onLoad = () => {
    captchaRef.current?.execute();
  };

  const onSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (tokenRef.current === "") {
      setError("Please fill out the captcha");
      return;
    }

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "ff7f365f-0348-447c-ac32-d3377344f27f"); // Safe public key

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
    setSuccess(true);
    captchaRef.current?.resetCaptcha();
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

        <HCaptcha
          ref={captchaRef}
          sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
          reCaptchaCompat={false}
          onVerify={onHCaptchaChange}
          onLoad={onLoad}
          theme="dark"
        />
        <button type="submit" className="submit-btn">
          Submit
        </button>
        <p className="success-message">{success ? "Your message was sent successfully!" : ""}</p>
        <p className="error-message">{error}</p>
      </form>
    </section>
  );
}
