import dogPic from '../image/martin-dalsgaard-sGV1QDMM0Gg-unsplash.jpg';
import {useState} from "react";
import Button from "../components/Button";
import Calendar from "../components/Calendar";

const Tabs = {
    Once: "Once",
    Recurring: "Recurring"
}

function ServiceBooking() {
    const [currentTab, setCurrentTab] = useState(Tabs.Once);
    const [date, setDate] = useState(new Date());

    return (
        <>
            <div className="service-booking-container">
                <div className="service-booking-left-panel">
                    <h1>I will walk your dog with love and care.</h1>
                    <div className="username-commented-as"><h2>John Doe</h2> was commented as:</div>
                    <p>"Punctual, friendly, dog lover, caring, responsible"</p>
                    <img src={dogPic} className="service-booking-left-panel-image"/>
                </div>
                <div className="service-booking-right-panel">
                    <div className="service-booking-right-panel-content">
                        <div className="service-booking-right-panel-buttons">
                            <div className={`panel-button ${currentTab === Tabs.Once ? 'selected' : ''}`} onClick={()=> setCurrentTab(Tabs.Once)}>Once</div>
                            <div className={`panel-button ${currentTab === Tabs.Recurring ? 'selected' : ''}`} onClick={()=> setCurrentTab(Tabs.Recurring)}>Recurring</div>
                        </div>
                        <Calendar date={date} setDate={setDate} minYears={0} maxYears={5}/>
                    </div>
                    <Button children={<div>Continue</div>}/>
                </div>
            </div>
            <div className="service-booking-footer">
                <Button children={<div>Contact Seller</div>}/>
            </div>
        </>
    );
}

export default ServiceBooking;
