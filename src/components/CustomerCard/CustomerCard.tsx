import React, { memo } from 'react';
import { Customer } from '../../types/CustomerList';
import './CustomerCard.css'

interface CustomerCardProps {
  customer: Customer;
  isSelected: boolean;
  onSelect: () => void;
}

// Shorten text function
const shortenText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const CustomerCard: React.FC<CustomerCardProps> = memo(({ customer, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`customer-card ${isSelected ? 'selected' : ''}`}
      role="button"
      tabIndex={0} 
      aria-selected={isSelected}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
    >
      <h3>{shortenText(customer.name, 50)}</h3>
      <p>{shortenText(customer.title, 190)}</p>
    </div>
  );
});

export default CustomerCard;
