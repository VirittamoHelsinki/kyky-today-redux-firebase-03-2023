import { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import Language from '../language';

import Input from '../components/Input';
import Checkbox from '../components/Checkbox';
import '../styles/jobCreation.scss';
import FileUpload2 from '../components/FileUpload2';

export default function JobCreation() {
  const [url, setUrl] = useState('');

  const getImageUrl = (imgurl) => {
    setUrl(imgurl);
  };

  const { lang } = useContext(Language);
  return (
    <main className="wrapper fixed-centered profile">
      <form className="card light wide " onSubmit={(e) => e.preventDefault()}>
        <h1>{lang.job_creation.h1}</h1>
        <section>
          <Input
            type="text"
            name="jobTitle"
            label={lang.job_creation.job_title}
            placeholder={lang.job_creation.name}
          />
          <p>{lang.job_creation.job_description}</p>
          <input
            className="inputLarge"
            type="text"
            name="job_description"
            label={lang.job_creation.job_description}
            placeholder={''}
          />
          <Input
            type="text"
            name="job_category"
            label={lang.job_creation.job_category}
            placeholder={lang.job_creation.name}
          />
          <Input
            type="text"
            name="place"
            label={lang.job_creation.place}
            placeholder={lang.job_creation.name}
          />
        </section>
        <section>
          <Checkbox>
            <p>{lang.job_creation.insurance}</p>
          </Checkbox>
        </section>
        <section>
          <p>{lang.job_creation.standard_price} </p>
          <div className="inputContainer">
            <input
              className="inputShort"
              type="text"
              name="standard_price"
              label={lang.job_creation.standard_price}
              placeholder={''}
            />
            /<input className="inputShort"></input>
            <p>/h /km /m2 /person /slice</p>
          </div>
        </section>
        <section>
          <Checkbox>
            <p>{lang.job_creation.include_alv}</p>
          </Checkbox>
        </section>
        <section>
          <p>{lang.job_creation.add_price} </p>
          <div className="inputContainer2">
            <input
              className="inputShort"
              type="text"
              name="add_price"
              label={lang.job_creation.add_price}
              placeholder={''}
            />
            /<input className="inputShort"></input>
          </div>
        </section>
        <section>
          <p>{lang.job_creation.pictures}</p>
          <p>{url}</p>
          <div className="picContainer">
            <div className="picBox">
              <FileUpload2 getImageUrl={getImageUrl} />
            </div>
          </div>
        </section>
      </form>
    </main>
  );
}
