import PropTypes from 'prop-types';
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { FULLSCREEN } from '../../global/reserved';
import './Button.scss'

const propTypes = {
    state: PropTypes.bool,
    type: PropTypes.string,
    onClick: PropTypes.function,
}

const renderFullScreenIcon = (state) => {
    const selectIcon = state === false
        ? <FontAwesomeIcon icon="expand-arrows-alt" aria-label="expand fullscreen" />
        : <FontAwesomeIcon icon="times-circle" aria-label="exit fullscreen" />
    return <i className="button__icon">{selectIcon}</i>
}

function renderTitle(state) {
    return state === false ? 'Press to Full Screen' : 'Press to Exit Full Screen'
}

export default function Button({ type, state, onClick }) {
    const ICON = {
        [FULLSCREEN]: renderFullScreenIcon(state)
    }
    const TITLE = {
        [FULLSCREEN]: renderTitle(state)
    }
    const BUTTONCLASSNAME = {
        [FULLSCREEN]: clsx({ 'button__expandFullScreen': !state, 'button__exitFullScreen': state })
    }

    return (
        <div className="button__container" onClick={onClick}>
            <button className={BUTTONCLASSNAME[type]} title={TITLE[type]} type="button">
                {ICON[type]}
            </button>
        </div >
    )
}

Button.propTypes = propTypes
