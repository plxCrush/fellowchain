import React from 'react'
import {Container, Form, Grid, Header, Image, Segment, Tab, Icon, Label} from "semantic-ui-react";

import * as data from '../../data/social'
import FollowingList from "../lists/followingList";
import CollectionList from "../lists/collectionList";
import FollowersList from "../lists/followersList";

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            user: {},
            id: ''
        }
    }

    componentDidMount() {

        this.getUserInfo();
    }

    getUserInfo() {

        data.getCurrentUserId()
            .then( id => {
                    this.setState({id});
                    data.getUser(id).then( user => {
                        user.id = id;
                        this.setState({user});
                        this.getWithdrawAmount();
                    })
                }
            );
    }

    getWithdrawAmount() {

        let {user} = this.state;
        data.getWithdrawAmount().then(amount => {
            amount = amount / 1000000000000000000;
            user.withdrawAmount = amount;
            this.setState({  user });
        })
            .catch(error => console.log(error));
    }

    withDraw() {

        this.setState({ withdrawProgress: true });
        data.withDraw().then( (success) => {

            alert("Withdraw Success")
        }

        );
    }

    changeCollectionStatus(id) {

        this.setState({ statusLoading: true });
        data.changeCollectionStatus(id).then(success => {
            this.getUserInfo();
            this.setState({ statusLoading: false });
        })
            .catch(error => {
                console.log(error);
                this.setState({ statusLoading: false });
                this.getUserInfo();
            })
    }

    render() {

        let {user, statusLoading, withdrawProgress} = this.state;

        const panes = [{
            menuItem: 'Following', render: () =>
                <Tab.Pane>
                    <FollowingList userAddress={user.userAddress}/>
                </Tab.Pane>
        }, {
            menuItem: 'Followers', render: () =>
                <Tab.Pane>
                    <FollowersList userAddress={user.userAddress}/>
                </Tab.Pane>
        },
            {
            menuItem: 'Collection', render: () =>
                <Tab.Pane>
                    <CollectionList userAddress={user.userAddress}/>
                </Tab.Pane>
            }
        ];

        return (
            <Container>
                <Header attached='top'>Profile</Header>
                <Segment>
                    <Grid columns={2}>
                        <Grid.Column width="6">
                            <Image src={require('../../assets/images/profilepic.jpg')} size="medium"/>
                        </Grid.Column>
                        <Grid.Column width="10">
                            <Form>
                                <Form.Input readOnly
                                            transparent
                                            label='Address'
                                            name='userAddress'
                                            value={user.userAddress || ''}/>
                                <Form.Input readOnly
                                            transparent
                                            label='Username'
                                            name='userName'
                                            value={user.userName || ''}/>
                                <Grid columns="2" centered>
                                    <Grid.Column>
                                        {
                                            user.onSale ? <Label size="large" color="green"> ON SALE </Label>
                                                : <Label size="large" color="red" > Not On Sale</Label>
                                        }
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Form.Button loading={statusLoading}
                                                     disabled={statusLoading}
                                                     primary
                                                     onClick={this.changeCollectionStatus.bind(this, user.id)}>
                                                     Change Sale Status
                                        </Form.Button>
                                    </Grid.Column>
                                </Grid>

                                <Form.Input readOnly
                                            transparent
                                            label='Amount to Withdraw'
                                            name='withdrawAmount'
                                            value={user.withdrawAmount || 0}/>
                                <Form.Button loading={withdrawProgress}
                                             disabled={withdrawProgress}
                                             primary
                                             onClick={this.withDraw.bind(this)}>
                                    Withdraw
                                </Form.Button>

                            </Form>
                        </Grid.Column>
                    </Grid>
                </Segment>

                <Segment attached>
                    <Tab panes={panes}/>
                </Segment>
            </Container>
        )
    }
}