import {Tabs, Icon, Button, Table} from 'antd';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './tab.less'

const TabPane = Tabs.TabPane;




export default class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 1,
            tabdata: [],
            finishedata: [],
            unfinishedata: [],
            addButton: <Link to='/add_work'><Button type="primary" shape="circle" icon="plus"/></Link>
        }
        this.changebutton();
    }

    changebutton(){
        if(window.location.href.indexOf("life")!=-1){
            console.log(window.location.href.indexOf("life")!=-1);
            this.state.addButton = <Link to='/add_life'><Button type="primary" shape="circle" icon="plus"/></Link>
        }else{
            this.state.addButton = <Link to='/add_work'><Button type="primary" shape="circle" icon="plus"/></Link>;
        }
    }

    changeBootomLinear() {
        let node = document.getElementsByClassName('ant-tabs-ink-bar');
        if (this.state.i === 1) {
            node[0].style.backgroundColor = "#ff9a18";
            this.state.i = 2;
        } else {
            node[0].style.backgroundColor = "#1890ff";
            this.state.i = 1;
        }
    }

    componentDidMount () {
    }
    changePage = (page) => {
        this.props.onRef(page)
    }

    render() {

        return (
            <Tabs id={"linearColor"} onChange={() => {
                this.changeBootomLinear()
            }} defaultActiveKey="1" tabBarExtraContent={this.state.addButton}>
                {
                    this.props.titles.map(item =>
                        <TabPane tab={<span><Icon type={item.type}/>{item.titleTxt}</span>} key={item.key}>
                            {
                                this.props.tabledata.content.map(obj => {
                                    if (item.key == obj.status) {
                                        if(item.key==1){
                                            this.state.finishedata.push(obj);
                                        }else{
                                            this.state.unfinishedata.push(obj);
                                        }
                                    }
                                })
                            }
                            <Table columns={this.props.columns} dataSource={item.key==1?this.state.finishedata:this.state.unfinishedata} pagination={item.key==1?{total:this.state.finishedata.length,defaultPageSize: 6,onChange:this.changePage}:{total:this.state.unfinishedata.length,defaultPageSize: 6,onChange:this.changePage}}/>
                        </TabPane>
                    )
                }

            </Tabs>
        );
    }
}