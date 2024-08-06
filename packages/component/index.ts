import { makeInstaller } from "element-plus/es/make-installer";
import { AirButton } from "@air-ui/component/button";
import type { Plugin } from "vue";

const Components = [AirButton] as Plugin[];

export * from "@air-ui/component/src";
export default makeInstaller([...Components]);
