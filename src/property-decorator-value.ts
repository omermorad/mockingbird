import { FixtureOptions, MultiClass } from './types/fixture-options.type';

export class PropertyDecoratorValue<T extends FixtureOptions> {
  private readonly type: string;

  constructor(public readonly value: FixtureOptions) {
    this.type = typeof value;
  }

  isObject(): boolean {
    return this.type === 'object';
  }

  isFunction(): boolean {
    return this.type === 'function';
  }

  isMultiClass(): boolean {
    return this.isObject() && (this.value as MultiClass).hasOwnProperty('type');
  }

  isCallback(): boolean {
    return typeof this.value === 'function';
  }

  isEnum() {
    return this.isObject() && this.value.hasOwnProperty('enum');
  }
}
