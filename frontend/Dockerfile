# vue.js用のDockerfile
# ベースイメージ
FROM node:14.17.1

EXPOSE 8080

RUN mkdir /app
WORKDIR /app
RUN yarn global add @vue/cli

CMD ["/bin/bash", "init.sh"]
