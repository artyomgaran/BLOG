Области хранения данных:

- база данных на json-server
- BFF
- redux store

Сущности приложения:

- пользователь: БД (список пользователей), BFF (сессия текущего), стор (отображение в браузере)
- роль пользователя: БД (список ролей), BFF (сессия пользователя с ролью), стор (использования на клиенте)
- статья: БД (список статей), стор (отображение в браузере)
- комменатрий: БД (список комментариев), стор (отображение в браузере)

Таблицы БД:

- пользователи - users: id / login / password / registed_at / role_id
- роли - roles: id / name
- статьи - posts: id / tittle / img_url / content / published_at
- комментарии - comments: id / author_id / post_id / content

Схема состояния на BFF:

- сессия текущего пользователя: login / password / role

Схема для редакс стора (на клиенте):

- user: id / login / role_id /session
- posts: массив post: id / tittle / imageUrl / publishedAt / commentsCount
- post: id / tittle / imageUrl / content / publishedAt / comments: массив comment: id / author / content / publishedAt
- users : массив user: id / login / registredAt / role
