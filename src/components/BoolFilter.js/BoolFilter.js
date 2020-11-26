export default function BoolFilter({
    column: { filterValue, setFilter }
}) {
    const options = ['true', 'false']
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