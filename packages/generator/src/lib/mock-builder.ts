import { ClassLiteral, Class } from '@mockinbird/types';
import { MockGenerator } from './mock-generator';

export interface MockBuilder<TClass = any> {
  setLocale(locale: string): this;
  toPlain(): this;
  many(count: number): TClass[];
  one(): TClass;
}

export class MockBuilder<TClass = any> {
  private isPlain = false;
  private locale = 'en';

  public constructor(private readonly targetClass: Class<TClass>, private readonly mockGenerator: MockGenerator) {}

  private process(mock: TClass[]): TClass[] | ClassLiteral<TClass>[];
  private process(mock: TClass): TClass | ClassLiteral<TClass>;

  private process(mock: TClass[] | TClass): TClass | ClassLiteral<TClass> | TClass[] | ClassLiteral<TClass>[] {
    let newMock = mock;

    if (this.isPlain) {
      if ((mock as TClass[]).length > 1) {
        newMock = (mock as TClass[]).map((mock) => Object.assign({}, mock));
      } else {
        newMock = Object.assign({}, mock);
      }
    }

    return newMock;
  }

  public setLocale(locale: string): this {
    this.locale = locale;
    return this;
  }

  public toPlain(): this {
    this.isPlain = true;
    return this;
  }

  public many(count: number): TClass[] {
    const mock: TClass[] = this.mockGenerator.create(this.targetClass, { locale: this.locale, count });
    return this.process(mock);
  }

  public one(): TClass {
    const mock: TClass = this.mockGenerator.create(this.targetClass, this.locale);
    return this.process(mock);
  }
}
