import { TableColumnProp } from '../types/table-column.type';
export type ValueGetter = (obj: any, prop: TableColumnProp) => any;
/**
 * Always returns the empty string ''
 */
export declare function emptyStringGetter(): string;
/**
 * Returns the appropriate getter function for this kind of prop.
 * If prop == null, returns the emptyStringGetter.
 */
export declare function getterForProp(prop: TableColumnProp): ValueGetter;
/**
 * Returns the value at this numeric index.
 * @param row array of values
 * @param index numeric index
 * @returns any or '' if invalid index
 */
export declare function numericIndexGetter(row: any[], index: number): any;
/**
 * Returns the value of a field.
 * (more efficient than deepValueGetter)
 * @param obj object containing the field
 * @param fieldName field name string
 */
export declare function shallowValueGetter(obj: any, fieldName: string): any;
/**
 * Returns a deep object given a string. zoo['animal.type']
 */
export declare function deepValueGetter(obj: any, path: string): any;
