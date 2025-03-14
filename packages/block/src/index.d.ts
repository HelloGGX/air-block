/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    AllowedComponentProps,
    ComponentCustomProps,
    MethodOptions,
    ObjectEmitsOptions,
    SlotsType,
    VNodeProps,
    DefineComponent as _DefineComponent
} from 'vue';

declare type PublicProps = VNodeProps & AllowedComponentProps & ComponentCustomProps;

declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export declare type EmitFn<Options = ObjectEmitsOptions, Event extends keyof Options = keyof Options> =
    Options extends Array<infer V>
        ? (e: V, ...args: any[]) => void
        : {} extends Options
          ? (e: string, ...args: any[]) => void
          : UnionToIntersection<
                {
                    [key in Event]: Options[key] extends (...args: infer Args) => any
                        ? (e: key, ...args: Args) => void
                        : (e: key, ...args: any[]) => void;
                }[Event]
            >;

export type DefineComponent<P = {}, S = {}, E = {}, M = {}> = _DefineComponent<
    P,
    {},
    {},
    {},
    M & MethodOptions,
    {},
    {},
    E & ObjectEmitsOptions,
    string,
    {},
    {},
    {},
    S & SlotsType
>;

export type GlobalComponentConstructor<P = {}, S = {}, E = {}, M = {}> = {
    new (): {
        $props: P & PublicProps;
        $slots: S;
        $emit: E;
    } & M;
};

/**
 * Custom types
 */
export declare type Booleanish = boolean | 'true' | 'false';

export declare type Numberish = number | string;

export declare type Nullable<T = void> = T | null | undefined;

export declare type HintedString<T extends string> = (string & {}) | T;
