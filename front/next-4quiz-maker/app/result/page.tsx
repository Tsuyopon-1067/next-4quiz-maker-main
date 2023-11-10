"use client"
import Link from 'next/link'
import styles from './page.module.css'
import React, { useState, useEffect } from "react";
import ResultArea from "../components/ui/resultArea";

interface ResultJson {
  num: number;
  Selected: number;
  Answer: number;
}

interface QuizJson {
  number: number;
  file: string;
  answer: number;
  options: string[];
}

export default function Result() {
const [resultJsonData, setResultJsonData] = useState<ResultJson | null>(null);
const [quizJsonData, setQuizJsonData] = useState<QuizJson[] | null>(null);

  useEffect(() => {
    // ローカルサーバーからJSONデータを取得する
    if (resultJsonData === null) {
      fetch('http://localhost:50000/GET_RESULT', { method: 'GET' })
            .then((response) => response.json())
            .then((data) => {
              setResultJsonData(data);
              console.log(data);
            })
            .catch((error) => console.error('Error fetching JSON:', error));
      }
    if (quizJsonData === null) {
      fetch('http://localhost:50000/JSON', { method: 'GET' })
            .then((response) => response.json())
            .then((data) => {
              setQuizJsonData(data);
              console.log("hogehoge");
              console.log(data);
            })
            .catch((error) => console.error('Error fetching JSON:', error));
      }
  }, []);

  if (resultJsonData === null || quizJsonData === null) {
    return
  }
  return (
    <div className={styles.main}>
      <div className={styles.title_bar}>
        解答
      </div>
      <div className={styles.card}>
        <div className={styles.content}>
          <div className={styles.card_element}>#</div>
          <div className={styles.card_element}>正誤</div>
          <div className={styles.card_element}>あなたの回答</div>
          <div className={styles.card_element}>正解</div>
          <div className={styles.card_element}>問題</div>
          <div className={styles.card_element}>解説</div>
        </div>
        <div>
          {resultJsonData.map((elem: ResultJson, index: number) => (
            <div key={index}>
              <ResultArea
              num={index+1}
              selected={quizJsonData[index].options[elem.Selected]}
              answer={quizJsonData[index].options[elem.Answer]}
              questionUrl={"http://localhost:50000/HTML/question/" + quizJsonData[index].file}
              answerUrl={"http://localhost:50000/HTML/answer/" + quizJsonData[index].file} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
