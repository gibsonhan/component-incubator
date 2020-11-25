import './ColumnFilter.scss'

export default function ColumnFilter({ name }) {
    const [state, setState] = useState('')
    return <div className={`input__${type}--container`}>
        <input
            aria-label={`input__${type}`}
            type="text" onChange={e => setState(e.target.value)}
        />
    </div>
}
