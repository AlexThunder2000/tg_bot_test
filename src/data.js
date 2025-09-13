"use strict";
// src/data.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATEGORIES = void 0;
exports.CATEGORIES = [
    { key: "back", title: "Спина", exercises: [] },
    { key: "chest", title: "Груди", exercises: [] },
    {
        key: "shoulder",
        title: "Плечі",
        subgroups: [
            { key: "front-delta", title: "Передня дельта", exercises: [] },
            { key: "mid-delta", title: "Середня дельта", exercises: [] },
            { key: "rear-delta", title: "Задня дельта", exercises: [] },
        ],
    },
    { key: "biceps", title: "Біцепс", exercises: [] },
    { key: "triceps", title: "Тріцепс", exercises: [] },
    { key: "glutes", title: "Сідниці", exercises: [] },
    {
        key: "legs",
        title: "Ноги",
        subgroups: [
            { key: "front-leg", title: "Передня поверхня", exercises: [] },
            { key: "inner-leg", title: "Внутрішня поверхня", exercises: [] },
            { key: "rear-leg", title: "Задня поверхня", exercises: [] },
        ],
    },
];
//# sourceMappingURL=data.js.map