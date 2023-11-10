'use client';
import React, { useState, useEffect } from 'react';
import styles from './MaruBatsu.module.css';

const MaruBatsu: React.FC<{ isCorrect: boolean }> = ({ isCorrect }) => {

  if (isCorrect) {
    return (
      <p className={styles.maru}>O</p>
    );
  } else {
    return (
      <p className={styles.batsu}>X</p>
    );
  }
}

export default MaruBatsu;