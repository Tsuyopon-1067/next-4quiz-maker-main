'use client';
import React, { useState, useEffect } from 'react';
import styles from './htmlArea.module.css';

interface HtmlAreaProps {
    url: string
}

const HtmlArea: React.FC<HtmlAreaProps> = ({ url }) => {
  return (
    <iframe className={styles.iframe} src={url}></iframe>
  );
}

export default HtmlArea;