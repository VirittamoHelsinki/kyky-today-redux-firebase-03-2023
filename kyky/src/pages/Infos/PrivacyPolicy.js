import { useEffect } from 'react';
import '../../styles/TermsAndPrivacy.scss';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="terms-and-privacy-main">
      <p className="headline-bold">KYKY OY TIETOSUOJASELOSTE</p>

      <p>VOIMAANTULOPÄIVÄ: 1. SYYSKUUTA 2020,</p>

      <p>
        Rekisterinpitäjä Kyky Oy (myöhemmin Kyky, yhteystiedot: Hiidenportti 8A2, 02750 Espoo,
        yhteyshenkilö: board@kyky.today on sitoutunut parantamaan yksityisyyttä ja noudattaa
        sovellettavia tietosuojalakeja Suomessa sekä EU:n yleistä tietosuoja-asetusta (GDPR).
      </p>

      <p className="headline-bold">1. Miksi me keräämme tietoja?</p>

      <p>
        Kyky:n tehtävänä on mahdollistaa yhteys yritysten / freelancereiden ja asiakkaiden välillä
        helpommalla tavalla tarjoamalla näkyvyyttä ja mahdollisuuden välittömään töiden tilaukseen.
        Kyky:n palvelut tarjoavat räätälöintiä ja joustavuutta sekä kustannustehokkaita ratkaisuja
        asiakkaille, jotka etsivät palveluita sekä verkossa että offline-tilassa.
      </p>

      <p className="headline-bold">2. Kuinka keräämme tietoja?</p>

      <p>
        Keräämme tietoja Kyky palveluiden (verkkosivusto / sovellus / sähköposti / sosiaalinen media
        / kasvokkain) käytön kautta. Pyytämiämme, keräämiämme ja käsittelemiämme tietoja käytetään
        ensisijaisesti tarjoamaan asiakkaille palveluita, joita he hakevat alustoiltamme.
        <br />
        Tarkentaen, saatamme käyttää tietojasi seuraaviin tarkoituksiin: <br /> - tarjotaksemme
        pyydettyä palvelua, esimerkiksi rekisteröinti Kyky alustalle tai sosiaaliseen mediaan <br />
        - helpottaaksemme käyttäjäprofiili sivun luomista <br /> - pyytämäsi tuen tarjoamiseksi;
        <br /> - vastattavaksemme palveluitamme koskeviin kyselyihin, tai vastataksemme
        reklamaatioihin; <br /> - maksaaksemme tarjoamasi palvelut
        <br /> - mainostaaksemme sinua sosiaalisen median kanavilla ja / tai mainostaaksemme
        palveluitamme tai tuotteitamme, jotka saattavat kiinnostaa sinua (ellet ole estänyt
        tällaista viestintää);
        <br /> - mahdollistaaksemme alustojemme virheenkorjauksen, testauksen ja muun käytön; <br />
        - suorittaaksemme tietojen analysointia sekä muuten rakentaa ja parantaa alustojamme; <br />
        - noudattaaksemme lakien ja säännösten mukaisia velvoitteita;
      </p>

      <p className="headline-bold">3. Mitä tietoja keräämme?</p>

      <p>
        Vaikka käytät alustaamme palveluihimme, saatamme pyytää sinua antamaan tietyntyyppisiä
        henkilökohtaisia tietoja. Pyyntö voi tapahtua Kyky-verkkosivustomme, sosiaalisen median
        kanavien, mobiilisovelluksen, online-chat-järjestelmien, sähköpostien, puhelin-, tai
        paperilomakkeiden kautta taikka henkilökohtaisesti. Annamme sinulle keräilyilmoituksen
        tuolloin selittääksemme kuinka käytämme henkilökohtaisia tietojasi. Ilmoitus voi olla
        kirjallinen tai suullinen. Erityisesti voimme kerätä tai käsitellä seuraavia tietoja:
        Käyttäjätiedot – nimi, sukunimi, sähköpostiosoite / -osoitteet, puhelinnumero / -numerot,
        sijainti / sijainnit, pankkitilin tiedot, yrityksen nimi / nimet, laskutusosoite. Käyttäjän
        luoma sisältö – profiilisi, joka sisältää taitosi, portfolion, ansioluettelosi,
        profiilikuvan, videot, arvostelut ja kalenterisi, ajan saatavuuden näkyvän ja varattavan
        kalenterin kautta. Tiedot, jotka päätät julkaista Kyky-alustoilla, eivät ole enää
        yksityisiä, samoin kuin kaikki verkossa julkaisemasi tiedot, mutta pidät itselläsi oikeuden
        tulla unohdetuksi sekä oikeuden pyytää poistamaan hallussaan olevat tiedot kokonaan.
      </p>

      <p className="headline-bold">4. Lasten yksityisyyden suojaaminen</p>

      <p>
        Vaikka verkkosivustomme ei ole suunniteltu alle 15-vuotiaiden käyttöön, ymmärrämme, että
        alle 15-vuotias lapsi voi yrittää käyttää Kyky-alustaa tai palveluita. Emme kerää
        tietoisesti henkilötietoja alle 15-vuotiailta lapsilta. Jos olet vanhempi tai huoltaja ja
        uskot, että lapsesi käyttää verkkosivustoamme, ota meihin yhteyttä. Ennen tietojen
        poistamista voimme pyytää henkilöllisyyttä koskevia todisteita tilitietojen vahingollisen
        poistamisen estämiseksi. Jos huomaat, että lapsi käyttää verkkosivustojamme, poistamme hänen
        tiedot kohtuullisen ajan kuluessa. Ymmärrät, että emme tarkista käyttäjien ikää, eikä meillä
        ole mitään vastuuta siitä.
      </p>

      <p className="headline-bold">5. Mikä on tiedonkeruun perusta?</p>

      <p>
        Tiedonkeruun perusta on Kykyn oikeutettu kiinnostus, joka perustuu asiakkaidesi ja sinun
        suhteeseesi. Tiedonkeruu voi myös perustua sopimuksen tai suostumuksesi suorittamiseen.
      </p>

      <p className="headline-bold">6. Kuinka suojaamme ja tallennamme tietoja?</p>

      <p>
        Teemme asianmukaiset toimenpiteet huomioidaksemme sekä fyysistä että online-tietoturvaa,
        tietojen katoamisen tai rikkomisen riskiä ja muita vastaavia riskejä ottaen aina huomioon
        käsiteltävän tiedon luonteen. Rajoitamme pääsyä tietokantaamme vain valtuutetuille
        henkilöille, joilla on perusteltu tarve käyttää näitä tietoja.
      </p>

      <p className="headline-bold">7. Kuinka tietoja käytetään?</p>

      <p>
        Kun rekisteröidyt Kyky-verkkosivustoon tai käytät sitä asiakkaana, pyydämme sinua antamaan
        tiettyjä henkilökohtaisia tietoja, mukaan lukien voimassa oleva sähköpostiosoite. Kyky
        käyttää keräämiämme tietoja liiketoimintaamme ja palvelun tarjoamiseen, joka sisältää
        tietojen käytön palvelumme parantamiseksi ja kokemuksiesi mukauttamiseksi sekä tietojen ja
        analytiikan jakamiseksi ihmisten arjen liiketoiminnan parantamiseksi (GDPR-yhteensopiva).
      </p>

      <p>
        Kaikki palveluun liittyvä viestintä – tietoturvapäivitykset ja tuotetiedot – tulee tapahtua
        verkkosivustomme tai sovelluksemme kautta.
      </p>

      <p className="headline-bold">8. Kenen kanssa se jaetaan?</p>

      <p>
        Tietoja jaetaan Kyky:n käyttäjien ja asiakkaiden kanssa ihmisten jokapäiväisen liiketoiminta
        yhteyden parantamiseksi, kuten on mainittu kohdassa “Miksi me keräämme tietoja?”
      </p>

      <p className="headline-bold">Onko meidän mainittava kolmannet osapuolet?</p>

      <p>
        Tätä käytäntöä sovelletaan vain verkkosivustoihimme ja sosiaaliseen mediaan sekä tietoihin,
        joita keräämme sinulta. Kyky-alustamme voi sisältää linkkejä muille verkkosivustoille, jotka
        eivät ole meidän omistamia tai ylläpitämiä. Käydessäsi näillä kolmansien osapuolten
        verkkosivustoilla tai luovuttamalla henkilötietojasi kolmansille osapuolille (esimerkiksi
        verkkosivuillamme oleville myyjille / yrityksille), sinun tulee lukea ja hyväksyä heidän
        tietosuojakäytäntönsä tai esittää tärkeitä kysymyksiä ennen kuin paljastat henkilökohtaisia
        tietojasi. Emme ole vastuussa henkilötietojesi keräämisestä, käytöstä tai paljastamisesta
        kolmansien osapuolten toimesta.
      </p>

      <p className="headline-bold">9. Tietojen säilyttäminen</p>

      <p>
        Määräajat, joiden ajan tietojamme säilytetään, riippuvat tietojen keräämisen tarkoituksesta
        ja niiden käytöstä. Emme säilytä henkilötietojasi kauemmin kuin on tarpeen liiketoimintamme
        tarkoituksiin tai lakisääteisiin vaatimuksiin.Viiden vuoden (5) jakson jälkeen tietoja
        säilytetään vain aggregoidulla tasolla.
      </p>

      <p className="headline-bold">10. Oikeutesi</p>

      <p>
        Sinulla on useita oikeuksia tietojen keräämiseen ja käyttöön. Sinulla on oikeus: <br /> -
        Pyytää tietää, mitä tietoja on kerätty ja tallennettu <br /> - Pyytää oikaisemaan
        henkilötietojasi <br /> - Vastustaa henkilökohtaisten tietojesi käsittelyä <br /> - Pyytää
        henkilökohtaisten tietojesi käytön rajoittamista, jos mielestäsi i) tiedot ovat vääriä, ii)
        käsittely on laitonta ja vastustat tietojen poistamista; iii) me emme tarvitse tietoja,
        mutta tarvitset sitä vaatimuksen esittämiseen tai puolustamiseen tai iv) olet vastustanut
        käsittelyä, eikä ole vielä selvitetty, ylittävätkö etumme sinun etusi. <br /> - Pyytää tulla
        unohdetuksi ja kaikkien tietojesi poistamista <br /> - Pyytää henkilökohtaisten tietojesi
        siirtoa Peruuttaa henkilökohtaisten tietojesi käsittelyä koskeva suostumus milloin tahansa
        vaikuttamatta suostumukseen perustuvan käsittelyn laillisuuteen ennen peruuttamista.
      </p>

      <p>
        Voit suorittaa pyynnön/pyynnöt lähettämällä sähköpostia osoitteeseen board@kyky.today
        aihekentän kanssa, joka selittää pyyntösi (pyynnöt),
      </p>

      <p>
        - Paikallisen lain salliessa voimme hylätä perusteettomat tai liialliset pyynnöt <br /> -
        Vastaamme pyyntöihisi kohtuullisessa ajassa. Jos olet pyytänyt tulla unohdetuksi ja tietosi
        on poistettu, et enää pääse palveluihimme, koska meillä ei enää ole palvelun tarjoamiseen
        tarvittavia tietoja.
      </p>

      <p className="headline-bold">11. Tietosuojavastaavan yhteystiedot</p>

      <p>
        Kyky Oy: n tietosuojavastaava on Vanja La Vecchia-Mikkola. Tietosuojavastaavaan voidaan
        ottaa yhteyttä yhdellä seuraavista sähköpostiosoitteista: vanja@kyky.today
      </p>

      <p>
        Jos sinulla on kysyttävää tai valituksia tämän tietosuojakäytännön noudattamisesta, tai jos
        haluat antaa suosituksia tai kommentteja tietosuojakäytäntömme laadun parantamiseksi, lähetä
        meille sähköpostia osoitteeseen board@kyky.today
      </p>

      <p className="headline-bold">12. Muutokset tietosuojaselosteeseen</p>

      <p>
        Pidätämme oikeuden päivittää tätä tietosuojailmoitusta milloin tahansa. Jos muokkaamme
        tietosuojailmoitusta, lähetämme tarkistetun version kyky.today- verkkosivustolle ja kaikkiin
        kosketuspisteihimme ja sosiaaliseen mediaan.
      </p>

      <p>
        Kyky.today on sitoutunut parantamaan yksityisyyttä ja noudattaa Suomessa sovellettavia
        tietosuojalakeja sekä EU:n yleistä tietosuoja-asetusta (GDPR).
      </p>
    </div>
  );
};

export default PrivacyPolicy;
