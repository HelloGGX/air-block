/**
 *
 * Airflightinfo
 *
 * @module Airflightinfo
 *
 */

import type { DefineComponent, EmitFn, GlobalComponentConstructor } from '../index';
import { VNode } from 'vue';

export interface AirflightinfoProps {
    /**
     * 航班
     */
    flightNum?: string | undefined;
    /**
     * 承运航班
     */
    carriageFlightNum?: string | undefined;
    /**
     * 日期
     */
    flightDate?: string | undefined;
    /**
     * 航班标签
     */
    flightTag?: string | undefined;
    /**
     * 起飞航站
     */
    depFlight?: string | undefined;
    /**
     * 降落航站
     */
    arrFlight?: string | undefined;
}
export interface AirflightinfoSlots {
    default(): VNode[];
}
export interface AirflightinfoEmitsOptions {}
export declare type AirflightinfoEmits = EmitFn<AirflightinfoEmitsOptions>;

declare const Airflightinfo: DefineComponent<AirflightinfoProps, AirflightinfoSlots, AirflightinfoEmits>;

declare module 'vue' {
    export interface GlobalComponents {
        Airflightinfo: GlobalComponentConstructor<AirflightinfoProps, AirflightinfoSlots, AirflightinfoEmits>;
    }
}

export default Airflightinfo;
