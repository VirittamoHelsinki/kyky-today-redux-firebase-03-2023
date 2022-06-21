import { useContext } from 'react';
import Language from '../language';
import pic from '../image/portrait-of-smiling-young-man-wearing-glasses-DIGF000310.jpg';
import Input from '../components/Input';

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
          <Input
            type="text"
            name="name"
            title={lang.profile_creation.name}
            placeholder={lang.profile_creation.name}
            autoComplete="username"
            icon={{ text: 'info', className: 'material-icons-outlined' }}
          />
          <Input
            type="text"
            name="phone"
            title={lang.profile_creation.phone}
            placeholder={lang.profile_creation.phone}
            autoComplete="tel"
          />
          <Input
            type="text"
            name="address"
            title={lang.profile_creation.address}
            placeholder={lang.profile_creation.address}
            autoComplete="street-address"
          />
          <Input
            type="text"
            name="city"
            title={lang.profile_creation.city}
            placeholder={lang.profile_creation.city}
            autoComplete="address-level2"
          />
          <Input
            type="text"
            name="zip"
            title={lang.profile_creation.zip}
            placeholder={lang.profile_creation.zip}
            autoComplete="postal-code"
          />
          <Input
            type="text"
            name="country"
            title={lang.profile_creation.country}
            placeholder={lang.profile_creation.country}
            autoComplete="country-name"
          />
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
