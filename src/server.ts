import express, { Request, Response } from "express";
import { Bot, webhookCallback, InlineKeyboard } from "grammy";
import { CATEGORIES } from "./data";

const token = process.env.BOT_TOKEN!;
const secret = process.env.SECRET_TOKEN || "secret";

if (!token) {
  throw new Error("BOT_TOKEN is required");
}

const bot = new Bot(token);

/* ---------- helper keyboards ---------- */
function kbMain() {
  return new InlineKeyboard()
    .text("Основні послуги", "menu:services").row()
    .text("Техніка вправ", "menu:technique").row()
    .text("Додаткові матеріали", "menu:extra");
}

function kbCategories() {
  const kb = new InlineKeyboard();
  for (const c of CATEGORIES) kb.text(c.title, `cat:${c.key}`).row();
  kb.text("🏠 На головне", "menu:root");
  return kb;
}

function kbSubgroups(catKey: string) {
  const cat = CATEGORIES.find((c) => c.key === catKey);
  const kb = new InlineKeyboard();
  cat?.subgroups?.forEach((sg) => kb.text(sg.title, `sub:${catKey}:${sg.key}`).row());
  kb.text("⬅ Назад до груп", "menu:technique").row().text("🏠 На головне", "menu:root");
  return kb;
}

function kbExercisesInCat(catKey: string) {
  const cat = CATEGORIES.find((c) => c.key === catKey);
  const kb = new InlineKeyboard();
  (cat?.exercises ?? []).forEach((x, i) => kb.text(x.title, `ex:${catKey}::${i}`).row());
  kb.text("⬅ Назад до груп", "menu:technique").row().text("🏠 На головне", "menu:root");
  return kb;
}

function kbExercisesInSub(catKey: string, subKey: string) {
  const cat = CATEGORIES.find((c) => c.key === catKey);
  const sg = cat?.subgroups?.find((s) => s.key === subKey);
  const kb = new InlineKeyboard();
  (sg?.exercises ?? []).forEach((x, i) => kb.text(x.title, `ex:${catKey}:${subKey}:${i}`).row());
  kb.text("⬅ Назад до підгруп", `cat:${catKey}`).row().text("🏠 На головне", "menu:root");
  return kb;
}

/* ---------- menus ---------- */
// /start
bot.command("start", (ctx) =>
  ctx.reply("Привіт! Оберіть розділ 👇", { reply_markup: kbMain() })
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
  await ctx.editMessageText("Оберіть групу м'язів:", { reply_markup: kbCategories() });
  await ctx.answerCallbackQuery();
});

// назад на головне меню
bot.callbackQuery("menu:root", async (ctx) => {
  await ctx.editMessageText("Привіт! Оберіть розділ 👇", { reply_markup: kbMain() });
  await ctx.answerCallbackQuery();
});

/* ---------- categories / subgroups ---------- */
bot.callbackQuery(/^cat:(.+)$/, async (ctx) => {
  const key = ctx.match![1];
  const cat = CATEGORIES.find((c) => c.key === key);
  if (!cat) return ctx.answerCallbackQuery({ text: "Категорію не знайдено" });

  if (cat.subgroups?.length) {
    await ctx.editMessageText(`Група: ${cat.title}\nОберіть підгрупу:`, { reply_markup: kbSubgroups(cat.key) });
  } else {
    const list = cat.exercises ?? [];
    const kb = kbExercisesInCat(cat.key);
    await ctx.editMessageText(
      list.length ? `Група: ${cat.title}\nОберіть вправу:` : `Група: ${cat.title}\n(поки немає вправ)`,
      { reply_markup: kb }
    );
  }
  await ctx.answerCallbackQuery();
});

bot.callbackQuery(/^sub:([^:]+):(.+)$/, async (ctx) => {
  const [catKey, subKey] = [ctx.match![1], ctx.match![2]];
  const cat = CATEGORIES.find((c) => c.key === catKey);
  const sg = cat?.subgroups?.find((s) => s.key === subKey);
  if (!cat || !sg) return ctx.answerCallbackQuery({ text: "Підгрупу не знайдено" });

  await ctx.editMessageText(`Група: ${cat.title} → ${sg.title}\nОберіть вправу:`, {
    reply_markup: kbExercisesInSub(catKey, subKey),
  });
  await ctx.answerCallbackQuery();
});

