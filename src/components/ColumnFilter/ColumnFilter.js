import { filter } from 'lodash'
import './ColumnFilter.scss'

export default function ColumnFilter({
    column: { filterValue, preFilteredRows, setFilter }
}) {
    return <div className='columnFilter__container'>
        <input
            aria-label='input filter'
            name={name}
            value={filterValue || ''}
            type="text"
            onChange={e => { setFilter(e.target.value || undefined) }} //set undefined to remove the filter entirely
        />
    </div>
}
