import { ObjectLiteral } from '@mockinbird/common';
import get from 'lodash.get';

export class FixtureEngine {
  public static getMocksDirectory(): string {
    const cwd = process.cwd();
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pkg = require(`${cwd}/package.json`) as ObjectLiteral;
    const mocksDir = get(pkg, 'mockingbird.mocksDir');

    if (mocksDir) {
      return `${cwd}/${mocksDir}`;
    }

    return `${cwd}/mocks`;
  }
}
