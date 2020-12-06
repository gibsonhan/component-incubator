import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useExpanded, useFilters, useSortBy, useTable } from 'react-table';

import { FILTER, FULLSCREEN, RESET_FILTER } from '../../global/reserved';

import Button from '../Button/Button'
import ColumnFilter from '../ColumnFilter/ColumnFilter'

import './Simple.scss';
import ContextMenu from '../ContextMenu/ContextMenu';

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
  const [showFilter, setShowFilter] = useState(false)
  const [showContextMenu, setShowContextMenu] = useState(false)
  const [contextMenuPos, setContextMenuPos] = useState({ top: 0, left: 0 })

  useEffect(() => {
    window.addEventListener('contextmenu', e => handleContextMenu(e))
    return window.removeEventListener('contextmenu', (e) => handleContextMenu(e))
  }, [showContextMenu])

  function handleContextMenu(e) {
    e.preventDefault()
    if (!showContextMenu) {
      let posObj = {
        top: e.clientY,
        left: e.clientX,
      }
      //row container
      //column position
      console.log(e)
      let array = [...e.target.parentNode.childNodes].indexOf(e.target)
      console.log('hello', array.indexOf(e.target))
      setShowContextMenu(state => !state)
      setContextMenuPos(props => posObj)
    }
  }
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

  const defaultColumn = useMemo(
    () => ({
      Filter: ColumnFilter,
      expandable: false,
    }), []
  )

  const sortTypes = React.useMemo(
    () => ({
      NestedSet: NestedSetSortFn
    }), []
  )

  function NestedSetSortFn(rowA, rowB, columnId) {
    //this is dependd that the rowSet Data is sorted
    let a = rowA.original[columnId]?.join('').length || 0
    let b = rowB.original[columnId]?.join('').length || 0
    //react table handle if rowA > rowB return -1 vice versa
    return a > b ? - 1 : 1
  }
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups if your table have groupings
    rows, // rows for the table based on the data passed
    setAllFilters, // hook to pass filter to all filters
    prepareRow, // Prepare the row (this function need to called for each row before getting the row props)
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      sortTypes,
      ...tableProps
    },
    useFilters,
    useSortBy,
    useExpanded,
  );

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
    <>
      <div className={clsx({ 'simpleTable__container': !fullscreen, 'simpleTable__container--fullscreen': fullscreen })}>
        <ContextMenu
          show={showContextMenu}
          setShow={setShowContextMenu}
          pos={contextMenuPos}
        />
        <div className="simpleTable__button--container">
          <Button type={FULLSCREEN} state={fullscreen} onClick={() => setFullScreen(state => !state)} />
          <Button type={FILTER} state={showFilter} onClick={() => setShowFilter(state => !state)} />
          {showFilter && <Button type={RESET_FILTER} state={false} onClick={() => setAllFilters([])} />}
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
                        {showFilter && <div>{column.canFilter ? column.render('Filter') : <></>}</div>}
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
                <tr {...row.getRowProps({
                  className: 'row--' + row.id
                })}>
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
    </>
  );
}

SimpleTable.propTypes = propTypes;
