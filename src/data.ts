// src/data.ts

export interface Exercise {
  title: string;
  fileId: string;
}

export interface Subgroup {
  key: string;
  title: string;
  exercises: Exercise[];
}

export interface Category {
  key: string;
  title: string;
  exercises?: Exercise[];
  subgroups?: Subgroup[];
}

export const CATEGORIES: Category[] = [
  {
    key: "back",
    title: "Спина",
    exercises: [
      { title: "Тяга верхнього блоку", fileId: "AAA_BACK_FILE_ID_1" },
      { title: "Гіперекстензія", fileId: "AAA_BACK_FILE_ID_2" },
    ],
  },
  {
    key: "chest",
    title: "Груди",
    exercises: [
      { title: "Жим штанги лежачи", fileId: "AAA_CHEST_FILE_ID_1" },
      { title: "Розведення гантелей", fileId: "AAA_CHEST_FILE_ID_2" },
    ],
  },
  {
    key: "shoulder",
    title: "Плечі",
    subgroups: [
      {
        key: "front-delta",
        title: "Передня дельта",
        exercises: [
          { title: "Підйом гантелей перед собою", fileId: "AAA_FRONT_DELTA_FILE_ID" },
        ],
      },
      {
        key: "mid-delta",
        title: "Середня дельта",
        exercises: [
          { title: "Жим штанги стоячи", fileId: "AAA_MID_DELTA_FILE_ID" },
        ],
      },
      {
        key: "rear-delta",
        title: "Задня дельта",
        exercises: [
          { title: "Тяга гантелей у нахилі", fileId: "AAA_REAR_DELTA_FILE_ID" },
        ],
      },
    ],
  },
  {
    key: "biceps",
    title: "Біцепс",
    exercises: [
      { title: "Підйом штанги на біцепс", fileId: "AAA_BICEPS_FILE_ID_1" },
      { title: "Підйом гантелей сидячи", fileId: "AAA_BICEPS_FILE_ID_2" },
    ],
  },
  {
    key: "triceps",
    title: "Тріцепс",
    exercises: [
      { title: "Французький жим", fileId: "AAA_TRICEPS_FILE_ID_1" },
      { title: "Відтискання на брусах", fileId: "AAA_TRICEPS_FILE_ID_2" },
    ],
  },
  {
    key: "glutes",
    title: "Сідниці",
    exercises: [
      { title: "Ягодичний міст", fileId: "AAA_GLUTES_FILE_ID_1" },
      { title: "Випади з гантелями", fileId: "AAA_GLUTES_FILE_ID_2" },
    ],
  },
  {
    key: "legs",
    title: "Ноги",
    subgroups: [
      {
        key: "front-leg",
        title: "Передня поверхня",
        exercises: [
          { title: "Присідання зі штангою", fileId: "AAA_FRONT_LEG_FILE_ID" },
        ],
      },
      {
        key: "inner-leg",
        title: "Внутрішня поверхня",
        exercises: [
          { title: "Зведення ніг у тренажері", fileId: "AAA_INNER_LEG_FILE_ID" },
        ],
      },
      {
        key: "rear-leg",
        title: "Задня поверхня",
        exercises: [
          { title: "Мертва тяга", fileId: "AAA_REAR_LEG_FILE_ID" },
        ],
      },
    ],
  },
];
