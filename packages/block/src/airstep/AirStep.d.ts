/**
 *
 * Airstep
 *
 * @module Airstep
 *
 */
import type { DefineComponent, EmitFn, GlobalComponentConstructor } from '../index';
import { VNode } from 'vue';
import { iconPropType } from 'element-plus/es/utils/vue/icon';

interface stepObj {
    label?: string | undefined;
}
export interface AirstepProps {
    /**
     * 当前激活步骤
     */
    active?: number | undefined;
    /**
     * 是否居中
     */
    isCenter?: boolean | undefined;
    /**
     * 步骤
     */
    steps?: Array<stepObj> | undefined;
    /**
     * 是否水平展示
     */
    isHorizontal?: boolean | undefined;
    /**
     * icon
     */
    icon?: typeof iconPropType | undefined;
}
export interface AirstepSlots {
    default(): VNode[];
}
export interface AirstepEmitsOptions {}
export declare type AirstepEmits = EmitFn<AirstepEmitsOptions>;

declare const Airstep: DefineComponent<AirstepProps, AirstepSlots, AirstepEmits>;

declare module 'vue' {
    export interface GlobalComponents {
        Airstep: GlobalComponentConstructor<AirstepProps, AirstepSlots, AirstepEmits>;
    }
}

export default Airstep;
