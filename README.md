# One-Time Link Service

Этот проект предоставляет API для создания и получения одноразовых ссылок. Ссылки могут быть использованы только один раз, после чего они становятся недействительными.

## Требования

- Node.js
- Docker и Docker Compose

## Установка

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/your-repo/one-time-link-service.git
   cd one-time-link-service
   ```

2. Установите зависимости:

   ```bash
   yarn install
   ```

3. Установите `ioredis-mock` для тестирования:

   ```bash
   yarn add -D ioredis-mock
   ```

## Конфигурация

Создайте файл `.env` в корне проекта и добавьте следующие параметры:

    ```bash
    REDIS_HOST=localhost
    REDIS_PORT=6379
    ```

## Запуск Redis с помощью Docker Compose

1. Запустите Redis с помощью Docker Compose:

   ```bash
   docker-compose up -d redis
   ```

## Запуск приложения

1. Запустите приложение:

   ```bash
   yarn start:dev
   ```

## Документация API

Swagger-документация доступна по адресу: [http://localhost:3000/api](http://localhost:3000/api)

## Тестирование

1. Запустите тесты:

   ```bash
   yarn test
   ```

## Эндпоинты

### Создать одноразовую ссылку

- **URL:** `/link`
- **Метод:** `POST`
- **Тело запроса:**

  ```json
  {
    "value": "строка, которую нужно сохранить"
  }
  ```

- **Ответ:**

  ```json
  {
    "id": "уникальный идентификатор ссылки"
  }
  ```

### Получить значение по одноразовой ссылке

- **URL:** `/link/:id`
- **Метод:** `GET`
- **Ответ:**

  ```json
  {
    "value": "строка, сохраненная по данной ссылке"
  }
  ```

- **Ошибки:**

  - **404 Not Found:** Ссылка не найдена или уже использована.