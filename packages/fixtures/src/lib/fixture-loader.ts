import * as fs from 'fs';
import { FixtureEngine } from './fixture-engine';
import { SnapshotLoader } from './snapshot-loader';

export interface FixtureLoader<TClass = unknown> {
  load(): Promise<TClass>;
}

export class FixtureLoader<TClass = unknown> {
  private fixtureVariantName: string;

  public constructor(private readonly fixtureName: string) {}

  public variant(variant: string): this {
    this.fixtureVariantName = variant;
    return this;
  }

  public async load(): Promise<TClass> {
    const mockDir = FixtureEngine.getMocksDirectory();
    const snapshotPath = `${mockDir}/snapshots`;

    if (!fs.existsSync(snapshotPath)) {
      throw new Error('Can not find directory "snapshots" under "mocks"');
    }

    const snapshot = SnapshotLoader.create<TClass>({ name: this.fixtureName, path: snapshotPath });
    return snapshot.load(this.fixtureVariantName);
  }
}
