/**
 *
 * Airlayout
 *
 * @module Airlayout
 *
 */
import type { DefineComponent, EmitFn, GlobalComponentConstructor } from '../index';
import { VNode } from 'vue';

export interface AirlayoutProps {}
export interface AirlayoutSlots {
    default(): VNode[];
    header?: () => VNode[]; // 添加头部插槽
    footer?: () => VNode[]; // 添加底部插槽
}
export interface AirlayoutEmitsOptions {}
export declare type AirlayoutEmits = EmitFn<AirlayoutEmitsOptions>;

declare const Airlayout: DefineComponent<AirlayoutProps, AirlayoutSlots, AirlayoutEmits>;

declare module 'vue' {
    export interface GlobalComponents {
        Airlayout: GlobalComponentConstructor<AirlayoutProps, AirlayoutSlots, AirlayoutEmits>;
    }
}

export default Airlayout;
