import React, { Component } from 'react';
import {Container, Header, Segment} from "semantic-ui-react";
import Profile from "../../components/myProfile/myProfile";

export default class MyProfile extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return(
            <Container>
                <Header attached='top'>Profile</Header>
                <Segment>
                    <Profile/>
                </Segment>
            </Container>

        )

    }

}