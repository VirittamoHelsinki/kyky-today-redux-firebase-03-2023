import { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createJobForm } from '../redux/sellers/jobCreationFormSlice';
import Language from '../language';
import Input from '../components/Input';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import '../styles/jobCreation.scss';
import FileUpload2 from '../components/FileUpload2';

export default function JobCreation() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setGategory] = useState('');
  const [place, setPlace] = useState('');
  const [insurance, setIncurance] = useState(false);
  const [price, setPrice] = useState('');
  const [includeVAT, setIncludeVAT] = useState(false);
  const [addPrice, setAddPrice] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createJobForm({
        uid: user.uid,
        title: title,
        description: description,
        category: category,
        place: place,
        insurance: insurance,
        price: price,
        includeVAT: includeVAT,
        addPrice: addPrice,
        url: url
      })
    );
  };

  const urlToForm = (u) => {
    setUrl(u);
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
            value={title}
            label={lang.job_creation.job_title}
            placeholder={lang.job_creation.name}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <p>{lang.job_creation.job_description}</p>
          <input
            className="inputLarge"
            type="text"
            name="job_description"
            value={description}
            label={lang.job_creation.job_description}
            placeholder={''}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <Input
            type="text"
            name="job_category"
            value={category}
            label={lang.job_creation.job_category}
            placeholder={lang.job_creation.name}
            onChange={(e) => {
              setGategory(e.target.value);
            }}
          />
          <Input
            type="text"
            name="place"
            value={place}
            label={lang.job_creation.place}
            placeholder={lang.job_creation.name}
            onChange={(e) => {
              setPlace(e.target.value);
            }}
          />
        </section>
        <section>
          <Checkbox
            onChange={(e) => {
              setIncurance(e.target.checked);
            }}>
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
              value={price}
              label={lang.job_creation.standard_price}
              placeholder={''}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            /<input className="inputShort"></input>
            <p>/h /km /m2 /person /slice</p>
          </div>
        </section>
        <section>
          <Checkbox
            onChange={(e) => {
              setIncludeVAT(e.target.checked);
            }}>
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
              value={addPrice}
              label={lang.job_creation.add_price}
              placeholder={''}
              onChange={(e) => {
                setAddPrice(e.target.value);
              }}
            />
            /<input className="inputShort"></input>
          </div>
        </section>
        <section>
          <p>{lang.job_creation.pictures}</p>
          <div className="picContainer">
            <div className="picBox">
              <FileUpload2 urlToForm={urlToForm} />
            </div>
          </div>
        </section>
        <section>
          <Button type="submit" onClick={handleSubmit}>
            Julkaise
          </Button>
        </section>
      </form>
    </main>
  );
}
