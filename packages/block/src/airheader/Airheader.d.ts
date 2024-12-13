/**
 *
 * Airheader
 *
 * @module Airheader
 *
 */
import type { DefineComponent, EmitFn, GlobalComponentConstructor } from '../index';
import { VNode } from 'vue';

export interface AirheaderProps {
    title?: string;
}
export interface AirheaderSlots {
    default(): VNode[];
}
export interface AirheaderEmitsOptions {
    click: (evt: MouseEvent) => void;
}
export declare type AirheaderEmits = EmitFn<AirheaderEmitsOptions>;

declare const Airheader: DefineComponent<AirheaderProps, AirheaderSlots, AirheaderEmits>;

declare module 'vue' {
    export interface GlobalComponents {
        Airheader: GlobalComponentConstructor<AirheaderProps, AirheaderSlots, AirheaderEmits>;
    }
}

export default Airheader;
