import PropTypes from 'prop-types';
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import {
    ACTIVE_CLASSNAME,
    ACTIVE_ICON,
    ACTIVE_TEXT,
    ACTIVE_TITLE,
    DEFAULT_CLASSNAME,
    DEFAULT_ICON,
    DEFAULT_TEXT,
    DEFAULT_TITLE,
    CLOSE_FUllSCREEN,
    EXPAND_FULLSCREEN,
    FULLSCREEN,
    HIDE_FILTER,
    RESET_FILTER
} from '../../global/reserved';
import './Button.scss'

const propTypes = {
    state: PropTypes.bool,
    type: PropTypes.string,
    onClick: PropTypes.func,
}

//Not sure if I should use array or hasttable again to present 



export default function Button({ type, state, onClick }) {
    const ICON_TABLE = {
        [FULLSCREEN]: {
            [DEFAULT_ICON]: <FontAwesomeIcon icon="expand-arrows-alt" aria-label="expand fullscreen" />,
            [DEFAULT_CLASSNAME]: 'button__fullscreen--expand',
            [DEFAULT_TEXT]: EXPAND_FULLSCREEN,
            [DEFAULT_TITLE]: 'Press to Fullscreen',
            [ACTIVE_ICON]: <FontAwesomeIcon icon="times-circle" aria-label="exit fullscreen" />,
            [ACTIVE_CLASSNAME]: 'button__fullscreen--exit',
            [ACTIVE_TEXT]: CLOSE_FUllSCREEN,
            [ACTIVE_TITLE]: 'Presss to Exit Fullscreen'
        },
    }

    function renderIcon(key, state) {
        return state === false
            ? ICON_TABLE[key][DEFAULT_ICON]
            : ICON_TABLE[key][ACTIVE_ICON]
    }

    function renderTitle(key, state) {
        return state === false
            ? ICON_TABLE[key][DEFAULT_TITLE]
            : ICON_TABLE[key][ACTIVE_TITLE]
    }

    function renderClassName(key, state) {
        return state == false
            ? ICON_TABLE[key][DEFAULT_CLASSNAME]
            : ICON_TABLE[key][ACTIVE_CLASSNAME]
    }

    function renderButtonText(key, state) {
        return state === false
            ? ICON_TABLE[key][DEFAULT_TEXT]
            : ICON_TABLE[key][ACTIVE_TEXT]
    }

    return (
        <span className={renderClassName(type, state)}>
            <div className="button__container" title={renderTitle(type, state)} onClick={onClick}>
                <i className="button__icon">{renderIcon(type, state)}</i>
                <div className="button__text">{renderButtonText(type, state)}</div>
            </div >
        </span >
    )
}

Button.propTypes = propTypes
