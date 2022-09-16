import { FormSchemaDef } from "../types";
declare const _default: import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<{
    schema: FormSchemaDef;
    modelValue: any;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:model-value"[], "update:model-value", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    schema?: unknown;
    modelValue?: unknown;
} & {
    schema: FormSchemaDef;
    modelValue: any;
} & {}> & {
    "onUpdate:model-value"?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _default;
declare type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
declare type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
