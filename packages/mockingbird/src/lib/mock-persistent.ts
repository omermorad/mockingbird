import * as fileSystem from 'fs';
import { GeneratedMock } from '../types';

export interface PersistentDto {
  baseMock: GeneratedMock;
  slug: string;
}

export class MockPersistent {
  private mockData: GeneratedMock = {};

  public constructor(private readonly fs: typeof fileSystem, private readonly options: { fileName: string }) {
    this.readFile();
  }

  private readFile() {
    const { fileName } = this.options;

    if (this.fs.existsSync(fileName)) {
      try {
        const fileData = this.fs.readFileSync(fileName, 'utf-8');
        this.mockData = JSON.parse(fileData);
      } catch (e) {
        console.error(`The mock file '${fileName}' can not be parsed due to JSON error`);
      }
    }
  }

  private saveFile() {
    const data = JSON.stringify(this.mockData);
    this.fs.writeFileSync(this.options.fileName, data);
  }

  public process(config: PersistentDto): GeneratedMock {
    const { baseMock, slug } = config;

    if (this.mockData.hasOwnProperty(slug)) {
      return this.mockData[slug];
    }

    console.log(`The slug '${slug}' can not be found inside '${this.options.fileName}', creating one..`);

    this.mockData[slug] = baseMock;
    this.saveFile();

    return baseMock;
  }
}
