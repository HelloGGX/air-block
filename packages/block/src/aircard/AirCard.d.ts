/**
 * @module AirCard
 */

import type { DefineComponent, EmitFn, GlobalComponentConstructor } from '../index';
// import { VNode } from 'vue';

/**
 * 定义AircCard组件的当前内联状态
 */
export interface AirCardState {
    /**
     * 当前id状态
     */
    id: string;
}

/**
 * 定义AirCard组件的有效属性
 */
export interface AirCardProps {
    /**
     * 序号
     */
    num?: number | undefined;
    /**
     * 姓名
     */
    name?: string | undefined;
    /**
     * 座位号
     */
    seatNum?: string | undefined;
    /**
     * 卡片高度
     */
    height?: string | undefined;
    /**
     * 是否显示关闭图标
     * @defaultValue false
     */
    showClose?: boolean | undefined;
}

/**
 * 定义AirCard组件的有效事件
 */
export interface AirCardEmitsOptions {
    /**
     * 点击关闭时触发
     */
    close: () => void;
    /**
     * 点击卡片时触发
     */
    select: () => void;
}

export declare type AirCardEmits = EmitFn<AirCardEmitsOptions>;

declare const AirCard: DefineComponent<AirCardProps, AirCardEmits>;

declare module 'vue' {
    export interface GlobalComponents {
        AirCard: GlobalComponentConstructor<AirCardProps, AirCardEmits>;
    }
}

export default AirCard;
