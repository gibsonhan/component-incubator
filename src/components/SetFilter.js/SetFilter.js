import { set } from 'lodash'
import React, { useMemo } from 'react'
import { useRowSelect } from 'react-table'

export default function SetFilter({
    column: { filterValue, id, preFilteredRows, setFilter },
}) {

    const options = useMemo(() => {
        let set = new Set()
        preFilteredRows.forEach(row => {
            let rowData = row.values[id]
            if (rowData === undefined) return
            //if data row contains a set. unpack and store into set
            if (rowData.length > 1) {
                rowData.forEach(ele => {
                    set.add(ele)
                })
            }
            else {
                set.add(rowData[0])
            }
        })
        return [...set.values()]
    }, [filterValue, id])

    return (<select
        value={filterValue}
        onChange={e => {
            setFilter(e.target.value || undefined)
        }}
    >
        <option value="">All</option>
        {options.map((option, i) => (
            <option key={i} value={option}>
                {option}
            </option>
        ))}
    </select>)
}