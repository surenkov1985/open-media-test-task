# Тестовое задание на вакансию Junior Frontend developer в компанию "Open Media"

[Демо](https://open-media-test-task.vercel.app/)

## Подробнее о задании:

  Сделать верстку страницы используя html и css по [макету](https://www.figma.com/file/a5GiybFrpqEbalfx6RjND4/Open-Media-Frontend-test-task?t=GgxilvZhiL98zVjE-0),
страница должна корректно отображаться если выполнение javascript запрещено. Реализовать переключение вкладок в разделе “Technical requirements”.

  Используя React выполнить форму ввода ссылки и плеер. Формат ввода ссылки "https://". При некорректном вводе отображать ошибку. При успешном вводе скрывать форму и отображать плеер с источником из ссылки.
  При буфферизации аудио потока отображать лоадер в виде бегущей строки.
  Отобразить прогресс в секундах, регулятор громкости, добавить возможность изпенения прогресса воспроизведения.

## Исполнение:

В процессе исполнения использовались:

- Для верстки страницы: HTML, Scss, autiprefixer, Flex, Grid. Переключение вкладок с помощью input[radio]
- Для формы ввода и плеера: React, Redux/toolkit, LocalStorage
- Сборщик Webpack 5
- Деплой проекта на хостинге Vercel


Дополнительно выполнено:
- Сохранение истории запросов в LocalStorage с отображением подсказок при вводе ссылки
- Всплывающее уведомление для вывода ошибок

Плеер тестировался со ссылками:
- <https://cdn.drivemusic.me/dl/online/niTJGO8TcUxCK87bhMcRCQ/1678252497/download_music/2014/05/nico-vinz-am-i-wrong.mp3>
- <https://cdn.drivemusic.me/dl/online/s3b9qKh0hVadlp0UA_fzcQ/1678092544/download_music/2014/04/britney-spears-baby-one-more-time.mp3>
- <https://c5.radioboss.fm:18084/stream>
- <https://lalalai.s3.us-west-2.amazonaws.com/media/split/a7564eb8-cbf2-40e2-9cb8-6061d8d055a7/no_vocals>
- <https://cdn.drivemusic.me/dl/online/_qJfWXsWRh9Exjn2jKdUIQ/1678252497/download_music/2016/12/ofenbach-be-mine.mp3>
- <https://cdn.drivemusic.me/dl/online/JHbIpEfOJSRpZPSRTRMBaA/1678252497/download_music/2019/11/the-weeknd-blinding-lights.mp3>
