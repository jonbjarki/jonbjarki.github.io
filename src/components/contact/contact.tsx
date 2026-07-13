import { useRef, useState, type SyntheticEvent } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import "./contact.css";
import { ToastContainer, toast } from "react-toastify";

export default function ContactForm() {
  const [error, setError] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  const tokenRef = useRef("");
  const captchaRef = useRef<HCaptcha>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const onHCaptchaChange = (token: string) => {
    tokenRef.current = token;
    setCaptchaError("");
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
      toast.success("Your message was sent successfully!");
      captchaRef.current?.resetCaptcha();
      formRef.current?.reset();
    } catch (error) {
      console.error("Unexpected error occurred while submitting form", error);
      setError("An unexpected error occurred while submitting the form. Please try again later.");
    }
  };

  return (
    <section aria-labelledby="contact-title">
      <ToastContainer theme="dark" />
      <h2 id="contact-title" className="section-title">
        Contact Me
      </h2>
      <form onSubmit={onSubmit} id="contact" ref={formRef}>
        <div className="form-group" id="name-group">
          <label htmlFor="input-name">Name</label>
          <input type="text" name="name" id="input-name" placeholder="Your name..." required />
        </div>
        <div className="form-group" id="email-group">
          <label htmlFor="input-email">Email</label>
          <input
            type="email"
            name="email"
            id="input-email"
            placeholder="email@example.com"
            required
          />
        </div>
        <div className="form-group" id="message-group">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            placeholder="Write your message here..."
            required
          ></textarea>
        </div>
        <div id="captcha-group">
          <HCaptcha
            ref={captchaRef}
            sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
            reCaptchaCompat={false}
            onVerify={onHCaptchaChange}
            theme="dark"
          />
          {captchaError && <p className="captcha-error">{captchaError}</p>}
        </div>
        <div id="submit-group">
          <button type="submit" className="submit-btn">
            Submit
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </form>
    </section>
  );
}
