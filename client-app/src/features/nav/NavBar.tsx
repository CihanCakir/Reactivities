import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'



interface IProps {
    openCreateForm: () => void;
}

export const NavBar: React.FC<IProps> = ({ openCreateForm }) => {
    return (
        <div>
            <Menu fixed='top' inverted>
                <Container>
                    <Menu.Item header>
                        <img src="/assets/logo.png" alt="Reactivities" />
                        Reactivities
                        </Menu.Item>
                    <Menu.Item name='Activities' />
                    <Menu.Item>
                        <Button onClick={openCreateForm} positive content='Create Activites' />
                    </Menu.Item>
                </Container>

            </Menu>
        </div>
    )
}
