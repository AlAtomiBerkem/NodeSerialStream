# NodeSerialStream Server — краткая инструкция

## Установка

```bash
npm install
```

## Переменные окружения (опционально)
- PORT — порт сервера (по умолчанию 3001)
- HOST — хост (по умолчанию 0.0.0.0)
- MONGODB_URI — строка подключения к MongoDB (по умолчанию mongodb://localhost:27017/User)

## Запуск сервера

- Режим разработки (если используете ts-node-dev):
```bash
npm run dev
```

- Обычный запуск:
```bash
npm start
```

Сервер поднимется на http://HOST:PORT.

## Основные эндпоинты
- GET /api/users — список пользователей
- POST /api/users/createUser — создать пользователя
- DELETE /api/users/:idTab — удалить пользователя
- DELETE /api/users/all — удалить всех пользователей
- GET /api/users/testResult/:idTab — результаты тестов
- PATCH /api/stand/update — отметить прохождение стенда
- POST /api/stand/checkTests — проверить, пройдены ли тесты
- GET /api/serial — текущее состояние сериал-порта
- GET /api/serial/ports — доступные порты

## Тестирование

- Запуск всех тестов:
```bash
npm test
```

- Режим наблюдения:
```bash
npm run test:watch
```

- Покрытие кода:
```bash
npm run test:coverage
```

Отчет по тестам: TESTING_REPORT.md. Дополнительно см. tests/README.md.