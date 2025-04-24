# Dockerfile для клиента
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /client

# Копируем package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта в рабочую директорию
COPY . .

# Сборка клиентской части
RUN npm run build

# Открываем порт 80
EXPOSE 80

# Команда для запуска клиентской части
CMD ["npx", "serve", "-s", "build"]

