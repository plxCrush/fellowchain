import React from 'react'
import {Container, Form, Grid, Header, Image, Segment, Tab, Label, Divider} from "semantic-ui-react";

import * as data from '../../data/social'
import FollowingList from "../lists/followingList";
import CollectionList from "../lists/collectionList";
import FollowersList from "../lists/followersList";

export default class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            user: {}
        }
    }

    getUserValue() {

        let {user} = this.state;
        let value = '';
        this.setState({ loading: true });
        data.getFollowersByOwner(user.userAddress)
            .then( idList => {
                value = idList.length;
                user.value = (value * 0.1);
                this.setState({ user, loading: false })
                })
            .catch(error => this.setState({ loading: false }));
    }

    componentWillMount() {

        this.getUserInfo();
    }

    getUserInfo() {

        let {id} = this.props;

        if (id === undefined ) return null;

        data.getUser(id).then( user => {
            this.setState({user});
            this.getUserValue();
            user.id = id;

        })
    }

    followUser(user) {

        this.setState({ followProggress: true});
        data.follow(user.userAddress)
            .then(
            this.setState({ followProggress: false }) )
        .catch( this.setState({ followProggress: false }) )
    }

    collectUser(user) {

        this.setState({ collectProggress: true});
        data.collect(user.userAddress, user.value)
            .then(
                this.setState({ collectProggress: false }) )
            .catch( this.setState({ collectProggress: false }) )
    }

    render() {

        let {user, collectProggress, followProggress} = this.state;

        const panes = [{
            menuItem: 'Following', render: () =>
                <Tab.Pane>
                    <FollowingList filter="following" userAddress={user.userAddress}/>
                </Tab.Pane>
        }, {
            menuItem: 'Followers', render: () =>
                <Tab.Pane>
                    <FollowersList filter="followers" userAddress={user.userAddress}/>
                </Tab.Pane>
        },
            {
                menuItem: 'Collection', render: () =>
                    <Tab.Pane>
                        <CollectionList filter="collection" userAddress={user.userAddress}/>
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
                                <Form.Input readOnly
                                            transparent
                                            label='Value'
                                            name='value'
                                            value={user.value || 0}/>
                                        {
                                            user.onSale ? <Label size="large" color="green"> ON SALE </Label>
                                                : <Label size="large" color="red" > Not On Sale</Label>
                                        }
                                        <Divider hidden/>
                                <Grid columns="2" centered>
                                    <Grid.Column>
                                        <Form.Button loading={collectProggress}
                                                     disabled={!user.onSale || collectProggress}
                                                     primary
                                                     onClick={this.collectUser.bind(this, user)}>
                                            Buy
                                        </Form.Button>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Form.Button loading={followProggress}
                                                     disabled={followProggress}
                                                     primary
                                                     onClick={this.followUser.bind(this, user)}>
                                            Follow
                                        </Form.Button>
                                    </Grid.Column>
                                </Grid>
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