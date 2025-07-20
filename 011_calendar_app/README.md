# 011_calendar_app

## 1. システム概要

### 1-1. 目的
カレンダーで予定を確認、作成、削除を行い、スケジュールの管理ができる

## 2. 機能要件

### 2-1. カレンダー一覧

**週、月、年毎に表示の切り換えができること**

***週***
- 週7日分の00:00～23:59のスケジュールを確認できること
- スケジュールを選択したら詳細がモーダルで確認できること

***月***
- 1ヶ月分のスケジュールを確認できること
- スケジュールを選択したら詳細がモーダルで確認できること
- 日にちを選択したらその週のスケジュールが表示されること

***年***
- 9年分の年を確認できること
- 年を選択したらその年の1月が表示されること

**ページネーション**
- 次、前の週、月、年を選択したときに更新されること

**表示スケジュール**
- 選択したカテゴリーのスケジュールを表示できること

### 2-2. スケジュール詳細
- 週、月のスケジュールを選択された場合に表示できること
- 日付、時間（From～To）、カテゴリー、内容が確認できること

### 2-3. スケジュール登録
- カレンダー一覧に配置された新規作成ボタンが押下された場合に表示できること
- 登録ボタンが押下された場合、対象のスケジュールの登録ができること
- 日付、時間（From～To）、カテゴリー、内容が登録できること

### 2-4. スケジュール更新
- 週、月のスケジュールを選択された場合に表示できること
- 更新ボタンが押下された場合、対象のスケジュールの更新ができること
- 日付、時間（From～To）、カテゴリー、内容が更新できること

### 2-5. スケジュール削除
- 週、月のスケジュールを選択された場合に表示できること
- 削除ボタンが押下された場合、対象のスケジュールの削除ができること
- 日付、時間（From～To）、カテゴリー、内容が削除できること

### 2-6. カテゴリー設定
- categories.jsonに定義されたカテゴリーを使用する

## 9. メモ

### 9-1. UIの参考
- UIはGoogleカレンダーを参考とする

### 9-2. データ管理方法
- localStorageにてスケジュールの管理を行う

## 10. 完成画面

### 10-1. 週表示

<img width="1920" height="1032" alt="image" src="https://github.com/user-attachments/assets/387d64d7-deb7-4799-96e9-0185727fd430" />

### 10-2. 月表示

<img width="1920" height="1032" alt="image" src="https://github.com/user-attachments/assets/3df61883-8e06-417f-99fa-814b72db9bdc" />

### 10-3. 年表示

<img width="1920" height="1032" alt="image" src="https://github.com/user-attachments/assets/4096bdd9-a6b8-4779-b65c-ab0670d6acfd" />

### 10-4. スケジュール詳細

<img width="1920" height="1032" alt="image" src="https://github.com/user-attachments/assets/3b3268c5-b0c9-491d-86f8-e89b4ef240fa" />

### 10-5. スケジュール編集

<img width="1920" height="1032" alt="image" src="https://github.com/user-attachments/assets/6b98353e-ad66-41a7-bdb7-006fddc8b721" />

### 10-6. スケジュール削除

<img width="1920" height="1032" alt="image" src="https://github.com/user-attachments/assets/beae5427-3f8c-4e6c-b186-2d0d4977b86c" />

### 10-6. スケジュール新規作成

<img width="1920" height="1032" alt="image" src="https://github.com/user-attachments/assets/e79e17d3-573f-46f4-be90-40f5f99c177d" />
