"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Bot, webhookCallback, InlineKeyboard } = require("grammy");
const { CATEGORIES } = require("./data");

let bot = null;

async function buildBot(token) {
  const b = new Bot(token);

  // Ініціалізація бота
  await b.init();

  // Головне меню
  const mainMenu = () => new InlineKeyboard()
    .text("Основні послуги", "menu:services").row()
    .text("Техніка вправ", "menu:technique").row()
    .text("Додаткові матеріали", "menu:extra");

  // /start
  b.command("start", async (ctx) => {
    await ctx.reply("Привіт! Оберіть розділ 👇", { reply_markup: mainMenu() });
  });

  // Плейсхолдери
  b.callbackQuery("menu:services", async (ctx) => {
    await ctx.editMessageText("Тут буде текст про послуги.\nПовернутися: /start");
    await ctx.answerCallbackQuery();
  });

  b.callbackQuery("menu:extra", async (ctx) => {
    await ctx.editMessageText("Додаткові матеріали (PDF/посилання).\nПовернутися: /start");
    await ctx.answerCallbackQuery();
  });

  // Показати 7 груп
  b.callbackQuery("menu:technique", async (ctx) => {
    const kb = new InlineKeyboard();
    for (const c of CATEGORIES) kb.text(c.title, `cat:${c.key}`).row();
    kb.text("⬅ На головне меню", "menu:root");
    await ctx.editMessageText("Оберіть групу м'язів:", { reply_markup: kb });
    await ctx.answerCallbackQuery();
  });

  // Назад на головне меню
  b.callbackQuery("menu:root", async (ctx) => {
    await ctx.editMessageText("Привіт! Оберіть розділ 👇", { reply_markup: mainMenu() });
    await ctx.answerCallbackQuery();
  });

  // Обробка вибору категорії
  b.callbackQuery(/^cat:(.+)$/, async (ctx) => {
    const key = ctx.match[1];
    const cat = CATEGORIES.find((c) => c.key === key);
    if (!cat) {
      await ctx.answerCallbackQuery({ text: "Категорію не знайдено" });
      return;
    }

    // Якщо є підгрупи — показуємо підгрупи
    if (cat.subgroups && cat.subgroups.length) {
      const kb = new InlineKeyboard();
      for (const sg of cat.subgroups)
        kb.text(sg.title, `sub:${cat.key}:${sg.key}`).row();
      kb.text("⬅ Назад до груп", "menu:technique");
      await ctx.editMessageText(`Група: ${cat.title}\nОберіть підгрупу:`, { reply_markup: kb });
    } else {
      // Якщо підгруп немає — показуємо вправи (коли додамо fileId)
      const list = cat.exercises ?? [];
      const kb = new InlineKeyboard();
      if (list.length) {
        list.forEach((x, i) => kb.text(x.title, `ex:${cat.key}::${i}`).row());
      } else {
        kb.text("(поки немає вправ)", `noop:${Date.now()}`).row();
      }
      kb.text("⬅ Назад до груп", "menu:technique");
      await ctx.editMessageText(`Група: ${cat.title}\nОберіть вправу:`, { reply_markup: kb });
    }
    await ctx.answerCallbackQuery();
  });

  // Обробка підгруп
  b.callbackQuery(/^sub:([^:]+):(.+)$/, async (ctx) => {
    const [catKey, subKey] = [ctx.match[1], ctx.match[2]];
    const cat = CATEGORIES.find((c) => c.key === catKey);
    const sg = cat?.subgroups?.find((s) => s.key === subKey);
    if (!cat || !sg) {
      await ctx.answerCallbackQuery({ text: "Підгрупу не знайдено" });
      return;
    }
    const list = sg.exercises ?? [];
    const kb = new InlineKeyboard();
    if (list.length) {
      list.forEach((x, i) => kb.text(x.title, `ex:${cat.key}:${sg.key}:${i}`).row());
    } else {
      kb.text("(поки немає вправ)", `noop:${Date.now()}`).row();
    }
    kb.text("⬅ Назад до підгруп", `cat:${cat.key}`);
    await ctx.editMessageText(`Група: ${cat.title} → ${sg.title}\nОберіть вправу:`, {
      reply_markup: kb,
    });
    await ctx.answerCallbackQuery();
  });

  // Відправка відео
  b.callbackQuery(/^ex:([^:]+):(.*):(\d+)$/, async (ctx) => {
    const [catKey, maybeSub, idxStr] = [ctx.match[1], ctx.match[2], ctx.match[3]];
    const cat = CATEGORIES.find((c) => c.key === catKey);
    if (!cat) {
      await ctx.answerCallbackQuery({ text: "Не знайдено" });
      return;
    }

    let title;
    let fileId;
    if (cat.subgroups && cat.subgroups.length && maybeSub && maybeSub !== "") {
      const sg = cat.subgroups.find((s) => s.key === maybeSub);
      const ex = sg?.exercises?.[Number(idxStr)];
      title = ex?.title;
      fileId = ex?.fileId;
    } else {
      const ex = cat.exercises?.[Number(idxStr)];
      title = ex?.title;
      fileId = ex?.fileId;
    }
    if (!fileId) {
      await ctx.answerCallbackQuery({ text: "Вправу не знайдено" });
      return;
    }

    await ctx.replyWithVideo(fileId, { caption: title });
    await ctx.answerCallbackQuery("Готово ✅");
  });

  // Глушимо "порожні" кліки
  b.callbackQuery(/^noop:/, async (ctx) => {
    await ctx.answerCallbackQuery();
  });

  return b;
}

// Ось тут змінюємо на правильний експорт для Cloudflare:
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // 1) На GET/HEAD відповідаємо "alive" (для перевірки)
  if (request.method === "GET" || request.method === "HEAD") {
    return new Response("alive", { status: 200 });
  }

  // 2) Перевірка секрету ТІЛЬКИ для POST (вебхуки Telegram)
  if (SECRET_TOKEN) {
    const got = request.headers.get("X-Telegram-Bot-Api-Secret-Token");
    if (got !== SECRET_TOKEN) {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  // 3) Ледача ініціалізація бота
  if (!bot) {
    bot = await buildBot(BOT_TOKEN);
  }

  // 4) Передаємо апдейт у grammY
  const update = await request.json();
  await bot.handleUpdate(update);

  return new Response("ok");
}
