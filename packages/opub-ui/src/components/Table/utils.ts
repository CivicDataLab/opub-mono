import { faker } from '@faker-js/faker';

import { range } from '../../utils';

export type Person = {
  firstName: any;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
  action?: any;
};

const newPerson = (): Person => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
    status: faker.helpers.shuffle<Person['status']>([
      'relationship',
      'complicated',
      'single',
    ])[0]!,
  };
};

export function makeTableData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return range(len).map((): Person => {
      return {
        ...newPerson(),
      };
    });
  };

  return makeDataLevel();
}
