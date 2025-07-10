# 010_blog_platform 設計

## 1. システム概要

### 1-1. 目的
ブログプラットフォームでユーザーが記事を投稿、更新、閲覧できるシステム

## 2. 機能要件

### 2-1. 記事一覧
- 登録している記事が一覧表示できること
- ページング機能が実装されること
  - 1ページに表示できる数は10ページ
- 記事の個別ページに遷移できること
- 検索フォームに条件が実装されること
  - 検索フォームで記事タイトルの部分一致検索ができること
  - 検索フォームでカテゴリーの部分一致検索ができること
  - 検索フォームに入力があるとリアルタイムで検索結果が表示されること

### 2-2. 記事詳細
**表示項目**
- タイトル
- カテゴリー
- 本文
- 投稿者名
- 作成日
- 更新日

**記事本文のエディタ**
- markdownのエディタで入力できること

**記事の保存方法**
- localStorageで保存

**投稿**
- 投稿ボタンで記事を投稿
- 投稿完了後、完了メッセージを表示すること

**更新**
- 更新ボタンで記事を更新
- 更新前に確認ダイアログが表示されること
- 更新完了後、完了メッセージを表示すること

**削除**
- 削除ボタンで記事を削除
- 削除前に確認ダイアログが表示されること
- 削除完了後、完了メッセージを表示すること

### 2-3. ログイン機能
- ID、PWを入力してログインできる
- ID、PWは設定ファイルに一致する内容があれば認証とする

### 2-4. アカウント設定
- 設定ファイルにてアカウントの情報をJson方式で保持する
- 保持する内容は以下の項目
  - ID
  - PW
  - アカウント名

### 2-5. 画面スタイル
- Tailwind CSSによるスタイル実装

## 9. メモ

### 9-1. Tailwind CSSのセットアップ

**エラー内容**
「npx tailwindcss init -p」がエラーになる

**原因**
「npm install -D tailwindcss postcss autoprefixer」でpackage.jsonに追記されるtailwindのバージョンが4.1.11のため

**対処方法**
以下手順で対応

***node_modules ディレクトリを削除***
Remove-Item -Path "node_modules" -Recurse -Force

***package-lock.json ファイルを削除***
Remove-Item -Path "package-lock.json" -Force

***package.json 修正***
package.jsonに記載するtailwindのバージョンを3.4.3にする

***npm 再インストール***
npm install

## 10. 完成画面

### ■ ログイン画面
<img width="1918" height="876" alt="image" src="https://github.com/user-attachments/assets/4d62000f-29dc-4572-aa5b-60442bda5c32" />

### ■ 一覧画面
<img width="1919" height="872" alt="image" src="https://github.com/user-attachments/assets/424bb344-d9b5-42f7-a44e-2e747a9d17b4" />

### ■ 検索機能
<img width="1919" height="876" alt="image" src="https://github.com/user-attachments/assets/4083d10d-2106-4a2f-84a5-5cbb7b6a1eb3" />

### ■ 新規作成
<img width="1919" height="867" alt="image" src="https://github.com/user-attachments/assets/1c82c796-4b32-4bb6-8d17-1a053abbf798" />

### ■ 更新
<img width="1919" height="872" alt="image" src="https://github.com/user-attachments/assets/aea7e807-af43-405d-b06d-09de9bebc01b" />

### ■ 削除
<img width="1919" height="869" alt="image" src="https://github.com/user-attachments/assets/4ab28fd0-89bd-4353-b916-ca4ab00697d6" />
