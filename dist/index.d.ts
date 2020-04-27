declare type NoBundleVueOptions = {
    sourceDirectory: string;
    outputDirectory: string;
};
export default function noBundleVue({ sourceDirectory, outputDirectory, }: NoBundleVueOptions): Promise<void>;
export {};
