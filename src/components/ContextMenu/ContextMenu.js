import { debounce } from "lodash"
import { useEffect, useRef, useState } from "react"

import './ContextMenu.scss'
export default function ContextMenu({ pos, show, setShow, setTableSetting, tableSetting }) {
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
        if (!pos.rowClassName || !ref.current || !ref.current.contains?.(e.target)) return
        let parentNode = document.getElementsByClassName(pos.rowClassName)[0]
        console.log(parentNode)
        //if <parent Tr cointains mark", prevent function execution
        if (parentNode.className === parentNode.className + '__sticky') return
        parentNode.className = parentNode.className + "-sticky"
        parentNode.style.backgroundColor = 'beige'
        let childNodes = parentNode.childNodes


        for (let child of childNodes) {
            child.className = "row__cell-sticky"
            child.style.position = "sticky"
            child.style.zIndex = '2'
            //As we add more freeze row. Top needs to outset those already froozen
            child.style.top = tableSetting.rowFreezeCount * 38.61 + 'px'
        }

        //After sticky, cache the paretNode name, and update the sticky count for future offset
        setTableSetting(props => ({
            ...props,
            rowFreeze: [...props.rowFreeze, parentNode.className],
            rowFreezeCount: props.rowFreezeCount + 1
        }))

        console.log(parentNode)
    }


    useEffect(() => {
        //WIP: Onclick it renders 3 time
        //console.log(pos)
    }, [pos, show])

    useEffect(() => {
        window.addEventListener('mousedown', handleOutsideClick, false)
        return () => window.removeEventListener('mousedown', handleOutsideClick, false)
    }, [handleOutsideClick])

    useEffect(() => {
        window.addEventListener('mouseup', handleMenuClick, false)
        return () => window.removeEventListener('mouseup', handleMenuClick, false)
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