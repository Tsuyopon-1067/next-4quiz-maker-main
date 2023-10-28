package main

import (
	"encoding/json"
	"fmt"
	"os"
)

type Question struct {
	Number  int      `json:"number"`
	File    string   `json:"file"`
	Answer  string   `json:"answer"`
	Options []string `json:"options"`
}

type QuizData struct {
	Rikutoku struct {
		Dir       string     `json:"dir"`
		Questions []Question `json:"questions"`
	} `json:"rikutoku"`
}

func readJSON() (string, []Question, error) {
	// JSONファイルを開く
	file, err := os.Open("json/rikutoku2.json")
	if err != nil {
		fmt.Println("ファイルを開けません:", err)
		return "", nil, err
	}
	defer file.Close()

	// JSONデータを読み込む
	fileInfo, err := file.Stat()
	if err != nil {
		fmt.Println("ファイル情報を取得できません:", err)
		return "", nil, err
	}

	jsonData := make([]byte, fileInfo.Size())
	_, err = file.Read(jsonData)
	if err != nil {
		fmt.Println("ファイルからデータを読み込めません:", err)
		return "", nil, err
	}

	// JSONデータを構造体にパース
	var quizData QuizData
	err = json.Unmarshal(jsonData, &quizData)
	if err != nil {
		fmt.Println("JSON パースエラー:", err)
		return "", nil, err
	}

	fmt.Printf("ディレクトリ: %s\n", quizData.Rikutoku.Dir)
	fmt.Printf("問題数: %d\n", len(quizData.Rikutoku.Questions))
	for _, question := range quizData.Rikutoku.Questions {
		fmt.Printf("問題 %d: ファイル %s, 正解 %s, オプション %v\n", question.Number, question.File, question.Answer, question.Options)
	}

	return quizData.Rikutoku.Dir, quizData.Rikutoku.Questions, nil
}