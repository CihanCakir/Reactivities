import React, { Fragment } from 'react'
import { Menu, Header } from 'semantic-ui-react'
import { Calendar } from 'react-widgets'

const ActivityFilters = () => {
    return (
        <Fragment>
            <Menu vertical size={'large'} style={{ width: '100%', marginTop: 30 }}>
                <Header icon={'filter'} attached color={'teal'} content={'Filters'} />
                <Menu.Item color={'blue'} name={'all'} content={'All Activities'} />
                <Menu.Item color={'blue'} name={'username'} content={'Gidiyorum'} />
                <Menu.Item color={'blue'} name={'host'} content={'Bana ait '} />
            </Menu>
            <Header icon={'calendar'} attached color={'teal'} content={'Select Date'} />
            <Calendar />
        </Fragment>
    )
}

export default ActivityFilters