/* ---------- sending video with action buttons ---------- */
// callback_data формати:
//   ex:<catKey>::<idx>           — для категорій без підгруп
//   ex:<catKey>:<subKey>:<idx>   — для підгруп
bot.callbackQuery(/^ex:([^:]+):(.*):(\d+)$/, async (ctx) => {
  const [catKey, maybeSub, idxStr] = [ctx.match![1], ctx.match![2], ctx.match![3]];
  const cat = CATEGORIES.find((c) => c.key === catKey);
  if (!cat) return ctx.answerCallbackQuery({ text: "Не знайдено" });

  let title: string | undefined;
  let fileId: string | undefined;
  let backCb: string; // куди повертатись зі сторінки відео

  if (cat.subgroups?.length && maybeSub) {
    const sg = cat.subgroups.find((s) => s.key === maybeSub);
    const ex = sg?.exercises?.[Number(idxStr)];
    title = ex?.title;
    fileId = ex?.fileId;
    backCb = `back:sub:${catKey}:${maybeSub}`; // назад у список вправ підгрупи
  } else {
    const ex = cat.exercises?.[Number(idxStr)];
    title = ex?.title;
    fileId = ex?.fileId;
    backCb = `back:cat:${catKey}`; // назад у список вправ категорії
  }

  if (!fileId) return ctx.answerCallbackQuery({ text: "Вправу не знайдено" });

  const underVideoKb = new InlineKeyboard()
    .text("⬅ Повернутись", backCb).row()
    .text("✖ Закрити", `del:${Date.now()}`);

  if (title) await ctx.replyWithVideo(fileId, { caption: title, reply_markup: underVideoKb });
  else await ctx.replyWithVideo(fileId, { reply_markup: underVideoKb });

  await ctx.answerCallbackQuery();
});

/* ---------- back buttons that reply with the list (not edit video) ---------- */
bot.callbackQuery(/^back:cat:([^:]+)$/, async (ctx) => {
  const catKey = ctx.match![1];
  const cat = CATEGORIES.find((c) => c.key === catKey);
  if (!cat) return ctx.answerCallbackQuery({ text: "Категорію не знайдено" });

  if (cat.subgroups?.length) {
    // на випадок якщо викличуть цю кнопку для категорії з підгрупами
    await ctx.reply(`Група: ${cat.title}\nОберіть підгрупу:`, { reply_markup: kbSubgroups(cat.key) });
  } else {
    const list = cat.exercises ?? [];
    const kb = kbExercisesInCat(cat.key);
    await ctx.reply(list.length ? `Група: ${cat.title}\nОберіть вправу:` : `Група: ${cat.title}\n(поки немає вправ)`, {
      reply_markup: kb,
    });
  }
  await ctx.answerCallbackQuery();
});

bot.callbackQuery(/^back:sub:([^:]+):(.+)$/, async (ctx) => {
  const [catKey, subKey] = [ctx.match![1], ctx.match![2]];
  const cat = CATEGORIES.find((c) => c.key === catKey);
  const sg = cat?.subgroups?.find((s) => s.key === subKey);
  if (!cat || !sg) return ctx.answerCallbackQuery({ text: "Підгрупу не знайдено" });

  await ctx.reply(`Група: ${cat.title} → ${sg.title}\nОберіть вправу:`, {
    reply_markup: kbExercisesInSub(catKey, subKey),
  });
  await ctx.answerCallbackQuery();
});

/* ---------- delete-video message ---------- */
bot.callbackQuery(/^del:/, async (ctx) => {
  try {
    await ctx.deleteMessage();
    await ctx.answerCallbackQuery("Видалено");
  } catch {
    await ctx.answerCallbackQuery({ text: "Не вдалося видалити" });
  }
});

/* ---------- noop ---------- */
bot.callbackQuery(/^noop:/, (ctx) => ctx.answerCallbackQuery());

/* ---------- express app ---------- */
const app = express();
app.get("/", (_: Request, res: Response) => res.status(200).send("alive"));
app.use(express.json());
app.use(`/webhook/${secret}`, webhookCallback(bot, "express"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Bot listening on ${port}`));
