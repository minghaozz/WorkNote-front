import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './sidebar.less';
import {Layout, Menu, Icon} from 'antd';

import {sidebarData, groupKey} from './sidebarData';

const {Sider} = Layout;
@withRouter
export default class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys: ['1'],
            collapsed: false,
            rootSubmenuKeys: groupKey
        }
    };

    setDefaultActiveItem = ({location}) => {
        const {pathname} = location;
        sidebarData.map(item => {
            // 为什么要用match是因为 url有可能带参数等,全等就不可以了
            // 若是match不到会返回null
            if (pathname.match(item.path)) {
                this.setState({
                    selectedKeys: [item.key]
                });
                // 设置title
                document.title = item.text;
            } else if ("/" === (pathname)) {
                document.title = sidebarData[0].text;
            }
            if(pathname.indexOf('life')!=-1){
                this.setState({
                    selectedKeys: ['2']
                });
            }
        });
    };


    componentDidMount = () => {
        // 设置菜单的默认值
        this.setDefaultActiveItem(this.props);

    };

    render() {
        const {selectedKeys} = this.state;
        return (
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="logo">
                    工作台
                </div>
                <Menu theme="dark" selectedKeys={selectedKeys} mode="inline">
                    {sidebarData.map(item => (
                            <Menu.Item key={item.key} onClick={() => {
                                // 设置高亮的item
                                this.setState({selectedKeys: [item.key]});
                            }}>
                                    <Icon type={item.type}/>
                                {item.text}
                                <Link to={item.path}>{item.text}</Link>
                            </Menu.Item>
                        )
                    )}
                </Menu>
            </Sider>
        );
    }
}
