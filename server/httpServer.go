package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
)

var dir string
var questionData []Question
const (
    REQUEST_JSON int = iota
    REQUEST_HTML // question answer
    REQUEST_SELECT
)

func main() {
	dir, questionData, _ = readJSON()

	go httpServer()
	select {}
}

func httpServer() {
	// ハンドラ関数を定義
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		switch getRequestType(r.URL.Path) {
			case REQUEST_JSON:
				// JSONデータをエンコードしてHTTPレスポンスに書き込み
				w.Header().Set("Content-Type", "application/json")
				w.Header().Set("Access-Control-Allow-Origin", "*")
				w.WriteHeader(http.StatusOK)

				encoder := json.NewEncoder(w)
				if err := encoder.Encode(questionData); err != nil {
					log.Println("JSONエンコードエラー:", err)
					http.Error(w, "Internal Server Error", http.StatusInternalServerError)
					return
				}
			case REQUEST_HTML:
				// URLからファイル名を取得
				fileName := urlToPath(dir, r.URL.Path)

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
			case REQUEST_SELECT:
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

func getRequestType(url string) int {
	segments := strings.Split(url, "/")

	// 最初のセグメントは空文字列なので、2番目のセグメントを取得
	if len(segments) > 1 {
		switch segments[1] {
			case "JSON":
				return REQUEST_JSON
			case "HTML":
				return REQUEST_HTML
			case "SELECT":
				return REQUEST_SELECT
		}
	}
	return REQUEST_HTML
}

func urlToPath(dir string, url string) string {
	// URLパスをスラッシュで区切ってセグメントに分割
	segments := strings.Split(url, "/")

	// 最初のセグメントは空文字列なので、2番目のセグメントを取得
	if len(segments) > 1 {
		if segments[1] == "HTML"  {
			return dir + "/" + segments[2] + "/" + segments[3]
		} else {
			if url[0] == '/' {
				url = url[1:]
			}
			return url
		}
	}
	return ""
}