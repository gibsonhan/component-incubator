import React from 'react';

import SimpleTable from 'components/Table/Simple';
import BoolFilter from '../BoolFilter.js/BoolFilter';
import SetFilter from '../SetFilter.js/SetFilter';
import FormatSetCell from 'components/Cell/FormatSetCell'
export default {
  title: 'Components/Table/SimpleTable',
  component: SimpleTable,
};


const firstNameCol = {
  id: 'firstName',
  accessor: 'firstName',
  Header: 'First Name',
  sortable: true,
};
const lastNameCol = {
  id: 'lastName',
  accessor: 'lastName',
  Header: 'Last Name',
};
const ageCol = {
  id: 'age',
  accessor: 'age',
  Header: 'Age',
  sortable: true,
};

const colorCol = {
  id: 'color',
  accessor: 'color',
  Header: 'Color',
  sortable: true,
  Filter: SetFilter,
  Cell: FormatSetCell,
};

const boolCol = {
  id: 'bool',
  accessor: 'bool',
  Header: 'Bool',
  sortable: true,
  Filter: BoolFilter,
}

const data = [
  {
    firstName: 'Joe',
    lastName: 'Jackson',
    age: 10,
    color: ['yellow', 'green', 'blue'],
    bool: 'true',
    subRows: [
      {
        firstName: 'Jeff',
        lastName: 'Jackson',
        age: 7,
      }, {
        firstName: 'Jerome',
        lastName: 'Jackson',
        age: 8,
      },
    ],
  }, {
    firstName: 'Janet',
    lastName: 'Jackson',
    age: 10,
    bool: 'false',
    color: ['orange'],
    subRows: [
      {
        firstName: 'Jill',
        lastName: 'Jackson',
        age: 11,
      }, {
        firstName: 'Jessica',
        lastName: 'Jackson',
        age: 12,
      },
    ],
  }, {
    firstName: 'Sally',
    lastName: 'Simpson',
    age: 20,
    subRows: [
      {
        firstName: 'Sasha',
        lastName: 'Simpson',
        age: 9,
      }, {
        firstName: 'Samantha',
        lastName: 'Simpson',
        age: 10,
      },
    ],
  }, {
    firstName: 'Sam',
    lastName: 'Simpson',
    age: 20,
    subRows: [
      {
        firstName: 'Saul',
        lastName: 'Simpson',
        age: 1,
      }, {
        firstName: 'Stan',
        lastName: 'Simpson',
        age: 2,
      },
    ],
  }, {
    firstName: 'Bob',
    lastName: 'Barrington',
    age: 30,
  }, {
    firstName: 'Barbara',
    lastName: 'Barrington',
    age: 30,
  }, {
    firstName: 'Mark',
    lastName: 'Mancino',
    age: 40,
  }, {
    firstName: 'Michelle',
    lastName: 'Mancino',
    age: 40,
  }, {
    firstName: 'Ryan',
    lastName: 'Remington',
    age: 50,
  }, {
    firstName: 'Rachel',
    lastName: 'Remington',
    age: 50,
  }, {
    firstName: 'Katrin',
    lastName: 'Ko',
    age: 60,
    subRows: [
      {
        firstName: 'Kendall',
        lastName: 'Ko',
        age: 48,
      }, {
        firstName: 'Kira',
        lastName: 'Ko',
        age: 44,
        subRows: [
          {
            firstName: 'Kimberly',
            lastName: 'Ko',
            age: 28,
            subRows: [
              {
                firstName: 'Kora',
                lastName: 'Ko',
                age: 1,
              }, {
                firstName: 'Kylie',
                lastName: 'Ko',
                age: 3,
              },
            ],
          }, {
            firstName: 'Keisha',
            lastName: 'Ko',
            age: 20,
          },
        ],
      },
    ],
  }, {
    firstName: 'Ken',
    lastName: 'Ko',
    age: 60,
    subRows: [
      {
        firstName: 'Kingsley',
        lastName: 'Ko',
        age: 19,
      }, {
        firstName: 'Kai',
        lastName: 'Ko',
        age: 29,
        subRows: [
          {
            firstName: 'Khalil',
            lastName: 'Ko',
            age: 1,
          }, {
            firstName: 'Keaton',
            lastName: 'Ko',
            age: 3,
          },
        ],
      },
    ],
  },
];

const defaultCols = [{ ...firstNameCol }, { ...lastNameCol }, { ...ageCol }, { ...colorCol }, { ...boolCol }];
const defaultTemplate = (args) => (<SimpleTable {...args} />);

export const Default = defaultTemplate.bind();
Default.args = {
  columns: [...defaultCols],
  data,
  expandable: false,
};

export const Expandable = defaultTemplate.bind();
Expandable.args = {
  columns: [...defaultCols],
  data,
  expandable: true,
};


export const EvenHeaderGroup = defaultTemplate.bind();
EvenHeaderGroup.args = {
  columns: [
    {
      id: 'name',
      Header: 'Name',
      columns: [{ ...firstNameCol }, { ...lastNameCol }],
    },
    {
      id: 'info',
      Header: 'Info',
      columns: [{ ...ageCol }],
    },
  ],
  data,
  expandable: true,
};


export const UnevenHeaderGroup = defaultTemplate.bind();
UnevenHeaderGroup.args = {
  columns: [
    {
      id: 'name',
      Header: 'Name',
      columns: [{ ...firstNameCol }, { ...lastNameCol }],
    },
    { ...ageCol },
  ],
  data,
  expandable: true,
};

/**
 *  WIP stories
 *  - Stories
 *    - full screen
 *    - filter and reset filter
 */