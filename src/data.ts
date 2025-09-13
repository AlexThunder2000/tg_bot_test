// src/data.ts

export interface Exercise {
  title: string;
  fileId: string; // Telegram file_id
}

export interface Subgroup {
  key: string;
  title: string;
  exercises: Exercise[];
}

export interface Category {
  key: string;
  title: string;
  exercises?: Exercise[];   // коли підгруп немає
  subgroups?: Subgroup[];   // коли є підгрупи
}

export const CATEGORIES: Category[] = [
  { key: "back",     title: "Спина",    exercises: [] },
  { key: "chest",    title: "Груди",    exercises: [] },
  {
    key: "shoulder",
    title: "Плечі",
    subgroups: [
      { key: "front-delta", title: "Передня дельта",  exercises: [] },
      { key: "mid-delta",   title: "Середня дельта",  exercises: [] },
      { key: "rear-delta",  title: "Задня дельта",    exercises: [] },
    ],
  },
  { key: "biceps",   title: "Біцепс",   exercises: [] },
  { key: "triceps",  title: "Тріцепс",  exercises: [] },
  { key: "glutes",   title: "Сідниці",  exercises: [] },
  {
    key: "legs",
    title: "Ноги",
    subgroups: [
      { key: "front-leg",  title: "Передня поверхня",   exercises: [] },
      { key: "inner-leg",  title: "Внутрішня поверхня", exercises: [] },
      { key: "rear-leg",   title: "Задня поверхня",     exercises: [] },
    ],
  },
];
