# ToDoFlower
ToDoを花のように管理できるWebアプリケーション  
プロジェクトが花になり、ToDoは花弁になります。  
粒度の違うToDoを花や花弁として管理することで、  
あなたが今何を取り組むべきかをわかりやすくしてくれます。  
また、ToDoの特徴をタグとして登録することで、ToDo管理をより便利にします。  
レスポンシブデザインなので、スマートフォンからの利用もできます。

## 使い方  
1. メニューバーからログイン、新規登録ボタンを押してログインしてください  
2. ユーザホーム画面では、未完了の全てのToDoを閲覧することができます  
3. スクロールするとプロジェクトごとにToDoを見ることができます  
4. 左下のプラスボタンから新規プロジェクトを追加することができます  
5. 右下のプラスボタンから新規ToDoを追加することができます  
6. プロジェクトとToDoは花のように表現されます  
7. 花のように表現されたプロジェクト、ToDoをクリックすると詳細・編集画面が表示されます。
8. 詳細・編集画面から完了・削除・更新が行えます  
9. メニューバーの検索フォームからタグによるToDoの検索ができます  
10. 検索フォームはEnterキーを押すと、検索され結果が表示されます  
11. 検索フォームを空にしてEnterキーを押すと、検索結果が消えます  
12. メニューバーの設定から自分のAPIキーを確認することができます  
13. APIキーと共に規定のURLにアクセスすることで、データのやり取りができるため、他のアプリケーションと連携できます  


## ディレクトリ構成  
|-bin/  
||- www.js  
|-modules/  
||- DBModule.js  
||- CTRModule.js  
||- ACDModule.js  
||- LoginCheckModule.js  
||- setting.js    
||- DBModels/  
|||- User.js  
|||- Password.js  
|||- ToDoList.js  
|||- ToDoListTag.js  
|||- Project.js  
|||- UserProject.js  
|||- UserToDoList.js  
|||- ProjectToDoList.js  
|-node_modules/  
|-public/  
||- images/  
|||- favicon.ico  
||- javascripts/  
|||- ex/  
|||- AjaxModule.js  
|||- super.js  
|||- ToDoFlower.js   
||- stylesheets/  
|-routes/  
||- users.js  
||- index.js  
||- api.js  
|-views/  
||- index.ect  
||- layout.ect  
||- layout_home.ect  
||- login.ect  
||- signup.ect  
||- super.ect  
||- user.ect  
||- user_menu.ect  
|-.gitignore  
|-app.js  
|-package.json  
|-README.md  

## 利用したライブラリ・フレームワーク
### サーバーサイド  
- node.js  
- mongoDB  
- mongoose  
- morgan  
- searve-favicon
- express
- express-session
- ect
- async
- body-parser
- connect-mongo  

### クライアントサイド
- bootstrap
- bootstrap-material-design
- jQuery

## システムURL構成  
### ログインページ
- / : ホーム
- /login : 既ユーザ向けログインフォーム
- /signup : 新規ユーザ向けサインアップフォーム

### アプリケーションページ
- /users : ユーザホーム、ToDoの追加、Projectの追加、ToDoの検索ができる
- /users/menu : ユーザ情報の表示、自分のAPIキーを確認できる

### 管理者ページ
- /api/super/gui : 管理者用データベースコントローラ
- /api/[データベース名]/[find, insert, upsert, remove] : データベースのCRUD操作API

### API提供
#### GET REQUEST(ユーザ自身のデータを対象にする)
- /api/todo/complete : 完了しているToDoを取得する
- /api/todo/incomplete : 未完了のToDoを取得する
- /api/todo/all : 全てのToDoを取得する
- /api/userData : 自身のデータを丸ごと取得する
- /api/userData/incomplete : 完了していないプロジェクトおよびToDoを丸ごと取得する
- /api/search/tag : query.tagで検索した結果のToDoリストを取得する
#### POST REQUEST(ユーザ自身のデータを対象にする)
- /api/todoObj/insert : 新規ToDoを追加する
- /api/todoObj/upsert : ToDoを更新する
- /api/todoObj/remove : ToDoを削除する
- /api/todoObj/complete : ToDoを完了状態にする
- /api/projectObj/insert : 新規プロジェクトを追加する
- /api/projectObj/upsert : プロジェクトを更新する
- /api/projectObj/complete : プロジェクトを完了状態にする
- /api/projectObj/remove : プロジェクトを削除する

#### API使い方
1. /users/menuで自分のAPIキーをチェック
2. 該当URLへのGET/POSTリクエストのクエリにapikey=[あなたのAPIキー]を追加する
3. JSONでデータがやり取りできる

### 開発環境のセットアップ手順
1. このリポジトリをローカルへクローンします  
  `git clone https://github.com/KeisukeSugiura/ToDoFlower`
2. プロジェクトのルートディレクトリで必要なパッケージをインストールします  
  `npm install`  
3. mongoDBをバックグラウンドで起動します（インストールしていない方はインストールをお願いします）  
  `mongod mongod -dbpath "データベースの場所"`  
4. 外部ファイルに出力してあるデータベースファイルを読み込みます(todo_databaseはデフォルト)  
  `mongorestore --db todo_database ./database/todo_database`  
5. ./modules/setting.jsを編集してポート番号や利用するデータベースを記入します  
6. サーバーを起動します  
  `node bin/www`  
7. Webブラウザで該当URLにアクセスします（以下の記述はデフォルト）  
  `http://localhost:55555`
8. 右上のログインボタンからログインできます。  
  出力してあるデータは{id:kyoshida, password:0000}でログインできます  




## 開発環境  
Node.js v6.9.1  
npm 3.10.8  
MongoDB v3.4.1  
