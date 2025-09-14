import express, { Request, Response } from "express";
import { Bot, webhookCallback, InlineKeyboard } from "grammy";
import { CATEGORIES } from "./data";

const token = process.env.BOT_TOKEN!;
const secret = process.env.SECRET_TOKEN || "secret";

if (!token) {
  throw new Error("BOT_TOKEN is required");
}

const bot = new Bot(token);

/* ---------- helpers ---------- */

// універсальний показ екрана: спробувати editMessageText, якщо не можна — надіслати нове повідомлення
async function editOrReply(
  ctx: any,
  text: string,
  reply_markup?: InlineKeyboard
) {
  try {
    // якщо попереднє повідомлення текстове — вийде відредагувати
    await ctx.editMessageText(text, { reply_markup });
  } catch {
    // якщо попереднє було фото/відео/інший тип — просто шлемо нове
    await ctx.reply(text, { reply_markup });
  }
}

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
// /start — фото + привітання + меню
bot.command("start", async (ctx) => {
  const photoId =
    "AgACAgIAAxkBAAE7GPRoxsMmhCGCvJRpJNXBs7XcyPjbGAACBfsxG8OBOEp8zGPvGXLsiwEAAwIAA3kAAzYE";
  const caption =
    "Привіт, тебе вітає: Дмитро — твій персональний тренер, чим можу допомогти?";
  await ctx.replyWithPhoto(photoId, { caption, reply_markup: kbMain() });
});

// Основні послуги → показати 3 кнопки
bot.callbackQuery("menu:services", async (ctx) => {
  await editOrReply(ctx, "Оберіть послугу:", kbServices());
  await ctx.answerCallbackQuery();
});

bot.callbackQuery("menu:extra", async (ctx) => {
  await editOrReply(
    ctx,
    "Додаткові матеріали (PDF/посилання).\nПовернутися: /start"
  );
  await ctx.answerCallbackQuery();
});

// 7 груп
bot.callbackQuery("menu:technique", async (ctx) => {
  await editOrReply(ctx, "Оберіть групу м'язів:", kbCategories());
  await ctx.answerCallbackQuery();
});

// назад на головне меню (тут краще також через editOrReply, бо виклик йде з медіа)
bot.callbackQuery("menu:root", async (ctx) => {
  await editOrReply(ctx, "Оберіть розділ 👇", kbMain());
  await ctx.answerCallbackQuery();
});

/* ---------- services ---------- */
function kbServices() {
  return new InlineKeyboard()
    .text("1) Програма тренувань та харчування", "svc:prog").row()
    .text("2) Онлайн супровід", "svc:online").row()
    .text("3) Персональні тренування", "svc:pt").row()
    .text("⬅ Назад", "menu:root");
}

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSck85art2UnEy-gYv4oIN-BwXaLLh7jQNg3WkzP0DVZ8pi_YA/viewform?usp=preview";
const DM_URL = "https://t.me/Dmchkft"; 

function kbServiceDetails() {
  return new InlineKeyboard()
    .url("📝 Заповнити анкету", FORM_URL)
    .row()
    .url("✉️ Написати мені", DM_URL)
    .row()
   .text("⬅ Назад до послуг", `del:${Date.now()}`);
}

bot.callbackQuery("svc:prog", async (ctx) => {
  await ctx.reply(
    '🔹 Програма тренувань та харчування — 50$\n\nЦе ідеальний варіант для тих, хто хоче стартувати самостійно, але з якісною базою:\nРазове складання програми тренувань — отримаєш готовий план під свій рівень та цілі (схуднення, набір м’язів, підтримка форми).\n\nСкладання плану харчування — без жорстких дієт, але зі збалансованим меню, яке реально вписати у твій ритм життя.\n\nВідео-демонстрації вправ — щоб ти точно знав/знала, як правильно виконувати кожну вправу.\n\nКонсультація протягом перших 4 днів — можливість уточнити всі питання після старту, щоб не залишилося "білих плям".',
    { reply_markup: kbServiceDetails() }
  );
  await ctx.answerCallbackQuery();
});

