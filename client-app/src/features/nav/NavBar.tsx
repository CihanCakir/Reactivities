import React, { useContext } from 'react'
import { Menu, Container, Button, Image, Dropdown } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import { NavLink, Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';


const NavBar: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { user, logout } = rootStore.userStore;
    return (
        <div>
            <Menu fixed='top' inverted>
                <Container>
                    <Menu.Item header as={NavLink} exact to='/'>
                        <img src="/assets/logo.png" alt="Reactivities" />
                        Reactivities
                        </Menu.Item>
                    <Menu.Item name='Activities' as={NavLink} to='/activities' />
                    <Menu.Item>
                        <Button
                            as={NavLink}
                            to='/createActivity'
                            //onClick={activityStore.openCreateForm}
                            positive
                            content='Create Activites' />
                    </Menu.Item>
                    {user &&
                        <Menu.Item position='right'>
                            <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
                            <Dropdown pointing='top left' text={`${user.displayName}`}>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to={`/profile/${user.username}`} text='My Profile' icon='user' />
                                    <Dropdown.Item onClick={logout} text='LogOut' icon='power' />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>

                    }


                </Container>

            </Menu>
        </div>
    )
}

export default observer(NavBar);
