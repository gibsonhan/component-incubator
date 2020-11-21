import React, { useState } from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useExpanded, useSortBy, useTable } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../Button/Button'

import './Simple.scss';

const propTypes = {
  tableProps: PropTypes.object,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Determines if table data has subRows that can be expanded.
   */
  expandable: PropTypes.bool,
  className: PropTypes.string,
};
/**
 * This renders a simple table based on react-table.
 *
 * This supports: sorting, expanding
 */
export default function SimpleTable({ tableProps = {}, columns = [], data, expandable = false, className }) {
  const [fullscreen, setFullScreen] = useState(false)
  const renderExpansionIcon = (expanded) => {
    if (expanded) {
      return <FontAwesomeIcon icon="chevron-right" className="simpleTable__expansion--rotateOpen" />;
    }
    return <FontAwesomeIcon icon="chevron-right" />;
  };

  if (expandable) {
    if (columns?.[0]?.id !== 'expander') {
      columns.unshift({
        id: 'expander',
        // eslint-disable-next-line react/prop-types
        Cell: ({ row }) => {
          // use the row.canExpand and row.getToggleRowExpandedProps prop getter to build the toggle for expanding a row
          // eslint-disable-next-line react/prop-types
          if (row.canExpand) {
            return (
              <span
                // eslint-disable-next-line react/prop-types
                {...row.getToggleRowExpandedProps({
                  style: {
                    // use the row.depth property and paddingLeft to indicate the depth of the row
                    // eslint-disable-next-line react/prop-types
                    paddingLeft: `${row.depth}rem`,
                  },
                })}
              >
                {
                  // eslint-disable-next-line react/prop-types
                  renderExpansionIcon(row.isExpanded)
                }
              </span>
            );
          }
          return null;
        },
        // eslint-disable-next-line react/prop-types
        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
          <span {...getToggleAllRowsExpandedProps()}>
            {renderExpansionIcon(isAllRowsExpanded)}
          </span>
        ),
        className: 'simpleTable__expansion',
      });
    }
  }

  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups if your table have groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function need to called for each row before getting the row props)
  } = useTable({ columns, data, ...tableProps }, useSortBy, useExpanded);

  const renderSortIcon = (col) => {
    if (col.sortable) {
      if (col.isSorted) {
        if (col.isSortedDesc) {
          return <span>&nbsp;<FontAwesomeIcon icon="sort-down" aria-label="sort descending" /></span>;
        } else {
          return <span>&nbsp;<FontAwesomeIcon icon="sort-up" aria-label="sort ascending" /></span>;
        }
      }
      return <span>&nbsp;<FontAwesomeIcon icon="sort" aria-label="not sorted" /></span>;
    }
    return '';
  };

  return (
    <div className="test0">
      <div className="test">hello</div>
      <div className={clsx({ 'simpleTable__container': !fullscreen, 'simpleTable__container--fullscreen': fullscreen })}>
        <div className="simpleTable__button--container">
          <Button type="fullScreen" state={fullscreen} setState={setFullScreen} />
        </div>
        <table {...getTableProps()} className={clsx('simpleTable', className)}>
          <thead>{
            headerGroups.map((headerGroup, hdrIdx) => {
              const isGroup = headerGroups.length > 1 && hdrIdx !== headerGroups.length - 1;
              return (
                <tr {...headerGroup.getHeaderGroupProps()} className={clsx({ simpleTable__group: isGroup })}>
                  {headerGroup.headers.map((column, idx) => {
                    const addBorder = idx > 0 && isGroup;
                    const headerProps = column.sortable ? column.getSortByToggleProps() : {};
                    headerProps.className = clsx(column.className, {
                      'simpleTable__group--border': addBorder,
                    });
                    headerProps.style = column.style;
                    return (
                      <th {...column.getHeaderProps(headerProps)}>
                        {column.render('Header')}
                        {renderSortIcon(column)}
                      </th>
                    );
                  })}
                </tr>
              );
            })
          }
          </thead>
          <tbody {...getTableBodyProps()}>{
            rows.map((row) => {
              prepareRow(row);
              return (
                // eslint-disable-next-line react/prop-types
                <tr {...row.getRowProps()}>
                  {
                    // eslint-disable-next-line react/prop-types
                    row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps([
                          {
                            className: cell.column.className,
                            style: cell.column.style,
                          },
                        ])}
                      >
                        {cell.render('Cell')}
                      </td>
                    ))
                  }
                </tr>
              );
            })
          }
          </tbody>
        </table>
      </div>
    </div>
  );
}

SimpleTable.propTypes = propTypes;
