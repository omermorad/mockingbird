import { Inject, Service } from 'typedi';
import { Faker, Class } from '@mockinbird/common';
import { ParserConfig } from '../../types/types';
import { ClassAnalyzer } from '../analyzer/class-analyzer';

export interface ClassParser<TClass = any> {
  parse(target: Class<TClass>): TClass;
  parse(target: Class<TClass>, config?: ParserConfig<TClass>): TClass;
  setFakerLocale(locale: Faker['locale']): void;
}

@Service()
export class ClassParser<TClass = any> {
  public constructor(@Inject('Faker') private readonly faker: Faker) {}

  public setFakerLocale(locale: Faker['locale']): void {
    this.faker.setLocale(locale);
  }

  /**
   * Return an object from the target class with all the properties
   * decorated by the 'Mock' Decorator
   *
   * @param targetClass
   */
  public parse(targetClass: Class<TClass>): TClass;

  /**
   * Return an object from the target clxass with all the properties
   * decorated by the 'Mock' Decorator
   *
   * Receive some extra configurations
   *
   * @param targetClass
   * @param config
   */
  public parse(targetClass: Class<TClass>, config: ParserConfig<TClass>): TClass;

  /**
   * Return an object from the target class with all the properties
   * decorated by the 'Mock' Decorator
   *
   * @param targetClass
   * @param config
   */
  public parse(targetClass: Class<TClass>, config: ParserConfig<TClass> = {}): TClass {
    if (!targetClass) {
      throw new Error(`Target class is 'undefined'`);
    }

    const analyzer = ClassAnalyzer.create<TClass>(targetClass);
    return analyzer.analyzeProps(config);
  }
}
