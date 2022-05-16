# Twitter like SNS Server


## How to use
### direnvの設定
```sh
direnv allow
```

### .envファイルの設定
`.env` ファイルに必要な情報を書き込みます。

### パッケージのインストール
```sh
npm install
```

### PrismaのDBの設定
```sh
prisma migrate dev --name init
```

### Postgresサーバーの起動
```sh
docker-compose up
```

### GraphQLサーバーの起動
```sh
npm run dev
```

###
