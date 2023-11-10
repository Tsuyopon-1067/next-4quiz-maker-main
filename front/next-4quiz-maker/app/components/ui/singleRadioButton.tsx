import React, { useState } from 'react';
import styles from './singleRadioButton.module.css';

interface SingleRadioButtonProps {
  button_text: string;
  optionNumber: number;
  selectedNumber: number;
  onChange: (setSelectedNumber: number) => void;
}

const SingleRadioButton: React.FC<SingleRadioButtonProps> = ({ button_text, optionNumber, selectedNumber, onChange }) => {
  const isSelected = optionNumber === selectedNumber;

  const handleButtonClick = () => {
    onChange(optionNumber);
  };

  return (
    <div>
      <button
        className={isSelected ? styles.button_checked : styles.button_unchecked}
        onClick={handleButtonClick}
      >
        {button_text}
      </button>
    </div>
  );
}

export default SingleRadioButton;
