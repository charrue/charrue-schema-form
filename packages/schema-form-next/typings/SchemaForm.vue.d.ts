import type { FormItemRule } from "./types";
import { FormSchemaDef } from "./types";
declare const _default: {
    new (...args: any[]): {
        $: import("vue").ComponentInternalInstance;
        $data: {};
        $props: Partial<{}> & Omit<Readonly<{
            modelValue?: unknown;
            formRef?: unknown;
            schema?: unknown;
            rules?: unknown;
            disabled?: unknown;
        } & {
            schema: Record<string, FormSchemaDef>;
            modelValue: Record<string, any>;
        } & {
            disabled?: boolean | undefined;
            formRef?: string | undefined;
            rules?: Record<string, FormItemRule[]> | undefined;
        }> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, never>;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: import("vue").Slot | undefined;
        }>;
        $root: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $parent: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $emit: (event: "update:modelValue", ...args: any[]) => void;
        $el: any;
        $options: import("vue").ComponentOptionsBase<Readonly<{
            modelValue?: unknown;
            formRef?: unknown;
            schema?: unknown;
            rules?: unknown;
            disabled?: unknown;
        } & {
            schema: Record<string, FormSchemaDef>;
            modelValue: Record<string, any>;
        } & {
            disabled?: boolean | undefined;
            formRef?: string | undefined;
            rules?: Record<string, FormItemRule[]> | undefined;
        }> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        }, {
            validate: import("vue").ComputedRef<any>;
            scrollToField: import("vue").ComputedRef<any>;
            clearValidate: import("vue").ComputedRef<any>;
            validateField: import("vue").ComputedRef<any>;
            resetFields: import("vue").ComputedRef<any>;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], string, {}> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof import("vue").nextTick;
        $watch(source: string | Function, cb: Function, options?: import("vue").WatchOptions<boolean> | undefined): import("vue").WatchStopHandle;
    } & Readonly<{
        modelValue?: unknown;
        formRef?: unknown;
        schema?: unknown;
        rules?: unknown;
        disabled?: unknown;
    } & {
        schema: Record<string, FormSchemaDef>;
        modelValue: Record<string, any>;
    } & {
        disabled?: boolean | undefined;
        formRef?: string | undefined;
        rules?: Record<string, FormItemRule[]> | undefined;
    }> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    } & import("vue").ShallowUnwrapRef<{
        validate: import("vue").ComputedRef<any>;
        scrollToField: import("vue").ComputedRef<any>;
        clearValidate: import("vue").ComputedRef<any>;
        validateField: import("vue").ComputedRef<any>;
        resetFields: import("vue").ComputedRef<any>;
    }> & {} & {} & import("vue").ComponentCustomProperties;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import("vue").ComponentOptionsBase<Readonly<{
    modelValue?: unknown;
    formRef?: unknown;
    schema?: unknown;
    rules?: unknown;
    disabled?: unknown;
} & {
    schema: Record<string, FormSchemaDef>;
    modelValue: Record<string, any>;
} & {
    disabled?: boolean | undefined;
    formRef?: string | undefined;
    rules?: Record<string, FormItemRule[]> | undefined;
}> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    validate: import("vue").ComputedRef<any>;
    scrollToField: import("vue").ComputedRef<any>;
    clearValidate: import("vue").ComputedRef<any>;
    validateField: import("vue").ComputedRef<any>;
    resetFields: import("vue").ComputedRef<any>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: Record<string, {}> & Record<string, {}> & Record<string, {}> & {
        extra: (_: {}) => any;
    };
});
export default _default;
