import { ClassLiteral } from '@mockinbird/common';

export type MockSnapshot<TClass> = {
  name: string;
  file: string;
  targetClass: string;
  baseClass: string | undefined;
  values: Partial<ClassLiteral<TClass>>;
  variants?: { [key: string]: Omit<MockSnapshot<unknown>, 'file'> };
};

export interface SnapshotFile {
  readonly name: string;
  readonly path: string;
}
