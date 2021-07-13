import { MockOptions, MultiClass } from '../types/mock-options.type';

export class PropertyDecoratorValue {
  private readonly type: string;

  public constructor(public readonly value: MockOptions) {
    this.type = typeof value;
  }

  public isObject(): boolean {
    return this.type === 'object';
  }

  public isFunction(): boolean {
    return this.type === 'function';
  }

  public isMultiClass(): boolean {
    return this.isObject() && (this.value as MultiClass).hasOwnProperty('type');
  }

  public isCallback(): boolean {
    return typeof this.value === 'function';
  }

  public isEnum(): boolean {
    return this.isObject() && this.value.hasOwnProperty('enum');
  }
}
