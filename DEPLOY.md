# 部署與手機訪問

## 方法一：Netlify（最簡單）
1. 前往 Netlify 並登入。
2. 建立新網站，選擇「Drag & Drop」。
3. 把整個資料夾拖入（包含 `index.html`、`styles.css`、`app.js`、`manifest.webmanifest`、`sw.js`、`icons/`）。
4. 會自動得到公開網址，手機 Chrome 直接打開即可。

## 方法二：Vercel（命令列）
1. 安裝並登入 Vercel CLI。
2. 在此資料夾執行：
   ```bash
   npx vercel
   ```
3. 完成後會得到公開網址。

## 方法三：GitHub Pages
1. 建立 GitHub repo 並推送這個資料夾內容。
2. GitHub Repo 設定中打開 Pages，選 `main` 分支 / root。
3. 等待部署完成後使用提供的網址。

## 同網路手機測試（不公開）
1. 在電腦端執行：
   ```bash
   cd "/Users/ruoyanwu/Documents/[PJ-007]AAA"
   python3 -m http.server 8000
   ```
2. 手機與電腦連同一 Wi‑Fi，手機瀏覽器打開：
   `http://<你的電腦IP>:8000`
