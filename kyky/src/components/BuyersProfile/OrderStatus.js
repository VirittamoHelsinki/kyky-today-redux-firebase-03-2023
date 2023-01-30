import PropTypes from 'prop-types';
import jobImage from '../../image/martin-dalsgaard-sGV1QDMM0Gg-unsplash.jpg';
import '../../styles/BuyersProfile.scss';

export default function OrderStatus({ order }) {
  return (
    <tr className="buyers-profile-table-body-row">
      <td className="job-div">
        <img src={jobImage} className="job-image-small" alt="" />
        <span>{order.job}</span>
      </td>
      <td className="seller-div">{order.seller}</td>
      <td className="sum-div">{order.sum}</td>
      <td className="ordered-div">{order.orderingDate}</td>
      <td className="delivered-div">{order.orderStatus}</td>
    </tr>
  );
}

OrderStatus.propTypes = {
  order: PropTypes.shape({
    job: PropTypes.string,
    seller: PropTypes.string,
    sum: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    orderingDate: PropTypes.string,
    orderStatus: PropTypes.string
  })
};
