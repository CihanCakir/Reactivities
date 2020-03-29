import React from 'react'
import { Segment, Header, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const NotFound = () => {

    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                Oops - Her tarafta aradık ancak istediğiniz ürünü bulamadık.
           </Header>
            <Segment.Inline>
                <Button as={Link} to='/activities' primary>
                    Return to activities page
               </Button>
            </Segment.Inline>
        </Segment>
    )
}


export default NotFound
