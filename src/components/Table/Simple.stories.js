import React from 'react';

import SimpleTable from 'components/Table/Simple';
import NestedSetSelectFilter from 'components/SelectOptionFilter/NestedSetSelectFilter';
import StandardSelectFilter from 'components/SelectOptionFilter/StandardSelectFilter';
import FormatSetCell from 'components/Cell/FormatSetCell'
import { appendData, appendSetData } from '../../dataGenerator/appendData';

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
  Filter: NestedSetSelectFilter,
  Cell: FormatSetCell,
  sortType: 'NestedSet'
};

const boolCol = {
  id: 'bool',
  accessor: 'bool',
  Header: 'Bool',
  sortable: true,
  Filter: StandardSelectFilter,
}

const meatCol = {
  id: 'meat',
  accessor: 'meat',
  Header: 'Meat',
  sortable: true,
  Filter: StandardSelectFilter,
}

const data = [
  {
    firstName: 'Joe',
    lastName: 'Jackson',
    age: 10,
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
    color: ['green', 'black'],
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

const defaultCols = [{ ...firstNameCol }, { ...lastNameCol }, { ...ageCol }];
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

//WIP need to handle column sort
export const NestedSetOptionFilter = defaultTemplate.bind();
NestedSetOptionFilter.args = {
  columns: [...defaultCols, { ...colorCol }],
  data: appendSetData(data, 'color', ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violent'].sort()),
  expandable: false
}

export const BooleanOptionFilter = defaultTemplate.bind();
BooleanOptionFilter.args = {
  columns: [...defaultCols, { ...boolCol }],
  data: appendData(data, 'bool', ['true', 'false']),
  expandable: false,
}

export const MultipleOptionFilter = defaultTemplate.bind();
MultipleOptionFilter.args = {
  columns: [...defaultCols, { ...meatCol }],
  data: appendData(data, 'meat', ['beef', 'chicken', 'pork', 'sheep', 'lamb', 'duck']),
  expandable: false,
}