bot.callbackQuery("svc:online", async (ctx) => {
  await ctx.reply(
    "🔹 Онлайн супровід — 100$\n\nТут ти не залишаєшся наодинці з планом — я веду тебе крок за кроком:\nІндивідуальний план тренувань та харчування під твій режим, можливості та цілі.\n\nВідео з поясненням техніки вправ + можливість надсилати свої відео для розбору.\n\nЩотижневе оновлення програми — адаптація під твій прогрес, щоб не було застою.\n\nВідеоконсультація — живий контакт, де можна розібрати все від техніки до харчування.\n\nКонтроль форми та прогресу — я відслідковую твої результати та допомагаю рухатись далі.\n\nДодаткові відеоматеріали для кращого розуміння процесу.\n\nЦе варіант для тих, кому потрібна підтримка та регулярний фідбек.",
    { reply_markup: kbServiceDetails() }
  );
  await ctx.answerCallbackQuery();
});

bot.callbackQuery("svc:pt", async (ctx) => {
  await ctx.reply(
    "🔹 Персональні тренування — 200$\n\nМаксимальний рівень залученості й підтримки:\n\n12 онлайн-тренувань у форматі 1 на 1 — повна увага тільки тобі, з корекцією техніки в реальному часі.\n\nПерсональний план харчування і тренувань під твої потреби та можливості.\n\nКоригування вправ під обладнання, яке є у тебе (зал, дім, мінімальний інвентар).\n\nВідеоконсультації для обговорення прогресу, відчуттів та результатів.\n\nЩоденна комунікація за потреби — ти завжди на зв’язку зі мною у погоджений час.\n\nЦе найефективніший варіант для тих, хто хоче досягти результату швидше і з максимальним контролем",
    { reply_markup: kbServiceDetails() }
  );
  await ctx.answerCallbackQuery();
});

/* ---------- categories / subgroups ---------- */
bot.callbackQuery(/^cat:(.+)$/, async (ctx) => {
  const key = ctx.match![1];
  const cat = CATEGORIES.find((c) => c.key === key);
  if (!cat) return ctx.answerCallbackQuery({ text: "Категорію не знайдено" });

  if (cat.subgroups?.length) {
    await editOrReply(ctx, `Група: ${cat.title}\nОберіть підгрупу:`, kbSubgroups(cat.key));
  } else {
    const list = cat.exercises ?? [];
    const kb = kbExercisesInCat(cat.key);
    await editOrReply(
      ctx,
      list.length
        ? `Група: ${cat.title}\nОберіть вправу:`
        : `Група: ${cat.title}\n(поки немає вправ)`,
      kb
    );
  }
  await ctx.answerCallbackQuery();
});

bot.callbackQuery(/^sub:([^:]+):(.+)$/, async (ctx) => {
  const [catKey, subKey] = [ctx.match![1], ctx.match![2]];
  const cat = CATEGORIES.find((c) => c.key === catKey);
  const sg = cat?.subgroups?.find((s) => s.key === subKey);
  if (!cat || !sg) return ctx.answerCallbackQuery({ text: "Підгрупу не знайдено" });

  await editOrReply(ctx, `Група: ${cat.title} → ${sg.title}\nОберіть вправу:`, kbExercisesInSub(catKey, subKey));
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
    .text("⬅ Повернутись", backCb)
    .row()
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
    await ctx.reply(`Група: ${cat.title}\nОберіть підгрупу:`, {
      reply_markup: kbSubgroups(cat.key),
    });
  } else {
    const list = cat.exercises ?? [];
    const kb = kbExercisesInCat(cat.key);
    await ctx.reply(
      list.length
        ? `Група: ${cat.title}\nОберіть вправу:`
        : `Група: ${cat.title}\n(поки немає вправ)`,
      { reply_markup: kb }
    );
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
