import { useMemo } from "react"
import { useRowSelect } from "react-table";
/**
 *  For Stand Select Filter row value are string
 *  "true" or "false"
 */

export default function StandardSelectFilter({
    column: { filterValue, id, preFilteredRows, setFilter }
}) {
    const options = useMemo(() => {
        const set = new Set();
        preFilteredRows?.forEach(row => {
            if (row.values[id] === undefined) return
            set.add(row.values[id])
        })
        return [...set.values()]

    }, [id, preFilteredRows])

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