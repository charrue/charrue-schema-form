type SyncErrorType = Error | string;
type SyncValidateResult = boolean | SyncErrorType | SyncErrorType[];
interface RuleItem {
  type?: string;
  required?: boolean;
  pattern?: RegExp | string;
  min?: number;
  max?: number;
  len?: number;
  enum?: Array<string | number | boolean | null | undefined>;
  whitespace?: boolean;
  fields?: Record<string, Rule>;
  options?: Record<string, any>;
  defaultField?: Rule;
  transform?: (value: any) => any;
  message?: string | ((a?: string) => string);
  asyncValidator?: (
    rule: any,
    value: any,
    callback: (error?: string | Error) => void,
    source: any,
    options: Record<string, any>
  ) => void | Promise<void>;
  validator?: (
    rule: any,
    value: any,
    callback: (error?: string | Error) => void,
    source: Record<string, any>,
    options: Record<string, any>
  ) => SyncValidateResult;
}

type Rule = RuleItem | RuleItem[];

export interface FormItemRule extends RuleItem {
  trigger?: string | string[];
}
