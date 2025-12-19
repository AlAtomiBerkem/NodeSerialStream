FROM node:18-alpine

WORKDIR /app

# Устанавливаем зависимости
COPY package.json package-lock.json ./
RUN npm install --production

# Копируем исходники
COPY server.js ./

EXPOSE 3201

CMD ["node", "server.js"]

