import React from 'react';
import defaultJobImage from '../../image/martin-dalsgaard-sGV1QDMM0Gg-unsplash.jpg';
import '../../styles/KykyTeam.scss';

const KykyTeam = () => {
  return (
    <div className="kykyteam-main">
      <div className="kykyteam-content">
        <div className="kykyteam-text">
          <div className="headline">
            <p>Kyky tiimi!</p>
          </div>
          <div className="paragraph">
            <p>
              Kyky Today syntyi vuonna 2020 taistellakseen työttömyyttä ja alityöllisyyttä vastaan.
              Tuemme Yhdistyneiden Kansakuntien Kestävän Kehityksen Tavoitteita 2030 Ei Köyhyyttä
              (KKT 1), Kunnollinen Työ ja Talouskasvu (KKT 8), ja Vähennä Eriarvoisuuksia (KKT 10).
              Tuemme freelancausta ja työtuntien sekä työtapojen vapautta. Kuka vain jolla on jokin
              taito voi markkinoida palveluitaan ja tuotteitaan alustamme avulla. Olemme tiimi joka
              on valmis auttamaan sinua markkinoinnista verkkokehitykseen asti, jotta bisneksesi
              kasvu paranee. Samalla me haluamme nopeuttaa palvelujen löytymistä Suomessa ja
              muuallakin, tarjoamalla hyvin tarkastettuja ja korkealaatuisia freelancereita jotka
              tarjoavat moninaisia ja selkeitä hintoja. Välittömät varaukset ja sujuvat keskustelut
              myynnin nopeuttamiseksi sekä palvelujen ja tuotteiden ostamiseksi on päätavoitteemme.
            </p>
          </div>
        </div>
        <div className="kykyteam-cards">
          <div className="kykyteam-card-row">
            <div className="card-person">
              <div className="card-image">
                <img src={defaultJobImage} className="image" alt="" />
              </div>
              <div className="name-and-title">
                <div className="name">
                  <p>Claudia</p>
                </div>
                <div className="title">
                  <p>CEO</p>
                </div>
              </div>
              <div className="description">
                <p>
                  Muutokseen uskova, intohimoinen CEO varustettu lateraalisella ajattelumallilla.
                  Synnyltään italialainen, Suomen adoptoima ja kulkuri sielultaan. Elämä pyörii
                  kahden tyttären ja kolmen lemmikin ympärillä. Tiedustelut yhteistyöhön liittyen:
                  claudia@kyky.today
                </p>
              </div>
            </div>
            <div className="card-person">
              <div className="card-image">
                <img src={defaultJobImage} className="image" alt="" />
              </div>
              <div className="name-and-title">
                <div className="name">
                  <p>Vanja</p>
                </div>
                <div className="title">
                  <p>CMO</p>
                </div>
              </div>
              <div className="description">
                <p>
                  Tunneperäinen brändääjä, visuaalinen viestijä, yhteisön kehittäjä, joka on hyvä
                  ideoiden valtuuttamisessa. Perimmiltään CMO. Maailmanmatkaaja, musiikin rakastaja,
                  onnellinen äiti, jolla on pakkomielle kahviin. Tiedustelut markkinointiin ja
                  viestintään liittyen: vanja@kyky.today
                </p>
              </div>
            </div>
            <div className="card-person">
              <div className="card-image">
                <img src={defaultJobImage} className="image" alt="" />
              </div>
              <div className="name-and-title">
                <div className="name">
                  <p>Sami</p>
                </div>
                <div className="title">
                  <p>CTO</p>
                </div>
              </div>
              <div className="description">
                <p>
                  Älykäs CTO, innokas ohjelmistojen kehittäjä. Intohimona uudet teknologiat sekä
                  koodin täydelliseksi hiominen. Kokkaa kansainvälisillä mauilla ja on aina avoin
                  uusille resepteille. Tiedustelut teknologiaan sekä ohjelmiston kehitykseen
                  liittyen: sami@kyky.today
                </p>
              </div>
            </div>
          </div>
          <div className="kykyteam-card-row">
            <div className="card-person">
              <div className="card-image">
                <img src={defaultJobImage} className="image" alt="" />
              </div>
              <div className="name-and-title">
                <div className="name">
                  <p>Samuli</p>
                </div>
                <div className="title">
                  <p>MARKETING</p>
                </div>
              </div>
            </div>
            <div className="card-person">
              <div className="card-image">
                <img src={defaultJobImage} className="image" alt="" />
              </div>
              <div className="name-and-title">
                <div className="name">
                  <p>Thien</p>
                </div>
                <div className="title">
                  <p>MARKETING</p>
                </div>
              </div>
            </div>
            <div className="card-info">
              <div className="info-title">
                <p>MARKETING INTERN</p>
              </div>
              <div className="info-headline">
                <p>Avoin työpaikka</p>
              </div>
              <div className="info-text">
                <p>
                  Etsitkö työharjoittelupaikkaa markkinoinnin tai liiketoiminnan kehityksen aloilta?
                  Lähetä meille sähköpostilla meille CV:si ja haluamasi työpaikka osoitteeseen
                </p>
              </div>
              <div className="info-email-us">
                <div className="email-us-button"></div>
              </div>
            </div>
          </div>
          <div className="kykyteam-card-row">
            <div className="card-person">
              <div className="card-image">
                <img src={defaultJobImage} className="image" alt="" />
              </div>
              <div className="name-and-title">
                <div className="name">
                  <p>Tristan</p>
                </div>
                <div className="title">
                  <p>SOFTWARE DEVELOPER</p>
                </div>
              </div>
            </div>
            <div className="card-person">
              <div className="card-image">
                <img src={defaultJobImage} className="image" alt="" />
              </div>
              <div className="name-and-title">
                <div className="name">
                  <p>Samu</p>
                </div>
                <div className="title">
                  <p>SOFTWARE DEVELOPER</p>
                </div>
              </div>
            </div>
            <div className="card-info">
              <div className="info-title">
                <p>SOFTWARE DEVELOPER</p>
              </div>
              <div className="info-headline">
                <p>Avoin työpaikka</p>
              </div>
              <div className="info-text">
                <p>
                  Etsitkö työharjoittelupaikkaa markkinoinnin tai liiketoiminnan kehityksen aloilta?
                  Lähetä meille sähköpostilla meille CV:si ja haluamasi työpaikka osoitteeseen
                </p>
              </div>
              <div className="info-email-us">
                <div className="email-us-button"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KykyTeam;
