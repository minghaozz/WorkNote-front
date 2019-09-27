import React, { Component } from 'react';
import { is, fromJS } from 'immutable';
import PropTypes from 'prop-types';
import './myHeader.less';
export default class PublicHeader extends Component {
    static propTypes = {
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps))|| !is(fromJS(this.state),fromJS(nextState))
    }
    render() {
        return (
            <header className="header-container">
                <span className="header-title">test</span>
            </header>
        )
    }
}