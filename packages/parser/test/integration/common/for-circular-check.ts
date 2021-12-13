import { Mock } from '@mockingbird/reflect';
import { TestClasses } from './test-classes';

import Dog = TestClasses.Dog;

export class ForCircularCheck {
  @Mock(() => Dog)
  dog: Dog;

  @Mock(12345)
  int: number;
}
