import React, {Component} from 'react';
import {connect} from 'react-redux';
import {is, fromJS} from 'immutable';
import Sidebar from "../../components/sidebar/sidebar"
import './main.less';
import {Layout, Avatar} from "antd";
import Foot from "../../components/footer/footer";
import {Link} from 'react-router-dom';
const {Header, Content} = Layout;

class Main extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    render() {

        return (
            <main className="home-container">
                <Layout>
                    <Sidebar/>
                    <Layout>
                        <Header style={{background: '#fff', padding: 0}}>
                            <div  style={{position: "fixed",right: "30px",zIndex:100}}>
                                <Avatar className="headerTopSpan" size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                <span className="headerTopSpan">凤凰传奇</span>
                                <Link to="/"><span className="headerTopSpan">退出</span></Link>
                            </div>
                        </Header>
                        <Content style={{margin: '71px 16px 0'}}>
                            <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                                {this.props.data}
                            </div>
                        </Content>
                        <Foot></Foot>
                    </Layout>
                </Layout>
            </main>
        )
    }
}

export default connect(state => ({}), {withRef: true})(Main) ;