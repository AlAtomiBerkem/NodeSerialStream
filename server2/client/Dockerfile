FROM node:18

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY .. .

RUN npm run build

EXPOSE 80

CMD ["npx", "serve", "-s", "build"]

