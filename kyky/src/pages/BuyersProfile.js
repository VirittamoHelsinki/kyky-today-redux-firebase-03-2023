import { useState } from 'react';
import '../styles/BuyersProfile.scss';
import OrderStatus from '../components/BuyersProfile/OrderStatus';

const Tabs = {
  Purchases: 'Ostokset',
  Messages: 'Viestit',
  Ratings: 'Arvostelut',
  Settings: 'Tilin asetukset'
};

const pendingOrders = [
  {
    job: 'Salapoliisityö',
    seller: 'Kyösti Pöysti',
    sum: (47.9).toFixed(2),
    orderingDate: '23.1.2023',
    orderStatus: 'Käsittelyssä'
  }
];

const deliveredOrders = [
  {
    job: 'Salapoliisityö',
    seller: 'Kyösti Pöysti',
    sum: 2115.55,
    orderingDate: '1.10.2022',
    orderStatus: '1.01.2023'
  },
  {
    job: 'Halloween juhlasuunnittelu',
    seller: 'Pelle Hermanni',
    sum: 600.55,
    orderingDate: '20.10.2022',
    orderStatus: '25.10.2022'
  },
  {
    job: 'Keskiajan miekkailutunti',
    seller: 'Johannes Liechtenauer',
    sum: 10000.65,
    orderingDate: '1.12.2022',
    orderStatus: '24.12.2023'
  }
];

function BuyersProfile() {
  const [currentTab, setCurrentTab] = useState(Tabs.Purchases);

  function selectedTab(currentTab) {
    setCurrentTab(currentTab);
  }

  return (
    <div className="buyers-profile--container">
      <div className="buyers-profile--header">
        <div
          className="userImage"
          style={{ width: '100px', height: '100px', background: '#387a70', borderRadius: '50px' }}
        />
        <div>
          <h3 className="username">Touko Pouko</h3>
        </div>
      </div>

      <div className="buyers-profile--content-wrapper">
        <div className="buyers-profile--tabs">
          <div
            className={`buyers-profile--button ${currentTab === Tabs.Purchases ? 'selected' : ''}`}
            onClick={() => selectedTab(Tabs.Purchases)}>
            <h3>Ostokset</h3>
          </div>
          <div
            className={`buyers-profile--button ${currentTab === Tabs.Messages ? 'selected' : ''}`}
            onClick={() => selectedTab(Tabs.Messages)}>
            <h3>Viestit</h3>
          </div>
          <div
            className={`buyers-profile--button ${currentTab === Tabs.Ratings ? 'selected' : ''}`}
            onClick={() => selectedTab(Tabs.Ratings)}>
            <h3>Arvostelut</h3>
          </div>
          <div
            className={`buyers-profile--button ${currentTab === Tabs.Settings ? 'selected' : ''}`}
            onClick={() => selectedTab(Tabs.Settings)}>
            <h3>Tilin asetukset</h3>
          </div>
        </div>

        <div className="buyers-profile--content">
          {currentTab === Tabs.Purchases && (
            <div className="buyers-profile--content-orders-container">
              <h4 className="title">Odottavat tilaukset</h4>

              <h4 className="title">Toimitetut tilaukset</h4>
              <table className="buyers-profile-table">
                <thead className="buyers-profile-table-header">
                  <tr>
                    <th className="job-header">Palvelu</th>
                    <th className="seller-header">Myyjä</th>
                    <th className="sum-header">Summa</th>
                    <th className="ordered-header">Ostettu</th>
                    <th className="delivered-header">Toimitettu</th>
                  </tr>
                </thead>
                <tbody className="buyers-profile-table-body">
                  {deliveredOrders.map((order, index) => (
                    <OrderStatus order={order} key={index} />
                  ))}
                </tbody>
              </table>
              <h4 className="title">Peruutetut tilaukset</h4>

              <h4 className="title">Tähdellä merkityt tilaukset</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BuyersProfile;
