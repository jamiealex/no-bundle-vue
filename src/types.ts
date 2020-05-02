import vue from 'rollup-plugin-vue';
import { Plugin } from 'rollup';

export type NoBundleVueOptions = {
    sourceDirectory: string;
    outputDirectory: string;
    config: {
        vueRollupOptions: Parameters<typeof vue>[0]
        rollupPlugins: Plugin[],
    },
};
