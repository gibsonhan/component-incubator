import React from 'react'

import Button from 'components/Button/Button';

export default {
    title: 'Components/Button/Button',
    component: Button,
    parameters: {
        actions: {
            handles: ['mouseover', 'click']
        }
    }
}

const Template = (args) => (<Button {...args} />)

export const FullScreen = Template.bind({})

FullScreen.args = { type: 'FullScreen', };