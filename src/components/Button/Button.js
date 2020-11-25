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
    RESET_FILTER,
    FILTER,
    SHOW_FILTER,
    DEFAULT_ARIA_LABEL,
    ACTIVE_ARIA_LABEL
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
            [DEFAULT_ICON]: "expand-arrows-alt",
            [DEFAULT_ARIA_LABEL]: "expand fullscreen",
            [DEFAULT_CLASSNAME]: 'button__fullscreen--expand',
            [DEFAULT_TEXT]: "Expand Fullscreen",
            [DEFAULT_TITLE]: 'Press to Fullscreen',
            [ACTIVE_ICON]: "times-circle",
            [DEFAULT_ARIA_LABEL]: "exit fullscreen",
            [ACTIVE_CLASSNAME]: 'button__fullscreen--exit',
            [ACTIVE_TEXT]: "Exit Fullscreen",
            [ACTIVE_TITLE]: 'Presss to Exit Fullscreen'
        },

        [FILTER]: {
            [DEFAULT_ARIA_LABEL]: "expand fullscreen",
            [DEFAULT_CLASSNAME]: 'button__filter--show',
            [DEFAULT_ICON]: "filter",
            [DEFAULT_TEXT]: "Show Filter",
            [DEFAULT_TITLE]: 'Press to Show Filter',
            [ACTIVE_ARIA_LABEL]: "hide filter",
            [ACTIVE_ICON]: "filter",
            [ACTIVE_CLASSNAME]: 'button__filter--hide',
            [ACTIVE_TEXT]: "Hide Filter",
            [ACTIVE_TITLE]: 'Presss to Hide Filter'
        },
    }

    function renderIcon(key, state) {
        const ICON = state === false
            ? ICON_TABLE[key][DEFAULT_ICON]
            : ICON_TABLE[key][ACTIVE_ICON]

        const AIRA = state === false
            ? ICON_TABLE[key][DEFAULT_ARIA_LABEL]
            : ICON_TABLE[key][ACTIVE_ARIA_LABEL]

        return <FontAwesomeIcon icon={ICON} aria-label={AIRA} />
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
