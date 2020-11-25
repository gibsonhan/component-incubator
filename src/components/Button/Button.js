import PropTypes from 'prop-types';
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import {
    ACTIVE_ARIA_LABEL,
    ACTIVE_CLASSNAME,
    ACTIVE_ICON,
    ACTIVE_TEXT,
    ACTIVE_TITLE,
    DEFAULT_ARIA_LABEL,
    DEFAULT_CLASSNAME,
    DEFAULT_ICON,
    DEFAULT_TEXT,
    DEFAULT_TITLE,
    FILTER,
    FULLSCREEN,
    RESET_FILTER
} from '../../global/reserved';
import './Button.scss'

const propTypes = {
    state: PropTypes.bool,
    type: PropTypes.string,
    onClick: PropTypes.func,
}

export default function Button({ type, state, onClick }) {
    const ICON_TABLE = {
        [FULLSCREEN]: {
            [DEFAULT_ARIA_LABEL]: "expand fullscreen",
            [DEFAULT_CLASSNAME]: 'button__fullscreen--expand',
            [DEFAULT_ICON]: "expand-arrows-alt",
            [DEFAULT_TEXT]: "Expand Fullscreen",
            [DEFAULT_TITLE]: 'Press to Fullscreen',
            [ACTIVE_ARIA_LABEL]: "exit fullscreen",
            [ACTIVE_CLASSNAME]: 'button__fullscreen--exit',
            [ACTIVE_ICON]: "times-circle",
            [ACTIVE_TEXT]: "Exit Fullscreen",
            [ACTIVE_TITLE]: 'Presss to Exit Fullscreen'
        },
        [FILTER]: {
            [DEFAULT_ARIA_LABEL]: "show filter",
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
        [RESET_FILTER]: {
            [DEFAULT_ARIA_LABEL]: "reset filters",
            [DEFAULT_CLASSNAME]: 'button__filter--reset',
            [DEFAULT_ICON]: "redo",
            [DEFAULT_TEXT]: "Reset Filters",
            [DEFAULT_TITLE]: 'Press to Reset Filters',
            [ACTIVE_ARIA_LABEL]: "",
            [ACTIVE_ICON]: "",
            [ACTIVE_CLASSNAME]: "",
            [ACTIVE_TEXT]: "",
            [ACTIVE_TITLE]: ""
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
