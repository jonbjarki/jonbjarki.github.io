import { useRef, useState, type SyntheticEvent } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import "./contact.css";

export default function ContactForm() {
  const [result, setResult] = useState("");
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
      setResult("Please fill out the captcha");
      return;
    }

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "ff7f365f-0348-447c-ac32-d3377344f27f"); // Safe public key

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.error("Error occurred when submitting form");
    }

    const data = await response.json();
    console.log("Form Response", data);
    setResult(data.success ? "Success!" : "Error");
  };

  return (
    <section aria-labelledby="contact-title">
      <h2 id="contact-title">Contact Me</h2>
      <form onSubmit={onSubmit} id="contact">
        <label htmlFor="input-name">Name</label>
        <input type="text" name="name" id="input-name" required />
        <label htmlFor="input-email">Email</label>

        <input type="email" name="email" id="input-email" required />
        <textarea name="message" id="message" required></textarea>
        <button type="submit">Submit</button>
        <p>{result}</p>

        <HCaptcha
          ref={captchaRef}
          sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
          reCaptchaCompat={false}
          onVerify={onHCaptchaChange}
          onLoad={onLoad}
          theme="dark"
        />
      </form>
    </section>
  );
}
