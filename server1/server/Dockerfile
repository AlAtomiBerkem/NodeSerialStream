FROM node:18

WORKDIR /server

COPY package*.json ./

RUN npm install
RUN apt-get update && apt-get install -y udev

COPY .. .

EXPOSE 3000

# Команда для запуска сервера
CMD ["npm", "run", "dev"]