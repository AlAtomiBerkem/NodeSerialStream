FROM node:18

WORKDIR /server

COPY package*.json ./

RUN npm install
RUN apt-get update && apt-get install -y udev

COPY .. .

EXPOSE 3001

# Команда для запуска сервера в прод-режиме
CMD ["npm", "start"]