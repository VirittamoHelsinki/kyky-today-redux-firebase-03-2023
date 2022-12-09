import dogPic from '../image/martin-dalsgaard-sGV1QDMM0Gg-unsplash.jpg';
import { useState } from 'react';
import Button from '../components/Button';
import Calendar from '../components/Calendar';
import SelectDays from '../components/SelectDays';
import Checkbox from '../components/Checkbox';

const Tabs = {
  Once: 'Once',
  Recurring: 'Recurring'
};

const defaultJob = {
  job: 'Dog Walker',
  title: 'I will walk your dog with love and care',
  comment: { author: 'John Doe', comment: 'Punctual, friendly, dog lover, caring, responsible' },
  prices: {
    weekday: 25,
    weekend: 30,
    everyOtherWeekday: 22,
    everyOtherWeekend: 25,
    onceEveryMonth: 25
  }
};

const defaultCheckedState = {
  checked: '', selectedDays: []
};

function ServiceBooking() {
  const [job, setJob] = useState(defaultJob);
  const [currentTab, setCurrentTab] = useState(Tabs.Once);
  const [isChecked, setIsChecked] = useState(defaultCheckedState);
  const [date, setDate] = useState(new Date());

  console.log(isChecked);

  function check(value) {
    setIsChecked({ ...isChecked, checked: value });
  }

  function selectedDays(e) {
    let newArray = e;
    setIsChecked({ ...isChecked, selectedDays: e });
  }


  return (
    <>
      <div className="booking-page-content">
        <div className='service-booking-container'>

          <div className='service-booking-left-panel'>
            <h1>{job.title}</h1>
            <div className='username-commented-as'><h2>{job.comment.author}</h2> was commented as:</div>
            <p>{job.comment.comment}</p>
            <img src={dogPic} className='service-booking-left-panel-image' />
          </div>

          <div className='service-booking-right-panel'>
            <div className='service-booking-right-panel-content'>
              <div className='service-booking-right-panel-buttons'>
                <div className={`panel-button ${currentTab === Tabs.Once ? 'selected' : ''}`}
                     onClick={() => setCurrentTab(Tabs.Once)}>Once
                </div>
                <div className={`panel-button ${currentTab === Tabs.Recurring ? 'selected' : ''}`}
                     onClick={() => setCurrentTab(Tabs.Recurring)}>Recurring
                </div>
              </div>

              {currentTab === Tabs.Once &&
              <Calendar date={date} setDate={setDate} minYears={0} maxYears={5} />}

              {currentTab === Tabs.Recurring && <div className='recurring-tab-container'>
                <div className='checkbox-wrapper'>
                  <div className='checkbox-wrapper-row'>
                    <div className='recurring-text'>
                      <Checkbox className='checkbox' label='Every weekday'
                                checked={isChecked.checked === 'weekday'} onChange={() => check('weekday')} />
                    </div>
                    <div className='recurring-price'>{job.prices.weekday} €/h</div>
                    {isChecked.checked === 'weekday' && <SelectDays selectedDays={selectedDays} />}
                  </div>

                  <div className='checkbox-wrapper-row'>
                    <div className='recurring-text'>
                      <Checkbox className='checkbox' label='Every weekend'
                                checked={isChecked.checked === 'weekend'} onChange={() => check('weekend')} />
                    </div>
                    <div className='recurring-price'>{job.prices.weekend} €/h</div>
                    {isChecked.checked === 'weekend' && <SelectDays selectedDays={selectedDays} />}
                  </div>

                  <div className='checkbox-wrapper-row'>
                    <div className='recurring-text'>
                      <Checkbox className='checkbox' label='Every other weekday'
                                checked={isChecked.checked === 'everyOtherWeekday'}
                                onChange={() => check('everyOtherWeekday')} />
                    </div>
                    <div className='recurring-price'>{job.prices.weekend} €/h</div>
                    {isChecked.checked === 'everyOtherWeekday' && <SelectDays selectedDays={selectedDays} />}
                  </div>

                  <div className='checkbox-wrapper-row'>
                    <div className='recurring-text'>
                      <Checkbox className='checkbox' label='Every other weekend'
                                checked={isChecked.checked === 'everyOtherWeekend'}
                                onChange={() => check('everyOtherWeekend')} />
                    </div>
                    <div className='recurring-price'>{job.prices.weekend} €/h</div>
                    {isChecked.checked === 'everyOtherWeekend' && <SelectDays selectedDays={selectedDays} />}
                  </div>

                  <div className='checkbox-wrapper-row'>
                    <div className='recurring-text'>
                      <Checkbox className='checkbox' label='Once every month'
                                checked={isChecked.checked === 'onceEveryMonth'}
                                onChange={() => check('onceEveryMonth')} />
                    </div>
                    <div className='recurring-price'>{job.prices.weekend} €/h</div>
                    {isChecked.checked === 'onceEveryMonth' && <SelectDays selectedDays={selectedDays} />}
                  </div>
                </div>
              </div>
              }

            </div>
            <Button
              onClick={() => alert(`Thank you for booking the job ${defaultJob.job}! You have booked ${defaultJob.job} for ${isChecked.checked} for the following days: ${isChecked.selectedDays.map(day => day.label)}`)}
              children={<div>Continue</div>} />
          </div>
        </div>
        <div className='service-booking-footer'>
          <Button children={<div>Contact Seller</div>} />
        </div>
      </div>
    </>
  );
}

export default ServiceBooking;
