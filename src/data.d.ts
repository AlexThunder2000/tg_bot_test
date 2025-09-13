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
export declare const CATEGORIES: Category[];
//# sourceMappingURL=data.d.ts.map