"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, FC } from "react";
//import SingleRadioButton from "../components/ui/singleRadioButton";
import RadioButtonGroup from "../components/ui/radioButtonGroup";
import HtmlArea from "../components/ui/htmlArea";


export default function Question() {
  const router = useRouter();
  const [nowPage, setNowPage] = useState<number>(0);
  const [jsonData, setJsonData] = useState(null);
  const [questionUrl, setQuestionUrl] = useState("");
  const nextPage = () => {
    if (jsonData != null) {
      if (nowPage+1 <= jsonData.length) {
        setNowPage(nowPage+1)
      }
    }
  }
  const prevPage = () => {
    if (nowPage >= 2) {
      setNowPage(nowPage-1)
    }
  }
  const clickEnd = () => {
    router.push('/result');
  }

  useEffect(() => {
    // ローカルサーバーからJSONデータを取得する
    if (nowPage === 0) {
      setNowPage(1);
      fetch('http://localhost:50000/JSON', { method: 'GET' })
            .then((response) => response.json())
            .then((data) => {
              setJsonData(data);
            })
            .catch((error) => console.error('Error fetching JSON:', error));
      }
    }, []);

  useEffect(() => {
    // jsonDataが更新された後にsetQuestionUrlを呼び出す
    if (jsonData != null) {
      setQuestionUrl("http://localhost:50000/HTML/" + "question/" + jsonData[nowPage-1].file);
    }
  }, [jsonData, nowPage]);

  var bottomButtomArray = [

  ]
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
          <RadioButtonGroup optionList={jsonData[nowPage-1].options} onChange={function (optionNumber: number): void {}} />
        </div>
        <ButtomButtoms prevPage={prevPage} nextPage={nextPage} clickEnd={clickEnd} nowPage={nowPage} lastPage={jsonData.length} />
      </div>
    </main>
  )
}

interface ButtomButtomsProps {
  prevPage: () => void;
  nextPage: () => void;
  clickEnd: () => void;
  nowPage: number;
  lastPage: number;
}

const ButtomButtoms: FC<ButtomButtomsProps> = (props) => {
  const { nowPage, lastPage, prevPage, nextPage, clickEnd } = props;
  var buttons;

  if (nowPage < lastPage) {
    buttons = (
      <>
        <button className={styles.arrow_button} onClick={prevPage}>⇦</button>
        <button className={styles.arrow_button} onClick={nextPage}>⇨</button>
      </>
    );
  } else {
    buttons = (
      <>
        <button className={styles.arrow_button} onClick={clickEnd}>終了</button>
        <button className={styles.arrow_button} onClick={prevPage}>⇦</button>
        <button className={`${styles.arrow_button} ${styles.hide_button}`} onClick={nextPage}>⇨</button>
      </>
    );
  }

  return (
    <div className={styles.arrow_button_area}>
      {buttons}
    </div>
  );
}