import './NoCustomer.css'
import NoCustomerImg from '../../assets/no_customer_selected.avif';

const NoCustomerSelected: React.FC = () => {
  return (
    <div className='no-customer-selected'>
        <img src={NoCustomerImg} alt="No Customer Selected" className="no-customer-image" />

      <h3> Oops!! No Customer selected!</h3>
      <p>Please select any customer to check the details.</p>
    </div>
  );
};

export default NoCustomerSelected;
