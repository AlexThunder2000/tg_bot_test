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
      { title: "Вертикальна тяга", fileId: "BAACAgIAAyEGAAS2J90iAAMDaMV_ZDy6VNxqeS2iFQn1ob9sY-wAAk6OAAKQ9ylKvHiT8-o8Pto2BA" },
      { title: "Вертикальна тяга зворотній хватом", fileId: "BAACAgIAAyEGAAS2J90iAAMEaMV_ZxH-tQT_t75hKalRo_czuBsAAk-OAAKQ9ylK3O1b7vqfARY2BA" },
      { title: "Вертикальна тяга вузькою рукояткою", fileId: "BAACAgIAAyEGAAS2J90iAAMFaMV_afdpOchh3qi30zFGxN1XgRQAAlCOAAKQ9ylK60CenpfYO9k2BA" },
      { title: "Вертикальна тяга 1 рукою", fileId: "BAACAgIAAyEGAAS2J90iAAMGaMV_bLIvU3gpomuxyNCHMHWeY5MAAlGOAAKQ9ylKov6VRfFe_AE2BA" },
      { title: "Підтягування", fileId: "BAACAgIAAyEGAAS2J90iAAMHaMV_bjk1q0yxP1cFuAnJCphhCRQAAlKOAAKQ9ylK4hC4q1dM_Gw2BA" },
      { title: "Підтягування вузьким хватом", fileId: "BAACAgIAAyEGAAS2J90iAAMIaMV_cRTKqH7i2FX3j0qqrGJ29KoAAlSOAAKQ9ylKmtuAQJBo6Po2BA" },
      { title: "Горизонтальна тяга вузькою рукояткою", fileId: "BAACAgIAAyEGAAS2J90iAAMJaMV_dePB21GRfzBShrSI4lt8ba4AAlWOAAKQ9ylKsknEf3X7yHA2BA" },
      { title: "Горизонтальна тяга широкою рукояткою", fileId: "BAACAgIAAyEGAAS2J90iAAMLaMV_e_0nZK1ylMZxtHiixWbE7noAAlmOAAKQ9ylKPukw2Y2NFaA2BA" },
      { title: "Горизонтальна тяга 1 рукою", fileId: "BAACAgIAAyEGAAS2J90iAAMKaMV_efSsJ9y3MgABoZwk4T7QAwo4AAJXjgACkPcpSqx9Z304zicoNgQ" },
      { title: "Тяга в кросовері 1 рукою на лавці", fileId: "BAACAgIAAyEGAAS2J90iAAMNaMV_gEqJfHFbK6UwC4G0b7-grZEAAluOAAKQ9ylKIIrPURAGsdE2BA" },
      { title: "Тяга 2 руками в кросовері сидячи(Ісус)", fileId: "BAACAgIAAyEGAAS2J90iAAMOaMV_g_eaSzHRdA7US8CMnxioBuAAAlyOAAKQ9ylKSuPbt0o4lY82BA" },
      { title: "Пуловер прямою рукояткою", fileId: "BAACAgIAAyEGAAS2J90iAAMPaMV_hR7u110VmhuwUsPCYs4hdw8AAl2OAAKQ9ylK4scGjvciIW42BA" },
      { title: "Пуловер з канатом", fileId: "BAACAgIAAyEGAAS2J90iAAMQaMV_iM_WlmawAxMuOxq6q1KqrwgAAl6OAAKQ9ylKSatficxS8wk2BA" },
      { title: "Австралійські підтягування", fileId: "BAACAgIAAyEGAAS2J90iAAMRaMV_jZBNSxxoOEEv-xrqwVsnLngAAl-OAAKQ9ylKGcWO6mEOtq02BA" },
      { title: "Тяга штанги до поясу зворотній хватом", fileId: "BAACAgIAAyEGAAS2J90iAAMSaMV_j1s0qevrq0xXs577EBWQw1oAAmCOAAKQ9ylKpzj02aReylw2BA" },
      { title: "Тяга штанги до поясу прямим хватом", fileId: "BAACAgIAAyEGAAS2J90iAAMTaMV_khXUuorbl5kmR4pfnQMVToIAAmGOAAKQ9ylKJsdio8rzzgM2BA" },
      { title: "Тяга канатом під груди в кросовері", fileId: "BAACAgIAAyEGAAS2J90iAAMUaMV_lVqCpBY4eit-RdFlXsi2wD0AAmOOAAKQ9ylK-TqwiQsNt_Q2BA" },
      { title: "Тяга гантелі 1 рукою", fileId: "BAACAgIAAyEGAAS2J90iAAMXaMV_oRnbfkIDFohgzrTObrrJMbEAAmaOAAKQ9ylKzts6edTNSKA2BA" },

      { title: "Тяга гантелей 2 руками упор в лавку", fileId: "BAACAgIAAyEGAAS2J90iAAMWaMV_nE5dyrKj3NxPGRxHH75eknsAAmWOAAKQ9ylK28bV6XFTyxo2BA" },
      { title: "Т-тяга", fileId: "BAACAgIAAyEGAAS2J90iAAMYaMV_pEPiQfjPX6qB5RJglDXGXMoAAmeOAAKQ9ylKkPzg7ZpOaDs2BA" },
   
    ],
  },
  {
    key: "chest",
    title: "Груди",
    exercises: [
    
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
      
        ],
      },
      {
        key: "mid-delta",
        title: "Середня дельта",
        exercises: [
     
        ],
      },
      {
        key: "rear-delta",
        title: "Задня дельта",
        exercises: [
      
        ],
      },
    ],
  },
  {
    key: "biceps",
    title: "Біцепс",
    exercises: [
   
    ],
  },
  {
    key: "triceps",
    title: "Тріцепс",
    exercises: [
   
    ],
  },
  {
    key: "glutes",
    title: "Сідниці",
    exercises: [
    
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
      
        ],
      },
      {
        key: "inner-leg",
        title: "Внутрішня поверхня",
        exercises: [
        
        ],
      },
      {
        key: "rear-leg",
        title: "Задня поверхня",
        exercises: [
        
        ],
      },
    ],
  },
];
