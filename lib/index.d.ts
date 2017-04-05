import * as createElement from 'inferno-create-element';
export declare const h: typeof createElement;
export declare const log: {
    onReducerCalled(state: any, prev: any, name: any, ...args: any[]): void;
    onEffectCalled(state: any, name: any, ...args: any[]): void;
};
export default function (opts: any): void;
