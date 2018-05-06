import React, { Component } from 'react';
import {Container, Header, Segment} from "semantic-ui-react";
import AllList from "../../components/lists/allList";

export default class Users extends Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {

        return(
            <Container>
                <Header attached='top'>Users</Header>
                <Segment>
                    <AllList filter="all"/>
                </Segment>
            </Container>
        )

    }

}