import React, {Component} from 'react';
import {connect} from 'react-redux';
import {is, fromJS} from 'immutable';
import axios from 'axios';
import './home.less';
import Main from "../../components/main/main";
import Tab from "../../components/tabs/tab";
import {tabarData} from "../../components/tabs/tabarData";
import {mainPath} from "../globalData";
import {Link} from 'react-router-dom';
import {Button, Table, Tag, Modal} from "antd";




class Home extends Component {
    state;

    constructor(props) {
        super(props);
        // this.getData2 = this.getData2.bind(this);
        this.onRef = this.onRef.bind(this);
        this.state = {
            tabs: '',
            tabledata: [],
            titles: tabarData.slice(0, 4),
            columns: [
                {
                    title: '任务标题',
                    dataIndex: 'title',
                    key: 'title',
                    width: 200,
                    render: text => <a href="">{text}</a>,
                },
                {
                    title: '任务简介',
                    dataIndex: 'description',
                    key: 'description',
                    width: 400
                },
                {
                    title: '创建日期',
                    dataIndex: 'createtime',
                    key: 'createtime',
                    width: 150
                },
                {
                    title: '预期日期',
                    dataIndex: 'completetime',
                    key: 'completetime',
                    width: 150
                },
                {
                    title: '优先级',
                    key: 'priority',
                    dataIndex: 'priority',
                    width: 50,
                    render: priority => {
                        let tag = '';
                        let color = 'blue';
                        if (priority == 1) {
                            tag = '重要';
                            color = 'volcano';
                        } else if (priority == 2) {
                            color = 'orange';
                            tag = '较重要';
                        } else {
                            tag = '一般';
                        }
                        return (
                            <span>
                <Tag color={color} key={tag}>
                     {tag}
                </Tag>
                 </span>
                        );

                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => (
                        <span>
        <Link to={{
            pathname: mainPath.detail_path + '/' + record.id,
            state: {
                title: record.title,
                priority: record.priority,
                createtime: record.createtime,
                completetime: record.completetime,
                description: record.description,
                status: record.status
            }
        }}>
        <Button type="primary" icon="edit" id='desc' size="small">
          查看详情
        </Button></Link>
        <Button onClick={() => {
            showConfirm(record.id)
        }} type="danger" icon="delete" size="small">
          删除
        </Button>
      </span>
                    ),
                }]
        };
        const _this = this;
        this.getData(_this);

        function showConfirm(id) {
            let modal = Modal.warning({
                title: '你确定要删除这个任务嘛?',
                okText: '确定',
                onOk() {
                    return new Promise((resolve, reject) => {
                        axios.get('http://localhost:8888/api/task_work/delete_work_task?id=' + id)
                            .then(function (response) {
                                _this.getData(_this)
                                modal.destroy();
                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                    }).catch(() => console.log('Oops errors!'));
                },
                onCancel() {
                },
            });
        }
    }

    componentWillCount() {
    }

    // getData2(_this,page) {
    //     axios.get('http://localhost:8888/api/task_work/search_work_task',{params:{aspect:1 ,pageNum:page}})
    //         .then(function (response) {
    //             _this.state.tabledata = response.data.data;
    //             console.log(response.data.data)
    //             _this.setState({
    //                 tabs: <Tab  onRef={_this.onRef} columns={_this.state.columns}  tabledata={_this.state.tabledata} titles={_this.state.titles}></Tab>
    //             });
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         })
    // }

    // 获取子组件
    onRef(page) {
        // this.getData2(this,page)
    }

    getData(_this) {

        axios.get('http://localhost:8888/api/task_work/search_work_task', {params: {aspect: 1, pageNum: 1}})
            .then(function (response) {
                _this.state.tabledata = response.data.data;
                _this.setState({
                    tabs: <Tab  onRef={_this.onRef} columns={_this.state.columns} tabledata={_this.state.tabledata}
                               titles={_this.state.titles}></Tab>
                });
                _this.props.history.push("/home");
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    render() {
        return (
            <Main data={this.state.tabs}></Main>
        )
    }
}

export default connect(state => ({}), {})(Home);