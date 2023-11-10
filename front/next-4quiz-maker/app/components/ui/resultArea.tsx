'use client';
import React, { useState, useEffect } from 'react';
import styles from './resultArea.module.css';
import MaruBatsu from './MaruBatsu';

interface ResultAreaProps {
    num: number
    selected: string
    answer: string
    questionUrl: string
    answerUrl: string
}

const ResultArea: React.FC<ResultAreaProps> = (props) => {
  const { num, selected, answer, questionUrl, answerUrl } = props;
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.card_element}>{num}</div>
        <div className={styles.card_element}><MaruBatsu isCorrect={selected === answer} /></div>
        <div className={styles.card_element}>{selected}</div>
        <div className={styles.card_element}>{answer}</div>
        <div className={styles.card_element}>
          <div className={styles.button}>
            <a href={questionUrl}>問題</a>
          </div>
        </div>
        <div className={styles.card_element}>
          <div className={styles.button}>
            <a href={answerUrl}>解説</a>
          </div>
        </div>
      </div>
    </div>
  );
}


export default ResultArea;