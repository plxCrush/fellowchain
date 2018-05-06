import React from 'react'
import {Icon, Table} from 'semantic-ui-react'

import * as data from '../../data/social'
import {withRouter} from "react-router-dom";

class FollowersList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: false,
            noRecord: false,
            filter: null
        }
    }

    componentDidMount() {

        this.loadData();
    }

    loadData() {

            let {userAddress} = this.props;
            let users = [];
            this.setState({ loading: true });
            data.getFollowersByOwner(userAddress)
                .then( idList => {
                        if (idList.length < 1)
                            this.setState({ noRecord: true, loading: false });
                        idList.forEach((id) => {
                            data.getUser(id)
                                .then(user => {
                                    user.id = id;
                                    users.push(user);
                                    this.setState({ users, loading: false });
                                })
                        });
                    }
                )
                .catch(error => this.setState({ loading: false }));
    }

    select(user) {

        let {history} = this.props;
        history.push(`/user/${user.id}`);
    }

    render() {

        let {users, loading, noRecord} = this.state;

        if (loading) return (<div>loading...</div>);

        if (noRecord) return (<div>No Users...</div>);

        return (
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>Username</Table.HeaderCell>
                        <Table.HeaderCell singleLine>On Sale</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        users.map(user => (
                            <Table.Row key={user.userAddress}
                                       onClick={this.select.bind(this, user)}>
                                <Table.Cell>{user.userAddress}</Table.Cell>
                                <Table.Cell>{user.userName}</Table.Cell>
                                <Table.Cell collapsing>
                                    {
                                        user.onSale
                                            ? <Icon name='checkmark' color='green' />
                                            : <Icon name='remove' color='red' />
                                    }
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        )
    }
}

export default withRouter(FollowersList);