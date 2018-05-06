import React, { Component } from 'react';
import {Container, Form, Header, Segment} from "semantic-ui-react";

import * as data from '../../data/social'

export default class CreateUser extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            userName: ''
        }
    }

    create() {

        let {userName} = this.state;
        userName = userName.toString();
        data.createMember(userName).then(response => {
            alert ("Account Created!")
        })
            .catch(error => {
                console.log(error);
                alert("Account already exists");
            }
);
    }

    handleChange(event, target) {

        this.setState({ userName: target.value });
    }

    render() {

        let {userName, loading} = this.state;
        return(
            <Container>
                <Header attached='top'>Create Account</Header>
                <Segment>
                    <Form>
                        <Form.Input label='User Name'
                                    name='userName'
                                    onChange={this.handleChange.bind(this)}
                                    value={userName || ''}/>
                        <Form.Button loading={loading}
                                     disabled={loading}
                                     primary
                                     onClick={this.create.bind(this)}>
                            Create
                        </Form.Button>
                    </Form>
                </Segment>
            </Container>
        )

    }

}