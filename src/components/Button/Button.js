import PropTypes from 'prop-types';
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

import './Button.scss'

const propTypes = {
    type: PropTypes.string,
    state: PropTypes.bool,
    onClick: PropTypes.function,
}

const renderFullScreenIncon = (state) => {
    return state === false
        ? <FontAwesomeIcon icon="expand-arrows-alt" aria-label="expand fullscreen" />
        : <FontAwesomeIcon icon="times-circle" aria-label="exit fullscreen" />
}
export default function Button({ type, state, setState }) {
    return <div className="button" onClick={() => setState(prop => !prop)}>
        <div className={clsx({ 'button__expandFullScreen': !state, 'button__exitFullScreen': state, })}>
            <i className="button__icon">{renderFullScreenIncon(state)}</i>
        </div>
    </div>
}

Button.propTypes = propTypes