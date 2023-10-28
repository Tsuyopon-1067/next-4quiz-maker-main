package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
)

func main() {
	readJSON()

	// ハンドラ関数を定義
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// URLからファイル名を取得
		fileName := "html" + r.URL.Path

		fmt.Println(fileName)
		// ファイルを読み込む
		file, err := os.Open(fileName)
		if err != nil {
			http.Error(w, "File not found", http.StatusNotFound)
			return
		}
		defer file.Close()

		// ファイルのMIMEタイプを設定
		setContentType(w, fileName)
		w.Header().Set("Access-Control-Allow-Origin", "*")

		// CORSヘッダーを設定
		setCORSHeaders(w)

		// ファイルの内容をレスポンスにコピー
		_, err = io.Copy(w, file)
		if err != nil {
			http.Error(w, "Error serving file content", http.StatusInternalServerError)
			return
		}
	})

	// サーバを指定したポートで起動
	port := 50000
	fmt.Printf("Server is running on :%d...\n", port)
	err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
	if err != nil {
		panic(err)
	}
}

// ファイルのMIMEタイプを設定する関数
func setContentType(w http.ResponseWriter, fileName string) {
	switch {
	case strings.HasSuffix(fileName, ".html"):
		w.Header().Set("Content-Type", "text/html")
	case strings.HasSuffix(fileName, ".css"):
		w.Header().Set("Content-Type", "text/css")
	default:
		w.Header().Set("Content-Type", "application/octet-stream")
	}
}

// CORSヘッダーを設定する関数
func setCORSHeaders(w http.ResponseWriter) {
	// リクエストを受け入れるオリジンを指定
	w.Header().Set("Access-Control-Allow-Origin", "*") // すべてのオリジンからのアクセスを許可
}