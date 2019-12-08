# HTML-парсер  
## Как работает:  
сложно.  
## Как запустить:  
1. Проверить, что есть соединение с интернетом.
1. Проверить, что установлена Node.JS  
Это можно сделать с помощью команды `node --version` в терминале
1. Если установлена, идем в пункт 4. Если нет, все грустно, надо ставить ноду. Ссылка [тут](https://nodejs.org/en/download/package-manager/)
1. `node index.js`
1. В случае хорошего результата вы получите сообщение "Данные успешно выгружены в файл". Если сообщения нету, [пишите мне](https://t.me/Betchika99)
## Что можно поменять под себя:
-  Другой урл для парсинга:
    1. Заходим в `/consts/other`
    1. Меняем значение переменной `home`
- Другие заголовки получающейся таблицы:
    1. Заходим в `consts/other`
    1. Меняем значения в массиве `tableHeaders`
- Другое имя csv-файла:
    1. Заходим в `consts/other`
    1. Меняем значение `fileName`
- Другие селекторы для парсинга:
    1. Заходим в `consts/selectors`
    1. Добавляем новый селектор переменной
    1. Не забываем добавить его в `module.exports`
    
Если остались вопросы, [пишите мне](https://t.me/Betchika99), всем рада :)