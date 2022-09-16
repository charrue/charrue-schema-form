import type { FormSchemaDef, CreateSchemaTemplate } from "./types";
export declare const createDateRangeSchema: CreateSchemaTemplate;
export declare const createSelectSchema: CreateSchemaTemplate;
export declare const createInputSchema: CreateSchemaTemplate;
export declare const createRadioSchema: CreateSchemaTemplate;
/**
 * @example
 * createSchemaPipeline(
 *  createInputSchema("name", "Name"),
 *  createDateRangeSchema("dateRange", "Date"),
 * )
 */
export declare const createSchemaPipeline: (...rest: FormSchemaDef[]) => Record<string, FormSchemaDef>;
