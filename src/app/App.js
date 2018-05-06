import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Web3 from 'web3'
import 'semantic-ui-css/semantic.min.css'

import * as data from './data/social'

import {NavMenu} from "./menu/navMenu";
import Profile from "./screens/private/myProfile";
import OtherProfile from "./screens/private/userProfile";
import Users from "./screens/private/users";
import Create from "./screens/public/create";

export class App extends Component {

    constructor(props) {
        super(props);
        this.state={
            user: {}
        };

        // setInterval( () => {
        //
        //     let user = this.state;
        //     if (window.web3.eth.accounts[0] !== user) {
        //
        //         alert("USER CHANGES");
        //     }
        //
        // }, 100);

    }

    componentDidMount() {

        if(typeof window.web3 !== 'undefined') {

            const currentProvider = window.web3.currentProvider;
            const web3js = new Web3(currentProvider);

            // console.log("WEB3js", web3js.currentProvider.publicConfigStore._state.selectedAddress);

            // data.createMember("emre_gonen1").then(response => console.log(response));
            // data.createMember("emre_gonen2").then(response => console.log(response));

            // data.getUser(3).then(response => {
            //     this.setState({ user: response});
            //     console.log(response);
            // })

            // data.follow("0x9aBBD98188bB960beF18682e9B94071A3a9cE667");
            // data.collectUser("0xe709038b6dea3d4fa42e5419b5ab4a27b040794e");
        }
    }

    render() {

        return (
            <Router>
                <div>
                    <NavMenu/>
                    <div>
                        <Switch>
                            {/*Public*/}
                            <Route exact path={"/"} component={Profile} />
                            <Route exact path={"/my/profile"} component={Profile} />
                            <Route exact path={"/user/:id"} component={OtherProfile} />
                            <Route exact path={"/users"} component={Users} />
                            <Route exact path={"/create"} component={Create} />
                            {/*Not Found*/}
                        </Switch>
                    </div>
                    {/*<ToastContainer/>*/}
                </div>
            </Router>
        );
    }
}