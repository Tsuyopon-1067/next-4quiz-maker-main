import Image from 'next/image';
import styles from './radioButtonGroup.module.css';
import React, { useState } from "react";
import SingleRadioButton from "./singleRadioButton";

interface RadioButtonGroupProps {
  optionList: string[];
  onChange: (selectedOption: number) => void;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ optionList, onChange }) => {
  const [selected, setSelected] = useState<number>(0);

  const handleRadioButtonClick = (optionNumber: number) => {
    setSelected(optionNumber);
    onChange(optionNumber);
  };

  const radioButtons = [];
  for (let i = 0; i < optionList.length; i++) {
    radioButtons.push(
      <SingleRadioButton
        button_text={optionList[i]}
        optionNumber={i+1}
        selectedNumber={selected}
        onChange={handleRadioButtonClick}
      />
    );
  }

  return <div className={styles.main}>{radioButtons}</div>;
}

export default RadioButtonGroup;
