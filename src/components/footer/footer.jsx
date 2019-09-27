import React, { Component } from 'react';
import {Layout} from "antd";

const {Footer } = Layout;
export default class Foot extends Component {
    render() {
        return (
            <Footer style={{ textAlign: 'center' }}>
                Record Note ©2019 Created by ZMH
            </Footer>
        );
    }
}
