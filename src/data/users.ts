import type { usersTable } from "../db/schema.ts";

export type User = Omit<typeof usersTable.$inferSelect, "id">;

export const users: User[] = [
  {
    name: "Алина Шаехова",
    username: "no_fans_came",
    status: "inactive",
    avatarImage: "https://robohash.org/no_fans_came?set=set1&size=200x200",
    customStatus: "Никто не пришел на фан встречу",
  },
  {
    name: "Кот Бендер",
    username: "bender_cat",
    status: "online",
    avatarImage: "https://robohash.org/bender_cat?set=set1&size=200x200",
    customStatus: "Meow",
  },
  {
    name: "Доминик Торетто",
    username: "dom_toretto_family",
    status: "online",
    avatarImage:
      "https://robohash.org/dom_toretto_family?set=set1&size=200x200",
    customStatus: "Нет ничего важнее семьи",
  },
  {
    name: "Джон Крамер",
    username: "jigsaw_master",
    status: "online",
    avatarImage: "https://robohash.org/jigsaw_master?set=set1&size=200x200",
    customStatus: "Игра началась",
  },
  {
    name: "Аманда Янг",
    username: "pig_mask",
    status: "doNotDisturb",
    avatarImage: "https://robohash.org/pig_mask?set=set1&size=200x200",
    customStatus: "Будь благодарен за свою жизнь",
  },
  {
    name: "Марк Хоффман",
    username: "detective_hoff",
    status: "invisible",
    avatarImage: "https://robohash.org/detective_hoff?set=set1&size=200x200",
    customStatus: "Никогда не сдавайся",
  },
  {
    name: "Данила Багров",
    username: "brat_danila",
    status: "doNotDisturb",
    avatarImage: "https://robohash.org/brat_danila?set=set3&size=200x200",
    customStatus: "В чем сила, брат?",
  },
  {
    name: "Леон Кеннеди",
    username: "leon_rpd",
    status: "online",
    avatarImage: "https://robohash.org/leon_rpd?set=set2&size=200x200",
    customStatus: "Зомби снова здесь...",
  },
  {
    name: "Клэр Редфилд",
    username: "claire_red",
    status: "online",
    avatarImage: "https://robohash.org/claire_red?set=set2&size=200x200",
    customStatus: "Найти Криса любой ценой!",
  },
  {
    name: "Джилл Валентайн",
    username: "jill_s.t.a.r.s",
    status: "online",
    avatarImage: "https://robohash.org/jill_stars?set=set2&size=200x200",
    customStatus: "Немезис не остановится...",
  },
  {
    name: "Крис Редфилд",
    username: "chris_redfield",
    status: "online",
    avatarImage: "https://robohash.org/chris_redfield?set=set2&size=200x200",
    customStatus: "Вирус должен быть уничтожен!",
  },
  {
    name: "Итачи Учиха",
    username: "itachi_genjutsu",
    status: "doNotDisturb",
    avatarImage: "https://robohash.org/itachi_genjutsu?set=set3&size=200x200",
    customStatus: "Все было ради мира.",
  },
  {
    name: "Пейн",
    username: "pain_rinnegan",
    status: "online",
    avatarImage: "https://robohash.org/pain_rinnegan?set=set3&size=200x200",
    customStatus: "Боль приведет к миру.",
  },
  {
    name: "Дейдара",
    username: "deidara_boom",
    status: "doNotDisturb",
    avatarImage: "https://robohash.org/deidara_boom?set=set3&size=200x200",
    customStatus: "Искусство — это взрыв!",
  },
  {
    name: "Гарольд",
    username: "hide_the_pain",
    status: "doNotDisturb",
    avatarImage: "https://robohash.org/hide_the_pain?set=set3&size=200x200",
    customStatus: "Все хорошо, правда.",
  },
  {
    name: "Райан Гослинг",
    username: "ryan_gosling",
    status: "online",
    avatarImage: "https://robohash.org/ryan_gosling?set=set2&size=200x200",
    customStatus: "Что если мы будем счастливы?",
  },
  {
    name: "Шрек",
    username: "shrek_ogre",
    status: "doNotDisturb",
    avatarImage: "https://robohash.org/shrek_ogre?set=set4&size=200x200",
    customStatus: "Это мое болото!",
  },
  {
    name: "Осел",
    username: "donkey_shrek",
    status: "online",
    avatarImage: "https://robohash.org/donkey_shrek?set=set1&size=200x200",
    customStatus: "Я не могу молчать!",
  },
];
