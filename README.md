# ISDL_LS
2021年8月1日、書籍管理アプリの開発がスタート

# Member
- antic9
- ryo-jpg
- thous4nd
- Knpand

# API
- 楽天API

# Container
1. frontend（port:8080）
2. backend（port:5000）
3. database
4. phpadmin（port:8000）

# Startup
初回起動方法．
```bash
$ sudo docker-compose build && sudo docker-compose up -d
```

# Usage
[Home](localhost:8080)

# Building container
再ビルドでエラーが出るときはオプション`--no-cache`を付けるとだいたい通る。

# Backup
以下のコマンドを入力後，googledriveにアップロードすること
```bash
$ sudo docker exec -it database mysqldump -u light -plight --databases -y  books_db >books_db.dump
```

