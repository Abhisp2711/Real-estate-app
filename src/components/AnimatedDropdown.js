import React, { useState } from 'react';
import '../styles/AnimatedDropdown.css'; // We'll write this next

const AnimatedDropdown = ({ value, onChange }) => {
  const options = [
    { label: 'All Types', value: '' },
    { label: 'Rent', value: 'rent' },
    { label: 'Buy', value: 'buy' },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = (index) => {
    setSelectedIndex(index);
    onChange({ target: { name: 'type', value: options[index].value } });
    setIsOpen(false);
  };

  return (
    <div className="dropdown" onClick={() => setIsOpen(!isOpen)}>
      <h1 className={`selected-${selectedIndex + 1}`}>
        {options[selectedIndex].label}
      </h1>
      <ul style={{ display: isOpen ? 'block' : 'none' }}>
        {options.map((option, idx) => (
          <li
            key={option.value}
            className={idx === selectedIndex ? 'selected' : ''}
            onClick={() => handleSelect(idx)}
          >
            <b>{option.label}</b>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnimatedDropdown;
