import { debounce } from "lodash"
import { useEffect, useRef, useState } from "react"

import './ContextMenu.scss'
export default function ContextMenu({ pos, show, setShow }) {
    if (!show) return <></>
    const ref = useRef()
    const [type, setStype] = useState()
    ///WIP review the BEM nameing convention
    //I think I need to add high light feature before freezing
    //This feature plays out to printing selected rows

    function handleOutsideClick(e) {
        if (!ref.current || ref.current.contains?.(e.target)) {
            return
        }
        setShow(() => false)
    }

    //handling freeze column. what you need to do is step up to the th element and add a classname
    // as for row? covert the tr to thead then freeze with sticky

    function handleMenuClick(e) {
        console.log('menu click')
        //if (!ref.current && ref.current.contains(e.target)) return
    }


    useEffect(() => {
        //WIP: Onclick it renders 3 time
        console.log(pos)
    }, [pos, show])

    useEffect(() => {
        window.addEventListener('mousedown', handleOutsideClick, false)
        return () => window.removeEventListener('mousedown', e => handleOutsideClick(e), false)
    }, [handleOutsideClick])

    useEffect(() => {
        window.addEventListener('mouseup', e => handleMenuClick(e), false)
        return () => window.removeEventListener('mouseup', e => handleMenuClick(e), false)
    }, [handleMenuClick])

    const style = {
        top: pos.top,
        left: pos.left
    }

    const ITEMS = [
        {
            type: 'freeze row',
            icon: 'icon',
            handleOnClick: ''
        },
        {
            type: 'freeze col',
            icon: 'icon',
            handleOnClick: ''
        },
        {
            type: 'export',
            icon: 'icon',
            handleOnClick: ''
        }
    ]

    return (
        <div ref={ref} className="contextMenu__container" style={style}>
            <ul className="contextMenu__menu--list">
                {ITEMS.map((ele, indx) => <List key={indx} icon={ele.icon} type={ele.type} handleOnClick={ele.onClick} />)}
            </ul>
        </div>
    )
}

const List = ({ type, icon, handleOnClick }) => {
    return (
        <li className={`contextMenu__list--${type}`} onClick={() => console.log('hello')}>
            <div className={`contextMenu__${type}--icon`}>{icon}</div>
            <div className={`contextMenu__${type}--text`}>{type}</div>
        </li>
    )
}