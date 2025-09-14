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
      { title: "Тяга штанги до поясу зворотні хватом", fileId: "BAACAgIAAyEGAAS2J90iAAMSaMV_j1s0qevrq0xXs577EBWQw1oAAmCOAAKQ9ylKpzj02aReylw2BA" },
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
      { title: "Жим штанги лежачи", fileId: "BAACAgIAAyEGAAS2J90iAAMyaMV_8TIYQu813LfM4nuEn_K2E-4AAouOAAKQ9ylKHlnKDpre1kI2BA" },
      { title: "Жим штанги лежачи під кутом 45", fileId: "BAACAgIAAyEGAAS2J90iAAMzaMV_80lWdvpy1th-szkgWqE1AAELAAKMjgACkPcpStZxmUX32IjVNgQ" },
      { title: "Бабочка", fileId: "BAACAgIAAyEGAAS2J90iAAM0aMV_-NoXEzEQioE-gNYnJKwTpTsAAo2OAAKQ9ylKwjZpdqxQOgw2BA" },
      { title: "Відтискання на брусах", fileId: "BAACAgIAAyEGAAS2J90iAAM1aMV__Jr4jUtxHktWMyDKwXpHOhIAAo-OAAKQ9ylKj9sN8i0223M2BA" },
      { title: "Жим штанги під кутом в сміті", fileId: "BAACAgIAAyEGAAS2J90iAAM5aMWABmZMUm5NcPokVXcYCfZ3axkAApOOAAKQ9ylKZPf-rqBivIY2BA" },
      { title: "Жим гантелей лежачи", fileId: "BAACAgIAAyEGAAS2J90iAAM4aMWAA7m24e2aZERRoiLg3OFLi9UAApKOAAKQ9ylKvT5fOpF7yj02BA-rqBivIY2BA" },
      { title: "Жим гантелей лежачи під кутом 45", fileId: "BAACAgIAAyEGAAS2J90iAAM2aMV__rClt1VNyAnC_n5lSa6EprIAApCOAAKQ9ylKMMqOmwABp0rzNgQ" },
      { title: "Розведення рук з гантелями під кутом 45", fileId: "BAACAgIAAyEGAAS2J90iAAM3aMWAAAFpkur8mjpVfUfgi0yy_uXGAAKRjgACkPcpSshUOW9-NkCWNgQ" },
      { title: "Розведення рук лежачи в кросовері під кутом 45", fileId: "BAACAgIAAyEGAAS2J90iAAM6aMWACD00gKVpx5GQ6AABG679pn_KAAKUjgACkPcpSiCNJR7JjzqQNgQ" },
      { title: "Розведення рук стоячи в кросовері", fileId: "BAACAgIAAyEGAAS2J90iAAM7aMWAC7btdMtalNlDQANJ1Vcn4JcAApWOAAKQ9ylKOEVSSa0rthQ2BA" },
      { title: "Жим в кросовері стоячи", fileId: "BAACAgIAAyEGAAS2J90iAAM8aMWADZewG6Evd8I3AAH2Smjf7gR6AAKWjgACkPcpSuQiKxqNUaBTNgQ" },
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
          { title: "Жим гантелей сидячи", fileId: "BAACAgIAAyEGAAS2J90iAAMZaMV_ps90MJg6et1CbolCLwZK87cAAmmOAAKQ9ylKZE8BRCtZIUY2BA" },
          { title: "Жим Арнольда", fileId: "BAACAgIAAyEGAAS2J90iAAMaaMV_qL6fNVfDuQ51u1ILhWxAD18AAmqOAAKQ9ylK6ESB6NTnpg82BA" },
          { title: "Жим Арнольда варіація", fileId: "BAACAgIAAyEGAAS2J90iAAMbaMV_q1f0XZXNNH0ZLS93HJfQOUUAAmuOAAKQ9ylKJR6eZuzwDyk2BA" },
          { title: "Жим в тренажері", fileId: "BAACAgIAAyEGAAS2J90iAAMcaMV_rtVuEfD4NKT6IAw9cCJzIQkAAm2OAAKQ9ylKZ32nG_EtG542BA" },
          { title: "Армійський жим", fileId: "BAACAgIAAyEGAAS2J90iAAMdaMV_sMPx523lD-kuxquVtzJfpJIAAm6OAAKQ9ylKhNlyjoGTdfs2BA" },
          { title: "Жим в сміті сидячи", fileId: "BAACAgIAAyEGAAS2J90iAAMeaMV_sxSd86hXOjpnKssaF122OjsAAnCOAAKQ9ylKLNhyHIkAAVdUNgQ" },
          { title: "Підйом рук перед собою з прямою рукояткою в сміті", fileId: "BAACAgIAAyEGAAS2J90iAAMfaMV_tsQ-RogQSjbE-bP79EUZipsAAnGOAAKQ9ylKFFFsYZAn-uE2BA" },
          { title: "Жим в кросовері прямою рукояткою стоячи", fileId: "BAACAgIAAyEGAAS2J90iAAMgaMV_uBlORZINZObcwrZ8MM18tZ0AAnKOAAKQ9ylKhIZHITQfDmc2BA" },
          { title: "Підйом рук перед собою в кросовері з канатом", fileId: "BAACAgIAAyEGAAS2J90iAAMhaMV_u-V2fmfNFvQHOm1lwyUOx4kAAnSOAAKQ9ylKIdu5QF9A1082BA" },
          { title: "Підйом рук перед собою з гантелями", fileId: "BAACAgIAAyEGAAS2J90iAAMiaMV_vnq5CYwkv5t6IOUY541DBcAAAnWOAAKQ9ylKpdiCjocL-902BA" },
          { title: "Підйом рук перед собою з блинчиком", fileId: "BAACAgIAAyEGAAS2J90iAAMjaMV_wEpERF64UXbIaHXCPZFplikAAnaOAAKQ9ylKDoZrNwgnt2U2BA" },
          
        ],
      },
      {
        key: "mid-delta",
        title: "Середня дельта",
        exercises: [
          { title: "Махи в сторони стоячи", fileId: "BAACAgIAAyEGAAS2J90iAAMraMV_31qpi1JInrzE_FA225jW5QEAAoCOAAKQ9ylKEy51GGR7gQ02BA" },
          { title: "Махи в сторону сидячи", fileId: "BAACAgIAAyEGAAS2J90iAAMsaMV_4bIgRmjkzmyneIMtYOH3qJYAAoGOAAKQ9ylKGzUYyaSNS302BA" },
          { title: "Махи в сторону упор боком в похилу лавочку", fileId: "BAACAgIAAyEGAAS2J90iAAMtaMV_4x2DIzkpXxMTyKi9n7B1fEkAAoKOAAKQ9ylKVZtI7uTgFR82BA" },
          { title: "Махи в сторону в боковому нахилі", fileId: "BAACAgIAAyEGAAS2J90iAAMvaMV_6a7Ec8vjaloXOQOmlzBkZtEAAoaOAAKQ9ylKD-Eha1VPu8g2BA" },
          { title: "Махи в сторону в кросовері", fileId: "BAACAgIAAyEGAAS2J90iAAMwaMV_7JuIX6xYYxZUiJbWV_YoDa4AAoeOAAKQ9ylKAqsc-P11AnM2BA" },
          { title: "Протяжка зі штангою", fileId: "BAACAgIAAyEGAAS2J90iAAMmaMV_x7IyuZvxx08qwqwIty2zQGoAAnmOAAKQ9ylKcdjv-iD91S42BA" },
          { title: "Протяжка з гантелями", fileId: "BAACAgIAAyEGAAS2J90iAAMlaMV_xV52CBzwljKWtpw_TjhgL7wAAniOAAKQ9ylKXxgVYZ8t37c2BA" },
          { title: "Протяжка в кросовері з канатом", fileId: "BAACAgIAAyEGAAS2J90iAAMkaMV_wqGSrb-2pGxrPUdblM6WP38AAneOAAKQ9ylK3lAZGFnb6Aw2BA" },
          { title: "Протяжка в сміті", fileId: "BAACAgIAAyEGAAS2J90iAAMnaMV_yzdrMYpAmPkZ5-zl1_UoTm0AAnuOAAKQ9ylKlQSN-VJzScc2BA" },
          { title: "Махи в сторону в тренажері", fileId: "BAACAgIAAyEGAAS2J90iAAMxaMV_768sGsIS3bzuKlyMmRXopQsAAoiOAAKQ9ylKNFRFYqFWrJA2BA" },
        ],
      },
      {
        key: "rear-delta",
        title: "Задня дельта",
        exercises: [
          { title: "Тяга в кросовері до обличчя, канатом", fileId: "BAACAgIAAyEGAAS2J90iAAMoaMV_zYSEM88qlwXdH-yJ86rO0p8AAnyOAAKQ9ylKSD2iBUDg8Cc2BA" },
          { title: "Зворотня бабочка", fileId: "BAACAgIAAxkBAAE7GN5oxsKy4OvtkvP-PV_oLK13WEzppAACvokAAsOBOEqa4jbPDyRSLjYE" },
          { title: "Тяга гантелей на лавці", fileId: "BAACAgIAAyEGAAS2J90iAAMqaMV_1NQHdA0oBY6LzDtr75tXwZgAAn6OAAKQ9ylK_czmbdbxRbg2BA" },
          { title: "Тяга в нахилі в сміті", fileId: "BAACAgIAAyEGAAS2J90iAAMpaMV_0fgl5zLybb_xQMjvIgGz7IAAAn2OAAKQ9ylKi26sLiDwmzo2BA" },
        ],
      },
    ],
  },
  {
    key: "biceps",
    title: "Біцепс",
    exercises: [
      { title: "Згинання передпліччя стоячи зі штангою", fileId: "BAACAgIAAyEGAAS2J90iAAM9aMWAEDmfK-KnQyV5ocg9RDwJgCQAApeOAAKQ9ylKGvCY4fp7Ji42BA" },
      { title: "Згинання передпліччя з гантелями сидячи", fileId: "BAACAgIAAyEGAAS2J90iAAM-aMWAEss0jBCw1TEQEvLDUso0TpoAApiOAAKQ9ylKc--cGExRmHA2BA" },
      { title: "Згинання передпліччя на похилій лаві з гантелями", fileId: "BAACAgIAAyEGAAS2J90iAAM_aMWAHO6OEUhO6AJEsYimqfgdxdoAApuOAAKQ9ylKcLLUnQjMVf02BA" },
      { title: "Молоточки з гантелями", fileId: "BAACAgIAAyEGAAS2J90iAANAaMWAHxgfDjdyQjH73ovyZkgBH8QAApyOAAKQ9ylKI3Ruwy8-ESo2BA" },
      { title: "Концентроване згинання з гантелею", fileId: "BAACAgIAAyEGAAS2J90iAANBaMWAI3kfZwaa-A1AWtheKT6qQlYAAp2OAAKQ9ylKUqnuLzF2Y3E2BA" },
      { title: "Концентроване згинання передпліччя на лавці Скотта", fileId: "BAACAgIAAyEGAAS2J90iAANCaMWAJVQkZglkkDss33ZlqP9CwRwAAp6OAAKQ9ylKJS-SH_6pDAk2BA" },
      { title: "Згинання передпліччя стоячи в кросовері двома руками", fileId: "BAACAgIAAyEGAAS2J90iAANFaMWALf9PruvIgz7H89DDv78iegEAAqKOAAKQ9ylK3vgG_CSB8Ls2BA" },
      { title: "Згинання передпліччя в кросовері прямою рукояткою", fileId: "BAACAgIAAyEGAAS2J90iAANDaMWAKJ6t2jLyoQ12UmKj5lvb04IAAp-OAAKQ9ylKmFT5a31YhvA2BA" },
      { title: "Молоточки в кросовері з канатом", fileId: "BAACAgIAAyEGAAS2J90iAANEaMWAK-N1uUhRDp5xSXUIKlLjFdIAAqCOAAKQ9ylKcvMrpRsWEFE2BA" },
    ],
  },
  {
    key: "triceps",
    title: "Тріцепс",
    exercises: [
      { title: "Жим штанги вузьким хватом", fileId: "BAACAgIAAyEGAAS2J90iAANMaMWAP_htE76o5EN0IXHKrHC6ljEAAqqOAAKQ9ylKH03PeUJMeg02BA" },
      { title: "Французький жим з гантелями", fileId: "BAACAgIAAyEGAAS2J90iAANNaMWAQ6aI5EshEypn2iSFyHlyQ2YAAquOAAKQ9ylKkQ3w0jAIbHM2BA" },
      { title: "Розгинання передпліччя в кросовері з канатом", fileId: "BAACAgIAAyEGAAS2J90iAANGaMWAL6EUmQsolTGff0AoiKlPnGYAAqOOAAKQ9ylKpTfeM_kLgBs2BA" },
      { title: "Розгинання передпліччя в кросовері з прямою рукояткою", fileId: "BAACAgIAAyEGAAS2J90iAANHaMWAMvo7C2JqcOBAk82IIiRpxG4AAqSOAAKQ9ylK6Rspho0lZ202BA" },
      { title: "Розгинання передпліччя в кросовері із-за голови", fileId: "BAACAgIAAyEGAAS2J90iAANIaMWANHGQPHM5MX4OXB8H8gqcR2IAAqWOAAKQ9ylKg5jjMg0LSyE2BA" },
      { title: "Концентроване розгинання в кросовері 1 рукою", fileId: "BAACAgIAAyEGAAS2J90iAANJaMWAN_PACXFRrcUDm1QHb42f5jsAAqaOAAKQ9ylKdqVMmL3XT1A2BA" },
      { title: "Розгинання передпліччя в кросовері навхрест", fileId: "BAACAgIAAyEGAAS2J90iAANKaMWAO_EdMMBe0oqRxxnwqX9fUWsAAqiOAAKQ9ylKDJHkJk7I7Z42BA" },
      { title: "Розгинання передпліччя в нахилів в кросовері 1 рукою", fileId: "BAACAgIAAyEGAAS2J90iAANLaMWAPRu_Z3y24ItxDyTqClBt9l4AAqmOAAKQ9ylKwNCIfPHOuzo2BA" },
      { title: "Розгинання передпліччя з гантелею 2 руками із-за голови", fileId: "BAACAgIAAyEGAAS2J90iAANOaMWARgYP15JME1nIbXkDM7mHxhoAAq2OAAKQ9ylKvlDncfJ9mqk2BA" },
      { title: "Концентроване розгинання передпліччя 1 рукою із-за голови", fileId: "BAACAgIAAyEGAAS2J90iAANPaMWASiyuBGP2xyNUlGQ3WlL5M7sAArCOAAKQ9ylKsrhA8hfBXbo2BA" },
      { title: "Зворотні відтискання від лавочки", fileId: "BAACAgIAAyEGAAS2J90iAANQaMWATMSLCAABnvnHkUl-Tq4V4rilAAKxjgACkPcpSg72HSF5crv8NgQ" },
      { title: "Відтискання від грифу вузьким хватом", fileId: "BAACAgIAAyEGAAS2J90iAANRaMWAT_wAAUWbDWzNeb0YYQQ_sbhlAAKyjgACkPcpSukpNnVmUsFbNgQ" },
    ],
  },
  {
    key: "glutes",
    title: "Сідниці",
    exercises: [
      { title: "Сідничний місток зі штангою", fileId: "BAACAgIAAyEGAAS2J90iAANpaMWAmsCUAxkUkztQ7Ck66ArRRkMAAsyOAAKQ9ylKhLAs1KiqrIs2BA" },
      { title: "Сідничний місток в Сміті", fileId: "BAACAgIAAyEGAAS2J90iAANqaMWAnP25nDPwNnKMgkOpVa2d0ygAAs2OAAKQ9ylKhC6v51R55To2BA" },
      { title: "Зворотні присідання в гаці", fileId: "BAACAgIAAyEGAAS2J90iAANtaMWApnCZyAwuEA9fUFwinI244AcAAtGOAAKQ9ylKTXGVMVtTLag2BA" },
      { title: "Зашагування в кросовері", fileId: "BAACAgIAAyEGAAS2J90iAANcaMWAcSzSWN7Wywi2AoQj4bAGFhoAAr6OAAKQ9ylKaXYm3KFbIOQ2BA" },
      { title: "Випади в сміті", fileId: "BAACAgIAAyEGAAS2J90iAANraMWAoKiV5RDvzOh26M3c5Wsi81YAAs-OAAKQ9ylKO6WYeyKS21M2BA" },
      { title: "Випади назад на місці", fileId: "BAACAgIAAyEGAAS2J90iAANsaMWAoq_s8YBsuNaGh7_uaYO-d-cAAtCOAAKQ9ylKd5FOJOdbg_I2BA" },
      { title: "Болгарські випади", fileId: "BAACAgIAAyEGAAS2J90iAANxaMWAsQ6H8Vm91xLq020T-wJ6oXgAAtWOAAKQ9ylKcS7bkqVIzZk2BA" },
      { title: "Румунська тяга в сміті", fileId: "BAACAgIAAyEGAAS2J90iAANSaMWAUss38F8cWFZnj1JcQos0euIAArOOAAKQ9ylKV1BpM4Qs_4U2BA" },
      { title: "Румунська тяга зі штангою", fileId: "BAACAgIAAyEGAAS2J90iAANTaMWAWGQOZI9mSms0Bz0KDD1CP-QAArSOAAKQ9ylK2OjIWF0r_vo2BA" },
      { title: "Румунська тяга з гантелями", fileId: "BAACAgIAAyEGAAS2J90iAANUaMWAW_3sfLwSB6lTLgRfXxtOyHQAArWOAAKQ9ylKcFis4N_qtCM2BA" },
      { title: "Розведення ніг в тренажері(нахил вперед)", fileId: "BAACAgIAAyEGAAS2J90iAANzaMWAtv-TRDI0HcwlzHuGAAH5Aa2WAALXjgACkPcpSkREwzTU_zMBNgQ" },
      { title: "Ласточка", fileId: "BAACAgIAAyEGAAS2J90iAANyaMWAtFZahwgVHo4fni3P0UWKmsUAAtaOAAKQ9ylK9VzSYoR-XYw2BA" },
      { title: "Розгинння стегна в кросовері в нахилі", fileId: "BAACAgIAAyEGAAS2J90iAANvaMWArBAfZ_Jl-TjOwNXldYlvjaUAAtOOAAKQ9ylK1x61_KTusrU2BA" },
      { title: "Кік беки", fileId: "BAACAgIAAyEGAAS2J90iAANuaMWAqmzWoBeTwvpDuCTlQt6Hvw4AAtKOAAKQ9ylKBX4Qc6sa90I2BA" },
      { title: "Відведення стегна стоячи в кросовері(середній сідничний)", fileId: "BAACAgIAAyEGAAS2J90iAANwaMWArjxQTWqZ8G0WfRJXH4p9qh0AAtSOAAKQ9ylKCkl2XjGtxtY2BA" },
      { title: "Румунська тяга на 1 нозі", fileId: "BAACAgIAAyEGAAS2J90iAANdaMWAczEWM-yeXu70KYDb3mKoeycAAr-OAAKQ9ylKY6mW3tZN9qI2BA" },
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
          { title: "Присідання зі штангою", fileId: "BAACAgIAAyEGAAS2J90iAANgaMWAe4pDJLahZtBqKlmJ7RoIkVwAAsOOAAKQ9ylK7O0VHMrazcA2BA" },
          { title: "Присідання в сміті", fileId: "BAACAgIAAyEGAAS2J90iAANfaMWAefIWCXK-IhiY1t79T-arceQAAsKOAAKQ9ylK00Ot0fd_rJw2BA" },
          { title: "Присідання в гаці", fileId: "BAACAgIAAyEGAAS2J90iAANhaMWAf-SvDDSSjFX_yePGkhqFZuoAAsSOAAKQ9ylKXI9vN_qH7RM2BA" },
          { title: "Присідання з гантелею", fileId: "BAACAgIAAyEGAAS2J90iAANiaMWAgkI-twJa9vLmFulaTOk3e6IAAsWOAAKQ9ylKqgrgBGTjfOo2BA" },
          { title: "Гоблін присідання", fileId: "BAACAgIAAyEGAAS2J90iAANjaMWAh_HOTa6W1GWx2ueuvHE4RvIAAsaOAAKQ9ylKrSHmdznub8Q2BA" },
          { title: "Випади на місці  з гантелями", fileId: "BAACAgIAAyEGAAS2J90iAANkaMWAigp2lfJ9xtfPzdjOCe_LLAoAAseOAAKQ9ylKpM0HzhaHJ5Q2BA" },
          { title: "Випади на місці в сміті", fileId: "BAACAgIAAyEGAAS2J90iAANlaMWAjYcqIygr5p_NDlc5vlOXYkwAAsiOAAKQ9ylKpkt4BuvQip82BA" },
          { title: "Розгинання ніг сидячи", fileId: "BAACAgIAAyEGAAS2J90iAANmaMWAj2Ye_rpwuvXrN8JHtAcHNEQAAsmOAAKQ9ylKnfRt3E_SvJ82BA" },
          { title: "Жим платформи ногами", fileId: "BAACAgIAAyEGAAS2J90iAANnaMWAlcaDH4oH32LDN301p-RiH5wAAsqOAAKQ9ylK-hQczZZiaOw2BA" },
          { title: "Жим платформи 1 ногою", fileId: "BAACAgIAAyEGAAS2J90iAANoaMWAl0b-YxNqUBhl1WGrtwYhlBAAAsuOAAKQ9ylKNEz_TReH7tU2BA" },
        ],
      },
      {
        key: "inner-leg",
        title: "Внутрішня поверхня",
        exercises: [
          { title: "Зведення ніг сидячи", fileId: "BAACAgIAAyEGAAS2J90iAANZaMWAaZzXOM_r_0C6-i-OUfRxpT8AAruOAAKQ9ylKbuN3be441Qk2BA" },
          { title: "Присідання з широкою постановкою ніг", fileId: "BAACAgIAAyEGAAS2J90iAANaaMWAbB06OrRWfJCRQ09PT-wpRgsAAryOAAKQ9ylKbk8yeOLNtaA2BA" },
          { title: "Бокові випади", fileId: "BAACAgIAAyEGAAS2J90iAANbaMWAbjtYnQiJO2okDK8m8GQp6ksAAr2OAAKQ9ylK8zstp-viCCE2BA" },
        ],
      },
      {
        key: "rear-leg",
        title: "Задня поверхня",
        exercises: [
          { title: "Згинання ніг сидячи", fileId: "BAACAgIAAyEGAAS2J90iAANXaMWAYzMEl1syAyqbIdk0_q6hlTIAArmOAAKQ9ylKI9tQpXlA4xc2BA" },
          { title: "Згинання ніг лежачи", fileId: "BAACAgIAAyEGAAS2J90iAANYaMWAZ0nwnmgFprOvnJROdBfw6iMAArqOAAKQ9ylKcoYikvvXx_Y2BA" },
          { title: "Згинання ніг стоячи в кросовері", fileId: "BAACAgIAAyEGAAS2J90iAANWaMWAYB-Yo9glXdUmpZ3E2QiriqMAAreOAAKQ9ylKCysHgbJ-Sto2BA" },
          { title: "Румунська тяга з гантелями", fileId: "BAACAgIAAyEGAAS2J90iAANUaMWAW_3sfLwSB6lTLgRfXxtOyHQAArWOAAKQ9ylKcFis4N_qtCM2BA" },
          { title: "Румунська тяга зі штангою", fileId: "BAACAgIAAyEGAAS2J90iAANTaMWAWGQOZI9mSms0Bz0KDD1CP-QAArSOAAKQ9ylK2OjIWF0r_vo2BA" },
          { title: "Румунська тяга в сміті", fileId: "BAACAgIAAyEGAAS2J90iAANSaMWAUss38F8cWFZnj1JcQos0euIAArOOAAKQ9ylKV1BpM4Qs_4U2BA" },
          { title: "Румунська тяга на 1 нозі", fileId: "BAACAgIAAyEGAAS2J90iAANVaMWAXYhzytCazmFzgjFpJ_hJiqMAAraOAAKQ9ylK0zfEKNpaHB42BA" },
        ],
      },
    ],
  },
];
