import fs from 'fs';
import get from 'lodash.get';
import { reflect } from '@plumier/reflect';
import { Class } from '@mockinbird/common';
import { FixtureEngine } from './fixture-engine';
import { MockSnapshot, SnapshotFile } from '../interfaces/interfaces';
import { Logger } from '@mockinbird/logger/dist/logger';

export class SnapshotLoader<TClass = unknown> {
  public readonly contents: MockSnapshot<TClass>;

  public constructor(readonly name: string, readonly path: string) {
    this.contents = this.parse();
  }

  private parse(): MockSnapshot<TClass> {
    const { name, path } = this;

    try {
      if (!fs.existsSync(`${path}/${name}.mock`)) {
        throw new Error(`${path}/${name}.mock not found`);
      }

      const snapshotContents = fs.readFileSync(`${path}/${name}.mock`, 'utf-8');
      return JSON.parse(snapshotContents) as MockSnapshot<TClass>;
    } catch (error) {
      throw new Error(
        `
        Mockingbird can not find fixture named '${name}'. \n
        Maybe you are trying to load a variant of another fixture?
        Possible solution: MockFactory(<base-fixture-name>).variant(<fixture-variant-name>)
        `
      );
    }
  }

  public isVariantExists(variant: string): boolean {
    return this.contents.variants.hasOwnProperty(variant);
  }

  public async load(variant?: string): Promise<TClass> {
    const { file, variants = {}, targetClass, name, values = {} } = this.contents;

    const mockClasses = await import(`${FixtureEngine.getMocksDirectory()}/${file}`);
    const actualClass = mockClasses[targetClass];

    const { decorators = [] } = reflect(actualClass as Class<TClass>);
    const found = decorators.find((decorator) => decorator.type === 'Fixture');

    const fixtureName = get(found, 'value.name');
    const fixtureSourceClass = get(found, 'value.options.class') as Class<TClass>;

    let instance: TClass;

    if (fixtureName === name && fixtureSourceClass) {
      instance = new fixtureSourceClass();
    } else {
      Logger.warn(`Fixture '${name}' created from ${targetClass} has no source class, relying on mock class instead`);
      Logger.info(`If you want to instantiate it from a different class please add { src: <Class> } to your fixture`);

      instance = new mockClasses();
    }

    const base = Object.assign(instance, values);

    if (variant) {
      if (!this.isVariantExists(variant)) {
        throw new Error(
          `
        Mockingbird can not find variant of fixture '${name}' named '${variant}'. \n
        Did you create a variant for your base fixture ('${name}')?
        Note: check the file ${`${FixtureEngine.getMocksDirectory()}/${file}`}
        `
        );
      }

      return Object.assign(base, variants[variant].values);
    }

    return base;
  }

  public static create<TClass = unknown>(snapshot: SnapshotFile): SnapshotLoader<TClass> {
    return new SnapshotLoader(snapshot.name, snapshot.path);
  }
}
