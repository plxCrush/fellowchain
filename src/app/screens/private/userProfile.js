import React, { Component } from 'react';
import {Container, Header, Segment} from "semantic-ui-react";
import UserProfile from "../../components/userProfile/userProfile";

export default class OtherProfile extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let {id} = this.props.match.params;
        console.log(this.props.match.params);
        console.log("ID", id);

        return(
            <Container>
                <Header attached='top'>Profile</Header>
                <Segment>
                    <UserProfile id={id}/>
                </Segment>
            </Container>

        )

    }
}