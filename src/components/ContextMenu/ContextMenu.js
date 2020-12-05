import { useEffect } from "react"

export default function ContextMenu({ show, coord }) {
    if (!show) return <></>
    ///WIP review the BEM nameing convention
    //I think I need to add high light feature before freezing
    //This feature plays out to printing selected rows
    useEffect(() => {
        console.log(coord.x, coord.y)
    }, [coord])
    return (
        <nav className="contextMenu__container">
            <ul className="contextMenu__menu--list">
                <li className="contextMenu__item--freeze">
                    <div className="contextMenu__freeze--icon">
                        Hi
                    </div>
                    <div className="contextMenu__freez--text">
                        Freeze
                    </div>
                </li>
            </ul>
        </nav>
    )
}