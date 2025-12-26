const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3203;
const DEFAULT_TEXT = 'Известные авиаконструкторы КАИ';

const app = express();

app.use(cors());
app.use(express.json());

// Пул пользователей для сбора в течение 1 минуты
let userPool = [];
let poolTimer = null;

// Активная бегущая строка и её таймеры
let activeMarqueeUsers = [];
let marqueeExpireAt = 0;
let marqueeTimer = null;

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Запуск бегущей строки с накопленными пользователями
function startMarquee(users) {
  activeMarqueeUsers = users;
  marqueeExpireAt = Date.now() + 10 * 60 * 1000; // 10 минут

  // Очищаем предыдущий таймер если был
  if (marqueeTimer) {
    clearTimeout(marqueeTimer);
  }

  marqueeTimer = setTimeout(() => {
    // Время истекло, очищаем бегущую строку
    activeMarqueeUsers = [];
    marqueeExpireAt = 0;
    marqueeTimer = null;
    console.log('[RssEngineers] Бегущая строка остановлена, отображаем дефолтный текст');
  }, 10 * 60 * 1000);

  console.log(`[RssEngineers] Запущена бегущая строка с ${users.length} пользователями на 10 минут`);
}

// Добавление пользователя к активной бегущей строке
function addToActiveMarquee(user) {
  activeMarqueeUsers.push(user);
  
  // Увеличиваем время на 1 минуту
  const remainingTime = marqueeExpireAt - Date.now();
  marqueeExpireAt = Date.now() + remainingTime + 1 * 60 * 1000;

  // Перезапускаем таймер с новым временем
  if (marqueeTimer) {
    clearTimeout(marqueeTimer);
  }

  marqueeTimer = setTimeout(() => {
    activeMarqueeUsers = [];
    marqueeExpireAt = 0;
    marqueeTimer = null;
    console.log('[RssEngineers] Бегущая строка остановлена после расширения, отображаем дефолтный текст');
  }, remainingTime + 1 * 60 * 1000);

  console.log(`[RssEngineers] Добавлен пользователь к активной бегущей строке. Всего: ${activeMarqueeUsers.length}. Время продлено на 1 минуту`);
}

// Endpoint для события удаления пользователя
app.post('/events/user-deleted', (req, res) => {
  try {
    const { UserName, UserLastName, UserEmail, idTab } = req.body || {};

    if (!UserName && !UserLastName && !UserEmail && !idTab) {
      return res.status(400).json({ message: 'Пустое событие удаления пользователя' });
    }

    const user = {
      UserName: UserName || '',
      UserLastName: UserLastName || '',
      UserEmail: UserEmail || '',
      idTab: idTab || '',
      deletedAt: new Date()
    };

    // Если есть активная бегущая строка, добавляем сразу в неё
    if (activeMarqueeUsers.length > 0 && marqueeExpireAt > Date.now()) {
      addToActiveMarquee(user);
      return res.status(202).json({ message: 'Пользователь добавлен к активной бегущей строке' });
    }

    // Иначе добавляем в пул для накопления
    userPool.push(user);

    // Запускаем таймер 1 минуты при первом пользователе в пуле
    if (!poolTimer) {
      poolTimer = setTimeout(() => {
        const usersToDisplay = userPool;
        userPool = [];
        poolTimer = null;

        if (usersToDisplay.length > 0) {
          startMarquee(usersToDisplay);
        } else {
          console.log('[RssEngineers] Пул пуст, никто не добавился за минуту');
        }
      }, 60 * 1000); // 1 минута

      console.log('[RssEngineers] Запущен минутный таймер сбора пользователей в пул');
    }

    res.status(202).json({ message: 'Событие удаления принято' });
  } catch (err) {
    console.error('[RssEngineers] Ошибка обработки события удаления:', err.message);
    res.status(500).json({ message: 'Ошибка сервиса RssEngineers' });
  }
});

// RSS-лента для бегущей строки
app.get('/rss/users', (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  // Определяем какой текст показывать
  let text = DEFAULT_TEXT;
  
  if (activeMarqueeUsers.length > 0 && marqueeExpireAt > Date.now()) {
    const names = activeMarqueeUsers
      .map((u) => {
        const nameOnly = (u.UserName || '').trim();
        return nameOnly || u.UserEmail || u.idTab;
      })
      .filter(Boolean);
    
    if (names.length > 0) {
      text = names.join('   •   ');
    }
  }

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml('Бегущая строка авиаконструкторов')}</title>
    <link>${escapeXml(baseUrl + req.originalUrl)}</link>
    <description>${escapeXml('Бегущая строка авиаконструкторов КАИ')}</description>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <item>
      <title>${escapeXml(text)}</title>
      <description>${escapeXml(text)}</description>
      <guid>${Buffer.from(`${baseUrl}${req.originalUrl}`).toString('hex')}</guid>
    </item>
  </channel>
</rss>`;

  res.set('Content-Type', 'application/rss+xml; charset=utf-8');
  res.send(rss);
});

app.get('/', (req, res) => {
  res.send('RssEngineers сервис запущен. Используйте /rss/users');
});

app.listen(PORT, () => {
  console.log(`RssEngineers сервер запущен на порту ${PORT}`);
});
