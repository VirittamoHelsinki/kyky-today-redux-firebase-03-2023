import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import OrderStatus from '../../components/BuyersProfile/OrderStatus';
import '../../styles/BuyersProfile.scss';

const Purchases = ({ order }) => {
  const setSelectedWindow = useOutletContext();

  useEffect(() => {
    setSelectedWindow('purchases');
  }, []);

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

  const cancelledOrders = [];
  function tableHeader() {
    return (
      <thead className="buyers-profile-table-header">
        <tr>
          <th className="job-header">Palvelu</th>
          <th className="seller-header">Myyjä</th>
          <th className="sum-header">Summa</th>
          <th className="ordered-header">Ostettu</th>
          <th className="delivered-header">Toimitettu</th>
        </tr>
      </thead>
    );
  }

  function emptyTable() {
    return (
      <tr className="buyers-profile-table-body-row">
        <td className="job-div">Ei näytettäviä tilauksia...</td>
        <td className="seller-div"></td>
        <td className="sum-div"></td>
        <td className="ordered-div"></td>
        <td className="delivered-div"></td>
      </tr>
    );
  }

  return (
    <div className="buyers-profile--content-orders-container">
      <h4 className="title">Odottavat tilaukset</h4>
      <table className="buyers-profile-table" cellPadding="0" cellSpacing="0">
        {tableHeader()}
        <tbody className="buyers-profile-table-body">
          {pendingOrders.length > 0
            ? pendingOrders.map((order, index) => <OrderStatus order={order} key={index} />)
            : emptyTable()}
        </tbody>
      </table>
      <h4 className="title">Toimitetut tilaukset</h4>
      <table className="buyers-profile-table" cellPadding="0" cellSpacing="0">
        {tableHeader()}
        <tbody className="buyers-profile-table-body">
          {deliveredOrders.length > 0
            ? deliveredOrders.map((order, index) => <OrderStatus order={order} key={index} />)
            : emptyTable()}
        </tbody>
      </table>
      <h4 className="title">Peruutetut tilaukset</h4>
      <table className="buyers-profile-table" cellPadding="0" cellSpacing="0">
        {tableHeader()}
        <tbody className="buyers-profile-table-body">
          {cancelledOrders.length > 0
            ? cancelledOrders.map((order, index) => <OrderStatus order={order} key={index} />)
            : emptyTable()}
        </tbody>
      </table>
      <h4 className="title">Tähdellä merkityt tilaukset</h4>
    </div>
  );
};

export default Purchases;
