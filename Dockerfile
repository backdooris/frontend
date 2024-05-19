FROM node:22-alpine

WORKDIR /app

COPY . .

# .yarn/unplugged에 있는 파일들을 설치하기 위한 코드
RUN yarn install

EXPOSE 3000

RUN yarn start
