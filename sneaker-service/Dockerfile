FROM node:latest

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . ./

EXPOSE 3003

CMD ["node", "dist/index.js"]

