const fs = require("fs");
const _phrases = [
  {
    id: 9,
    ru: "не беспокойтесь",
    ta: "борчылмагыз",
    en: "don't worry",
  },
  {
    id: 29,
    ru: "эти туристы из Америки",
    ta: "бу туристлар Америкадан",
    en: "these tourists are from America",
  },
  {
    id: 22,
    ru: "а кто вы",
    ta: "Ә сез кем",
    en: "and who are you",
  },
  {
    id: 16,
    ru: "пожалуйста",
    ta: "зинһар",
    en: "please",
  },
  {
    id: 10,
    ru: "давай",
    ta: "Әйдә",
    en: "let's",
  },
  {
    id: 19,
    ru: "извините",
    ta: "гафу итегез",
    en: "sorry",
  },
  {
    id: 5,
    ru: "добрый день",
    ta: "хәерле көн",
    en: "good afternoon",
  },
  {
    id: 15,
    ru: "пока",
    ta: "хуш",
    en: "bye",
  },
  {
    id: 24,
    ru: "здравствуй",
    ta: "исәнме",
    en: "hello",
  },
  {
    id: 25,
    ru: "можешь прийти",
    ta: "килә аласыңмы",
    en: "can you come in",
  },
  {
    id: 8,
    ru: "короче",
    ta: "кыскасы",
    en: "in short",
  },
  {
    id: 7,
    ru: "по-моему",
    ta: "минемчә",
    en: "in my opinion",
  },
  {
    id: 20,
    ru: "куда пойдём",
    ta: "кая барабыз",
    en: "where shall we go",
  },
  {
    id: 3,
    ru: "привет",
    ta: "сәлам",
    en: "hi",
  },
  {
    id: 13,
    ru: "что ты делаешь",
    ta: "син нишлисең",
    en: "what are you doing",
  },
  {
    id: 23,
    ru: "это так",
    ta: "шулаймы",
    en: "is that true?",
  },
  {
    id: 1,
    ru: "несомненно",
    ta: "Һичшиксез",
    en: "undoubtedly",
  },
  {
    id: 28,
    ru: "я устал(а)",
    ta: "арыдым",
    en: "I'm tired",
  },
  {
    id: 2,
    ru: "ничего не стоит",
    ta: "берни түгел",
    en: "it costs nothing",
  },
  {
    id: 33,
    ru: "большое спасибо",
    ta: "бик зур рәхмәт",
    en: "thank you very much",
  },
  {
    id: 32,
    ru: "это папа Азата",
    ta: "бу Азатның әтисе",
    en: "this is Azat's dad",
  },
  {
    id: 17,
    ru: "кто это",
    ta: "бу кем",
    en: "who is it?",
  },
  {
    id: 37,
    ru: "что это",
    ta: "бу нәрсә",
    en: "what is it",
  },
  {
    id: 14,
    ru: "до свидания",
    ta: "сау булыгыз",
    en: "goodbye",
  },
  {
    id: 11,
    ru: "конечно, разумеется",
    ta: "Әлбәттә",
    en: "of course",
  },
  {
    id: 40,
    ru: "давай покушаем",
    ta: "Әйдә ашыйбыз",
    en: "let's eat",
  },
  {
    id: 41,
    ru: "давай пошли",
    ta: "Әйдә киттек",
    en: "let's go",
  },
  {
    id: 30,
    ru: "добрый вечер",
    ta: "хәерле кич",
    en: "good evening",
  },
  {
    id: 43,
    ru: "мне нужен апельсин",
    ta: "миңа апельсин кирәк",
    en: "I need an orange",
  },
  {
    id: 39,
    ru: "где мой телефон",
    ta: "минем телефон кайда",
    en: "where's my phone",
  },
  {
    id: 36,
    ru: "я говорю по-татарски",
    ta: "мин татарча сөйләшәм",
    en: "I speak Tatar",
  },
  {
    id: 45,
    ru: "спасибо",
    ta: "рәхмәт",
    en: "thanks",
  },
  {
    id: 44,
    ru: "татарский язык",
    ta: "татар теле",
    en: "Tatar language",
  },
  {
    id: 35,
    ru: "как дела",
    ta: "хәлләрең ничек",
    en: "how are you",
  },
  {
    id: 21,
    ru: "что сейчас будем делать",
    ta: "хәзер нишлик",
    en: "what are we going to do now",
  },
  {
    id: 27,
    ru: "нет настроения",
    ta: "кәефем юк",
    en: "no mood",
  },
  {
    id: 38,
    ru: "красивая девочка",
    ta: "матур кыз",
    en: "beautiful girl",
  },
  {
    id: 26,
    ru: "я очень рад",
    ta: "мин бик шат",
    en: "I am very happy",
  },
  {
    id: 31,
    ru: "меня зовут Алсу",
    ta: "минем исемем Алсу",
    en: "my name is Alsu",
  },
  {
    id: 18,
    ru: "как дела",
    ta: "ни хәл",
    en: "how are you",
  },
  {
    id: 42,
    ru: "добро пожаловать",
    ta: "рәхим итегез",
    en: "welcome",
  },
  {
    id: 6,
    ru: "передавай привет",
    ta: "сәлам әйт",
    en: "say hello",
  },
  {
    id: 34,
    ru: "вам тоже спасибо",
    ta: "сезгә дә рәхмәт",
    en: "thank you too",
  },
  {
    id: 12,
    ru: "где ты",
    ta: "син кайда",
    en: "where are you",
  },
];

const res = () =>
  _phrases.map((x) => ({
    ...x,
    audio: `https://chamala.tatar/uploads/${x.ta.toLowerCase()}.mp3`,
  }));

const result = () => {
  const _x = res();
  console.log("_x", _x);
  const dictstring = JSON.stringify(_x);
  fs.writeFile("phrases.json", dictstring, function (err, result) {
    if (err) console.log("error", err);
  });
};

result();
