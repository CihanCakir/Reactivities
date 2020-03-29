import React from 'react'
import { Container, Segment, Header, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                    Editörün Seçimleri
                </Header>
                <Header as='h2' inverted content='Editörden özel seçimlerle her daima' />
                <Button as={Link} to='/activities' size='huge' inverted>
                    Götür beni editöre
                </Button>
            </Container>
        </Segment>
    )
}

export default HomePage
