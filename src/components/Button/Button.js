import PropTypes from 'prop-types';
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

import './Button.scss'

const propTypes = {
    type: PropTypes.string,
    onClick: PropTypes.function,
}

const renderFullScreenIncon = (state) => {
    return state === false
        ? <FontAwesomeIcon icon="expand-arrows-alt" aria-label="expand fullscreen" />
        : <FontAwesomeIcon icon="times-circle" aria-label="exit fullscreen" />
}
export default function Button({ type, onClick }) {
    const [fullScreen, setFullScreen] = useState(false)

    return <div className="button" onClick={() => setFullScreen(prop => !prop)}>
        <div className={clsx({ 'button__expandFullScreen': !fullScreen, 'button__exitFullScreen': fullScreen, })}>
            <i className="button__icon">{renderFullScreenIncon(fullScreen)}</i>
        </div>
    </div>
}

Button.propTypes = propTypes