import { Class, LazyEnum, isPrimitive, LazyType } from '@mockingbird/common';
import { DecoratorArgs } from '../types';

export interface PropertyDecoratorValue {
  readonly decorator: DecoratorArgs;
  isObject(): boolean;
  isMultiClass(): boolean;
  isFunction(): boolean;
  isEnum(): boolean;
  isRegex(): boolean;
}

export class PropertyDecoratorValue {
  private readonly valueType: string;

  public constructor(public readonly decorator: DecoratorArgs) {
    this.valueType = typeof decorator.value;
  }

  private static isConstructor(ctor: Class) {
    return ctor.prototype && ctor.prototype.constructor;
  }

  public isClassCb(): boolean {
    if (this.isFunction()) {
      const { value } = this.decorator;
      const type = (value as LazyType)();

      return PropertyDecoratorValue.isConstructor(type);
    }

    return false;
  }

  public isObject(): boolean {
    return this.valueType === 'object';
  }

  public isArrayOfClasses(): boolean {
    if (!this.isFunction()) {
      return false;
    }

    const { value } = this.decorator;
    const type = (value as LazyType)();

    if (isPrimitive(type.name) && this.decorator.options?.count !== undefined) {
      return true;
    }

    return this.isClassCb() && this.decorator.options?.count !== undefined;
  }

  public isFunction(): boolean {
    return this.valueType === 'function';
  }

  public isEnum(): boolean {
    const { value } = this.decorator;

    if (!value) {
      return false;
    }

    if (!Object.prototype.hasOwnProperty.call(value, 'enum')) {
      return false;
    }

    const enumObj = value as LazyEnum;
    return typeof enumObj.enum === 'function';
  }

  public isRegex(): boolean {
    return this.decorator.value instanceof RegExp;
  }
}
