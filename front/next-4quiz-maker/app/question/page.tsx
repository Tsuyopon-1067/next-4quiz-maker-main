"use client"
import Image from 'next/image'
import styles from './page.module.css'
import React, { useState, useEffect } from "react";
//import SingleRadioButton from "../components/ui/singleRadioButton";
import RadioButtonGroup from "../components/ui/radioButtonGroup";
import HtmlArea from "../components/ui/htmlArea";


export default function Question() {
  const [nowPage, setNowPage] = useState<number>(1);
  const [jsonData, setJsonData] = useState(null);
  const [questionUrl, setQuestionUrl] = useState("");

  useEffect(() => {
    // ローカルサーバーからJSONデータを取得する
    fetch('http://localhost:50000/JSON', { method: 'GET' })
          .then((response) => response.json())
          .then((data) => {
            setJsonData(data[nowPage-1]);
            console.log(data[nowPage-1]);
            setQuestionUrl("http://localhost:50000/HTML/" + "question/" + data[nowPage-1].file)
          })
          .catch((error) => console.error('Error fetching JSON:', error));
      }, [nowPage]);

  if (jsonData == null) {
    return
  }
  return (
    <main className={styles.main}>
      <div className={styles.title_bar}>
        hogehoge question
      </div>
      <HtmlArea url={questionUrl} />
      <div className={styles.bottom_container}>
        <div className={styles.radio_button_area}>
          <RadioButtonGroup optionList={jsonData.options} onChange={function (optionNumber: number): void {}} />
        </div>
        <div className={styles.arrow_button_area}>
          <button className={styles.arrow_button}>⇦</button>
          <button className={styles.arrow_button}>⇨</button>
        </div>
      </div>
    </main>
  )
}
