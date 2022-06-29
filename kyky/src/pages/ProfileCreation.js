import { useContext } from 'react';
import Language from '../language';
import pic from '../image/portrait-of-smiling-young-man-wearing-glasses-DIGF000310.jpg';
import Input from '../components/Input';
import CheckboxContainer from '../components/CheckboxContainer';
import Choice from '../components/Choice';
import RadioChoices from '../components/RadioChoices';
import FileUpload from '../components/FileUpload';
import TextArea from '../components/TextArea';
import Button from '../components/Button';

const languages = [
  'Suomi',
  'Ruotsi',
  'Englanti',
  'Venäjä',
  'Viro',
  'Latvia',
  'Islanti',
  'Tanska',
  'Norja',
  'Saksa',
  'Espanja',
  'Ranska',
  'Italia',
  'Kreikka',
  'Portugali',
  'Ukraina',
  'Unkari',
  'Turkki',
  'Kiina',
  'Japani',
  'Korea',
  'Vietnami',
  'Hindi',
  'Arabia'
];
const areas = [
  'Uusimaa',
  'Ahvenanmaa',
  'Etelä-Karjala',
  'Etelä-Pohjanmaa',
  'Etelä-Savo',
  'Kainuu',
  'Kanta-Häme',
  'Pääkaupunkiseutu',
  'Keski-Pohjanmaa',
  'Keski-Suomi',
  'Kymenlaakso',
  'Lappi',
  'Pirkanmaa',
  'Pohjanmaa',
  'Pohjois-Karjala',
  'Pohjois-Pohjanmaa',
  'Pohjois-Savo',
  'Päijät-Häme',
  'Satakunta',
  'Varsinais-Suomi'
];
export default function ProfileCreation() {
  const { lang } = useContext(Language);
  return (
    <main className="profile">
      <form className="card-light wide" onSubmit={(e) => e.preventDefault()}>
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
            label={lang.profile_creation.name}
            placeholder={lang.profile_creation.name}
            autoComplete="username"
            iconText="info"
          />
          <Input
            type="text"
            name="phone"
            label={lang.profile_creation.phone}
            placeholder={lang.profile_creation.phone}
            autoComplete="tel"
          />
          <Input
            type="text"
            name="address"
            label={lang.profile_creation.address}
            placeholder={lang.profile_creation.address}
            autoComplete="street-address"
          />
          <Input
            type="text"
            name="city"
            label={lang.profile_creation.city}
            placeholder={lang.profile_creation.city}
            autoComplete="address-level2"
          />
          <Input
            type="text"
            name="zip"
            label={lang.profile_creation.zip}
            placeholder={lang.profile_creation.zip}
            autoComplete="postal-code"
          />
          <Input
            type="text"
            name="country"
            label={lang.profile_creation.country}
            placeholder={lang.profile_creation.country}
            autoComplete="country-name"
          />
        </section>
        <section>
          <CheckboxContainer label={lang.profile_creation.language_skill} content={languages} />
        </section>
        <section>
          <CheckboxContainer
            label={lang.profile_creation.work_areas}
            content={areas}
            customSelect={false}
          />
        </section>
        <section>
          <RadioChoices label={lang.profile_creation.outside_work_areas}>
            <Choice label={lang.common.yes} name="travel" />
            <Choice label={lang.common.no} name="travel" />
          </RadioChoices>
        </section>
        <section>
          <RadioChoices label={lang.profile_creation.own_car}>
            <Choice label={lang.common.yes} name="car" />
            <Choice label={lang.common.no} name="car" />
          </RadioChoices>
        </section>
        <section>
          <FileUpload
            title={lang.profile_creation.studies}
            subTitle={lang.profile_creation.studies_description}
            showDropArea
          />
        </section>
        <section>
          <FileUpload title={lang.profile_creation.portfolio} subTitle="" />
        </section>
        <section>
          <TextArea label={lang.profile_creation.recommendations} name="recommendations" />
        </section>
        <section>
          <Button type="submit">{lang.profile_creation.submit_form}</Button>
        </section>
      </form>
    </main>
  );
}
