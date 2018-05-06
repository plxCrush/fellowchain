import React from 'react'
import { withRouter } from 'react-router-dom'
import {Container, Menu} from 'semantic-ui-react'

class _NavMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    handleItemClick(event, target) {

        event.preventDefault();
        event.stopPropagation();
        this.props.history.push(target.href);
    }

    goHome() {

        this.props.history.push('/profile');
    }

    render() {

        let userMenu;

        userMenu = (
            <Menu.Menu position='left'>
                <Menu.Item href='/my/profile' onClick={this.handleItemClick.bind(this)}>Profile</Menu.Item>
                <Menu.Item href='/users' onClick={this.handleItemClick.bind(this)}>Users</Menu.Item>
                <Menu.Item href='/create' onClick={this.handleItemClick.bind(this)}>Create Acoount</Menu.Item>
            </Menu.Menu>
        );

        return (
            <Menu fixed='top' borderless>
                <Container>
                    {userMenu}
                </Container>
            </Menu>
        )
    }
}

export const NavMenu = withRouter(_NavMenu);
