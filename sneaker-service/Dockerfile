FROM node:latest

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . ./

EXPOSE 3003

CMD ["cmd", "dist/index.js"]

