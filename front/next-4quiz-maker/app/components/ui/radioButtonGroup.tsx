import Image from 'next/image';
import styles from './radioButtonGroup.module.css';
import React, { useState } from "react";
import SingleRadioButton from "./singleRadioButton";

interface RadioButtonGroupProps {
  size: number;
  onChange: (selectedOption: number) => void;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ size, onChange }) => {
  const [selected, setSelected] = useState<number>(0);

  const handleRadioButtonClick = (optionNumber: number) => {
    setSelected(optionNumber);
    onChange(optionNumber);
  };

  const radioButtons = [];
  for (let i = 1; i <= size; i++) {
    radioButtons.push(
      <SingleRadioButton
        button_text={String(i)}
        optionNumber={i}
        selectedNumber={selected}
        onChange={handleRadioButtonClick}
      />
    );
  }

  return <div className={styles.main}>{radioButtons}</div>;
}

export default RadioButtonGroup;
