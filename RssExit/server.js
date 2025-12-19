const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3200;
const DEFAULT_TEXT = 'Зона сдачи паспорта авиаконструктора';

const app = express();

app.use(cors());
app.use(express.json());

// Текущая минута: накапливаем сюда пользователей после удаления
let pendingUsers = [];
let windowTimer = null;

// Последняя сформированная партия имен для бегущей строки
let lastBatchText = null;

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Сервисное событие: server1 сообщает, что пользователь был удалён
app.post('/events/user-deleted', (req, res) => {
  try {
    const { UserName, UserLastName, UserEmail, idTab } = req.body || {};

    if (!UserName && !UserLastName && !UserEmail && !idTab) {
      return res.status(400).json({ message: 'Пустое событие удаления пользователя' });
    }

    pendingUsers.push({
      UserName: UserName || '',
      UserLastName: UserLastName || '',
      UserEmail: UserEmail || '',
      idTab: idTab || '',
      deletedAt: new Date()
    });

    // Запускаем минутное окно только при первом пользователе
    if (!windowTimer) {
      windowTimer = setTimeout(() => {
        const usersToSend = pendingUsers;
        pendingUsers = [];
        windowTimer = null;

        if (usersToSend.length > 0) {
          const names = usersToSend
            .map((u) => {
              const fullName = [u.UserName, u.UserLastName].filter(Boolean).join(' ').trim();
              return fullName || u.UserEmail || u.idTab;
            })
            .filter(Boolean);

          lastBatchText = names.join('   •   ');
          console.log(
            `[RssExit] Сформирована партия из ${usersToSend.length} пользователей для бегущей строки`
          );
        } else {
          // Если никого не было, возвращаемся к дефолтному тексту
          if (!lastBatchText) {
            lastBatchText = null;
          }
        }
      }, 60_000);

      console.log('[RssExit] Запущено минутное окно сбора удалённых пользователей');
    }

    res.status(202).json({ message: 'Событие удаления принято' });
  } catch (err) {
    console.error('[RssExit] Ошибка обработки события удаления:', err.message);
    res.status(500).json({ message: 'Ошибка сервиса RssExit' });
  }
});

// RSS-лента для стороннего сервиса бегущей строки
app.get('/rss/users', (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  // Если есть последняя партия имён — показываем её, иначе дефолтный текст
  const text = lastBatchText && lastBatchText.length > 0 ? lastBatchText : DEFAULT_TEXT;

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml('Зона сдачи паспорта авиаконструктора')}</title>
    <link>${escapeXml(baseUrl + req.originalUrl)}</link>
    <description>${escapeXml('Бегущая строка зоны сдачи паспорта авиаконструктора')}</description>
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
  res.send('RssExit сервис запущен. Используйте /rss/users');
});

app.listen(PORT, () => {
  console.log(`RssExit сервер запущен на порту ${PORT}`);
});


