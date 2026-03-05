# Подключение JS и стилей проекта к теме WordPress

## 1. Сборка проекта

Соберите проект, чтобы получить один бандл с JS и CSS:

```bash
npm run build
```

После сборки в папке `dist/` появятся файлы:
- `dist/assets/js/` — JavaScript (часто с хешем в имени, например `index.abc123.js`)
- `dist/assets/style/` — CSS

Скрипты из этого проекта (Swiper, слайдеры, меню, попапы и т.д.) уже включены в бандл.

---

## 2. Копирование файлов в тему WordPress

Скопируйте содержимое `dist/assets/` в тему, например:

```
wp-content/themes/ваша-тема/
  assets/
    js/
    style/
```

Либо скопируйте туда всю папку `dist/` и в теме используйте пути вроде `dist/assets/...`.

---

## 3. Подключение в теме через functions.php

В файле `functions.php` вашей темы добавьте подключение скрипта и стилей.

### Вариант A: имена файлов с хешем (как после Vite)

Если после сборки у вас файлы вида `index.abc123.js` и `index.xyz789.css`, в PHP нужно либо подставлять актуальное имя, либо искать файл по маске. Пример с поиском первого подходящего файла:

```php
<?php
// functions.php темы WordPress

function travel_theme_scripts() {
    $theme_uri = get_template_directory_uri();
    $theme_path = get_template_directory();

    // Путь к папке со сборкой (вы можете хранить в assets/build или dist)
    $build_js_dir  = $theme_path . '/assets/js';
    $build_css_dir = $theme_path . '/assets/style';

    // Найти основной JS (например index.*.js или main.*.js)
    $js_files  = glob($build_js_dir . '/index.*.js') ?: glob($build_js_dir . '/*.js');
    $css_files = glob($build_css_dir . '/index.*.css') ?: glob($build_css_dir . '/*.css');

    $js_file  = $js_files ? basename($js_files[0]) : '';
    $css_file = $css_files ? basename($css_files[0]) : '';

    if ($js_file) {
        wp_enqueue_script(
            'travel-main',
            $theme_uri . '/assets/js/' . $js_file,
            array(), // зависимости, при необходимости добавьте 'jquery'
            null,    // версия — можно использовать filemtime для инвалидации кеша
            true     // в footer
        );
    }

    if ($css_file) {
        wp_enqueue_style(
            'travel-main',
            $theme_uri . '/assets/style/' . $css_file,
            array(),
            null
        );
    }
}

add_action('wp_enqueue_scripts', 'travel_theme_scripts');
```

Пути (`/assets/js/`, `/assets/style/`) замените на те, куда вы реально скопировали файлы из `dist/assets/`.

### Вариант B: фиксированные имена (удобно для WordPress)

Чтобы не искать файлы по маске, можно собрать бандл с постоянным именем и подключать его по имени.

В `vite.config.js` можно добавить отдельную точку входа только для WordPress (один JS без HTML), например файл `src/js/wordpress-entry.js`, который только импортирует `main.js`:

```js
// src/js/wordpress-entry.js
import './main.js';
```

И в `vite.config.js` в `build.rollupOptions.input` добавить этот файл и задать имя вывода без хеша для этого чанка (или настроить один общий entry с фиксированным именем). Тогда после сборки вы получите предсказуемое имя файла и в `functions.php` сможете писать:

```php
wp_enqueue_script(
    'travel-main',
    get_template_directory_uri() . '/assets/js/wordpress-entry.js',
    array(),
    filemtime(get_template_directory() . '/assets/js/wordpress-entry.js'),
    true
);
```

---

## 4. Важные моменты

- **jQuery**: если ваш скрипт не использует jQuery, зависимости можно оставить пустым `array()`. Если понадобится — укажите `array('jquery')`.
- **Footer**: скрипт подключён с последним аргументом `true` — загрузка в подвале страницы, что обычно лучше для скорости.
- **Версия**: использование `filemtime(...)` в качестве версии помогает браузеру подхватывать обновления после каждой пересборки.
- **Swiper и прочие библиотеки**: они уже входят в ваш бандл, отдельно подключать их в WordPress не нужно.

После этих шагов ваш собранный JS из этого проекта будет работать в теме WordPress.
