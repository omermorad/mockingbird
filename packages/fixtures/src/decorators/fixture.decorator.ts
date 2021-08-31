import { decorateClass } from '@plumier/reflect';
import { Class } from '@mockinbird/common';

export const FIXTURE_DECORATOR_NAME = 'Fixture';

interface FixtureDecoratorOptions {
  class?: Class;
  base?: string;
}

export function Fixture(name: string): ClassDecorator;
export function Fixture(name: string, variant: { base: string }): ClassDecorator;
export function Fixture(name: string, instanceOf: { class: Class }): ClassDecorator;
export function Fixture(name: string, options?: FixtureDecoratorOptions): ClassDecorator;

export function Fixture(name: string, options: FixtureDecoratorOptions = {}): ClassDecorator {
  return decorateClass({
    type: FIXTURE_DECORATOR_NAME,
    value: { name, options },
  });
}
