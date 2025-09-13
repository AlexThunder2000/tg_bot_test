import express, { Request, Response } from "express";
import { Bot, webhookCallback, InlineKeyboard } from "grammy";
import { CATEGORIES } from "./data";

const token = process.env.BOT_TOKEN!;
const secret = process.env.SECRET_TOKEN || "secret";

if (!token) {
  throw new Error("BOT_TOKEN is required");
}

const bot = new Bot(token);

// Головне меню
const mainMenu = () =>
  new InlineKeyboard()
    .text("Основні послуги", "menu:services").row()
    .text("Техніка вправ", "menu:technique").row()
    .text("Додаткові матеріали", "menu:extra");

// /start
bot.command("start", (ctx) =>
  ctx.reply("Привіт! Оберіть розділ 👇", { reply_markup: mainMenu() })
);

// плейсхолдери
bot.callbackQuery("menu:services", async (ctx) => {
  await ctx.editMessageText("Тут буде текст про послуги.\nПовернутися: /start");
  await ctx.answerCallbackQuery();
});

bot.callbackQuery("menu:extra", async (ctx) => {
  await ctx.editMessageText("Додаткові матеріали (PDF/посилання).\nПовернутися: /start");
  await ctx.answerCallbackQuery();
});

// 7 груп
bot.callbackQuery("menu:technique", async (ctx) => {
  const kb = new InlineKeyboard();
  for (const c of CATEGORIES) kb.text(c.title, `cat:${c.key}`).row();
  kb.text("⬅ На головне меню", "menu:root");
  await ctx.editMessageText("Оберіть групу м'язів:", { reply_markup: kb });
  await ctx.answerCallbackQuery();
});

bot.callbackQuery("menu:root", async (ctx) => {
  await ctx.editMessageText("Привіт! Оберіть розділ 👇", { reply_markup: mainMenu() });
  await ctx.answerCallbackQuery();
});

// категорії / підгрупи
bot.callbackQuery(/^cat:(.+)$/, async (ctx) => {
  const key = ctx.match![1];
  const cat = CATEGORIES.find((c) => c.key === key);
  if (!cat) return ctx.answerCallbackQuery({ text: "Категорію не знайдено" });

  if (cat.subgroups?.length) {
    const kb = new InlineKeyboard();
    for (const sg of cat.subgroups) kb.text(sg.title, `sub:${cat.key}:${sg.key}`).row();
    kb.text("⬅ Назад до груп", "menu:technique");
    await ctx.editMessageText(`Група: ${cat.title}\nОберіть підгрупу:`, { reply_markup: kb });
  } else {
    const list = cat.exercises ?? [];
    const kb = new InlineKeyboard();
    if (list.length) list.forEach((x, i) => kb.text(x.title, `ex:${cat.key}::${i}`).row());
    else kb.text("(поки немає вправ)", `noop:${Date.now()}`).row();
    kb.text("⬅ Назад до груп", "menu:technique");
    await ctx.editMessageText(`Група: ${cat.title}\nОберіть вправу:`, { reply_markup: kb });
  }
  await ctx.answerCallbackQuery();
});

bot.callbackQuery(/^sub:([^:]+):(.+)$/, async (ctx) => {
  const [catKey, subKey] = [ctx.match![1], ctx.match![2]];
  const cat = CATEGORIES.find((c) => c.key === catKey);
  const sg = cat?.subgroups?.find((s) => s.key === subKey);
  if (!cat || !sg) return ctx.answerCallbackQuery({ text: "Підгрупу не знайдено" });

  const kb = new InlineKeyboard();
  if (sg.exercises?.length) sg.exercises.forEach((x, i) => kb.text(x.title, `ex:${cat.key}:${sg.key}:${i}`).row());
  else kb.text("(поки немає вправ)", `noop:${Date.now()}`).row();
  kb.text("⬅ Назад до підгруп", `cat:${cat.key}`);
  await ctx.editMessageText(`Група: ${cat.title} → ${sg.title}\nОберіть вправу:`, { reply_markup: kb });
  await ctx.answerCallbackQuery();
});

bot.callbackQuery(/^ex:([^:]+):(.*):(\d+)$/, async (ctx) => {
  const [catKey, maybeSub, idxStr] = [ctx.match![1], ctx.match![2], ctx.match![3]];
  const cat = CATEGORIES.find((c) => c.key === catKey);
  if (!cat) return ctx.answerCallbackQuery({ text: "Не знайдено" });

  let title: string | undefined;
  let fileId: string | undefined;

  if (cat.subgroups?.length && maybeSub) {
    const sg = cat.subgroups.find((s) => s.key === maybeSub);
    const ex = sg?.exercises?.[Number(idxStr)];
    title = ex?.title; fileId = ex?.fileId;
  } else {
    const ex = cat.exercises?.[Number(idxStr)];
    title = ex?.title; fileId = ex?.fileId;
  }

  if (!fileId) return ctx.answerCallbackQuery({ text: "Вправу не знайдено" });

  if (title) {
    await ctx.replyWithVideo(fileId, { caption: title });
  } else {
    await ctx.replyWithVideo(fileId);
  }
  await ctx.answerCallbackQuery("Готово ✅");
});

bot.callbackQuery(/^noop:/, (ctx) => ctx.answerCallbackQuery());

const app = express();
app.get("/", (_: Request, res: Response) => res.status(200).send("alive")); // перевірка живості
app.use(express.json());
app.use(`/webhook/${secret}`, webhookCallback(bot, "express")); // секрет у URL

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Bot listening on ${port}`));
