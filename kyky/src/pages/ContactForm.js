import React, { useState, useContext } from 'react';
import Language from '../language';

function ContactForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Näytä kaikki');
  const { lang } = useContext(Language);
  const showSubmitButton = false;

  const toggleVisibility = () => {
    if (showAll === false) {
      setButtonLabel('Piilota');
    } else if (showAll === true) {
      setButtonLabel('Näytä kaikki');
    }
    setShowAll(!showAll);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      console.log('Send Contact Form');
      console.log('From: ', email);
      console.log('Message: ', message);
    } catch (exception) {
      console.log(exception);
    }
  }

  function submitButton() {
    return (
      <div className="contact-section">
        <button className="button-primary" type="submit">
          Lähetä
        </button>
      </div>
    );
  }

  function faqSection() {
    return (
      <div className="faq-section">
        <h1>FAQ, top 5</h1>
        <a href="url">Mikä on Kyky?</a>
        <a href="url">Kuka voi liittyä?</a>
        <a href="url">Miten voi liittyä?</a>
        <a href="url">Miten voi ostaa palveluita?</a>
        <a href="url">Miten voin peruuttaa ostoni?</a>
        <button className="button-primary" type="button" onClick={toggleVisibility}>
          {buttonLabel}
        </button>
      </div>
    );
  }

  function faqSectionLong() {
    return (
      <div className="faq-section">
        <h1>FAQ, top 5</h1>
        <a href="url">Mikä on Kyky?</a>
        <a href="url">Kuka voi liittyä?</a>
        <a href="url">Miten voi liittyä?</a>
        <a href="url">Miten voi ostaa palveluita?</a>
        <a href="url">Miten voin peruuttaa ostoni?</a>
        <a href="url">Linkki</a>
        <a href="url">Linkki</a>
        <a href="url">Linkki</a>
        <a href="url">Linkki</a>
        <a href="url">Linkki</a>
        <button className="button-primary" type="button" onClick={toggleVisibility}>
          {buttonLabel}
        </button>
      </div>
    );
  }

  return (
    <main className="contact-form">
      <form className="card-light wide" onSubmit={handleSubmit}>
        <h1>Ota yhteyttä</h1>
        <div className="info-section">
          <p>Meidät tavoittaa verkossa, Whatsapilla ja sähköpostilla</p>
          <p>Ota yhteyttä, autamme mielellämme!</p>
          <p>Täytä yhteydenottolomake lähetä sähköpostia tai laita veistiä Whatsappilla</p>
          <p className="phone-number">000 000 0000</p>
          <p className="kyky-email">email@kyky.today</p>
          <p>Olemme tavoitettavissa ma-pe 9-18</p>
          <h2>Yhteydenottolomake</h2>
        </div>
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
              value={email}
              onChange={({ target }) => {
                setEmail(target.value);
              }}
            />
          </div>
          <div className="input-container">
            <label className="input-label-required" htmlFor="message">
              {lang.contact_form.title}
            </label>
            <input
              type="text"
              placeholder={lang.contact_form.title_placeholder}
              value={message}
              onChange={({ target }) => {
                setMessage(target.value);
              }}
            />
          </div>
          {showSubmitButton === true ? submitButton() : null}
          {showAll === false ? faqSection() : faqSectionLong()}
        </section>
      </form>
    </main>
  );
}

export default ContactForm;
