import { useContext } from 'react';
import Language from '../language';
import 'material-icons/iconfont/material-icons.css';
import pic from '../image/portrait-of-smiling-young-man-wearing-glasses-DIGF000310.jpg';

export default function ProfileCreation() {
  const { lang } = useContext(Language);
  return (
    <main className="profile">
      <form className="card-light wide">
        <h1>{lang.profile_creation.h1}</h1>
        <div className="profile-pic">
          <img src={pic} alt="profile" />
          <div className="profile-pic-plus">+</div>
          <p className="profile-pic-text">{lang.profile_creation.choose_portrait}</p>
          <p className="profile-pic-add-text">{lang.profile_creation.add_portrait}</p>
        </div>
        <section>
          <div className="input-container">
            <label htmlFor="name">{lang.profile_creation.name}</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder={lang.profile_creation.name}
              autoComplete="username"
            />
            <i className="material-icons-outlined">info</i>
          </div>
          <div className="input-container">
            <label htmlFor="phone">{lang.profile_creation.phone}</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder={lang.profile_creation.phone}
              autoComplete="tel"
            />
          </div>
          <div className="input-container">
            <label htmlFor="address">{lang.profile_creation.address}</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder={lang.profile_creation.address}
              autoComplete="street-address"
            />
          </div>
          <div className="input-container">
            <label htmlFor="city">{lang.profile_creation.city}</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder={lang.profile_creation.city}
              autoComplete="address-level2"
            />
          </div>
          <div className="input-container">
            <label htmlFor="zip">{lang.profile_creation.zip}</label>
            <input
              type="text"
              id="zip"
              name="zip"
              placeholder={lang.profile_creation.zip}
              autoComplete="postal-code"
            />
          </div>
          <div className="input-container">
            <label htmlFor="country">{lang.profile_creation.country}</label>
            <input
              type="text"
              id="country"
              name="country"
              placeholder={lang.profile_creation.country}
              autoComplete="country-name"
            />
          </div>
        </section>
        <section>
          <button type="submit" className="button-primary">
            {lang.profile_creation.submit_form}
          </button>
        </section>
      </form>
    </main>
  );
}
