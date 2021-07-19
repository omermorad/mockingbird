import { MultiClass } from '@mockinbird/types';
import { MockOptions } from '../types/mock-options.type';

export class PropertyDecoratorValue {
  private readonly type: string;

  public constructor(public readonly value: MockOptions) {
    this.type = typeof value;
  }

  public isObject(): boolean {
    return this.type === 'object';
  }

  public isMultiClass(): boolean {
    return this.isObject() && (this.value as MultiClass).hasOwnProperty('type');
  }

  public isCallback(): boolean {
    return this.type === 'function';
  }

  public isEnum(): boolean {
    return this.isObject() && this.value.hasOwnProperty('enum');
  }
}
