FROM node:latest

WORKDIR /app

COPY package.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 7000

CMD ["yarn", "start"]