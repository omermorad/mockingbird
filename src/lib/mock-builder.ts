import { MockGenerator } from '../factories';
import { Class, ClassLiteral, GeneratedMock } from '../types';
import { MockPersistent } from './mock-persistent';

export class MockBuilder<TClass extends Class> {
  private doPersist = false;
  private slug = undefined;
  private isPlain = false;
  private locale = 'en';

  public constructor(private readonly targetClass: Class, private readonly persistent: MockPersistent) {}

  private process(mock: TClass[]): TClass[] | ClassLiteral<TClass>[];
  private process(mock: TClass): TClass | ClassLiteral<TClass>;

  private process(mock: TClass | TClass[]): GeneratedMock | TClass[] | ClassLiteral<TClass>[] {
    let newMock;

    if (this.isPlain) {
      if (mock.length > 1) {
        newMock = (mock as TClass[]).map((mock) => Object.assign({}, mock));
      }

      newMock = Object.assign({}, mock);
    }

    if (this.doPersist) {
      return this.persistent.process({
        slug: this.slug,
        baseMock: newMock,
      });
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
    const mock: TClass[] = MockGenerator.create<TClass>(this.targetClass, { locale: this.locale, count });
    return this.process(mock);
  }

  public one(): TClass {
    const mock: TClass = MockGenerator.create<TClass>(this.targetClass); // TODO: Add locale
    return this.process(mock);
  }

  public persist(slug: string): this {
    this.doPersist = true;
    this.slug = slug;

    return this;
  }
}
