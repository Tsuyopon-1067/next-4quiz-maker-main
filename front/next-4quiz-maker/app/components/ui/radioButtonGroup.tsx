import Image from 'next/image';
import styles from './radioButtonGroup.module.css';
import React, { useEffect, useState } from "react";
import SingleRadioButton from "./singleRadioButton";

interface RadioButtonGroupProps {
  optionList: string[];
  selectedOption: number;
  onChange: (sendOption: number) => void;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = (props) => {
  const {optionList, selectedOption} = props;
  const [selected, setSelected] = useState<number>(0);

  const handleRadioButtonClick = (optionNumber: number) => {
    setSelected(optionNumber);
  };

  useEffect(() => {
    if (props.onChange) {
      props.onChange(selected);
    }
  }, [selected]);

  const radioButtons = [];
  for (let i = 0; i < optionList.length; i++) {
    radioButtons.push(
      <SingleRadioButton
        key={i+1}
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
