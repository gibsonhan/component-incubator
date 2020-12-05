import { useEffect, useRef, useState } from "react"

import './ContextMenu.scss'
export default function ContextMenu({ pos, show, setShow }) {
    if (!show) return <></>
    const ref = useRef()
    const [type, setStype] = useState()
    ///WIP review the BEM nameing convention
    //I think I need to add high light feature before freezing
    //This feature plays out to printing selected rows

    function outsideClick(e) {
        console.log(e.target)
        if (!ref.current || ref.current.contains?.(e.target)) {
            return
        }
        setShow(() => false)
    }

    useEffect(() => {
        //WIP: Onclick it renders 3 time
        console.log(pos)
    }, [pos, show])

    useEffect(() => {
        window.addEventListener('mousedown', e => outsideClick(e), false)
        return () => window.removeEventListener('mousedown', e => outsideClick(e), false)
    }, [outsideClick])

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