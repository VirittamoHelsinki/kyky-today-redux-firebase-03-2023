import React, { /* cuseState, */ useContext } from 'react';
import Language from '../language';

function ContactForm() {
  // const [email, setEmail] = useState('');
  // const [message, setMessage] = useState('');
  const { lang } = useContext(Language);

  return (
    <main className="contact-form">
      <form className="card-light wide">
        <h1>Ota yhteyttä</h1>
        <p>Teksti</p>
        <p>Teksti</p>
        <p>Teksti</p>
        <h2>Yhteydenottolomake</h2>
        <section>
          <div className="input-container">
            <label className="input-label-required" htmlFor="email">
              {lang.contact_form.email}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder={lang.contact_form.email}
              autoComplete="username"
            />
          </div>
          <div className="input-container">
            <label className="input-label-required" htmlFor="message">
              {lang.contact_form.title}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder={lang.contact_form.title_placeholder}
              autoComplete="username"
            />
          </div>
        </section>
        <div className="faq-section">
          <h1>FAQ, top 5</h1>
          <a href="url">Mikä on Kyky?</a>
          <a href="url">Kuka voi liittyä?</a>
          <a href="url">Miten voi liittyä?</a>
          <a href="url">Miten voi ostaa palveluita?</a>
          <a href="url">Miten voin peruuttaa ostoni?</a>
        </div>
      </form>
    </main>
  );
}

export default ContactForm;
