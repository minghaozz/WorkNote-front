import {
    Form,
    Input,
    Select,
    Button, DatePicker,
} from 'antd';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Main from "../../components/main/main";
import moment from "moment";
import {Link} from "react-router-dom";
import axios from "axios";

const {Option} = Select;
const dateFormat = 'YYYY-MM-DD';
const {TextArea} = Input;

class AddWork extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    handleSubmit = e => {
        e.preventDefault();
        let _this = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            let pathname = this.props.location.pathname;
            let index = pathname.indexOf("work");
            if(index!=-1){
                values.aspect = 1;
            }else {
                values.aspect = 2;
            }
            axios.post('http://localhost:8888/api/task_work/insert_work_task',values)
                .then(function (response) {
                    _this.props.history.push('/home')
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    };

    handleConfirmBlur = e => {
        const {value} = e.target;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };


    render() {
        const {
            getFieldDecorator
        } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 20,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 5,
                },
            },
        };

        const addWork = <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="标题" >
                {getFieldDecorator('title', {
                    rules: [
                        {
                            required: true,
                            message: '请输入你的标题!',
                        },
                    ],
                })(<Input style={{display: 'inline-block', width: 'calc(50% - 12px)'}}/>)}
            </Form.Item>
            <Form.Item
                label={
                    <span>
              优先级&nbsp;
            </span>
                }
            >
                {getFieldDecorator('priority', {
                    rules: [{required: true, message: '请选择优先级!', whitespace: true}],
                })(<Select defaultValue="1" style={{display: 'inline-block', width: 'calc(50% - 12px)'}}>
                    <Option value="1">重要</Option>
                    <Option value="2">较重要</Option>
                    <Option value="3">一般</Option>
                </Select>)}
            </Form.Item>
            <Form.Item label="创建日期">
                <Form.Item
                    style={{display: 'inline-block', width: 'calc(50% - 12px)'}}
                >
                    {getFieldDecorator('completetime',{rules: [{ required: true, message: '请选择时间!' }]})(
                    <DatePicker defaultPickerValue={moment(new Date(), dateFormat)} placeholder='创建日期'/>
                    )}
                </Form.Item>
            </Form.Item>
            <Form.Item label="预期日期">
                <Form.Item
                    style={{display: 'inline-block', width: 'calc(50% - 12px)'}}
                >
                    {getFieldDecorator('createtime',{rules: [{ required: true, message: '请选择时间!' }]})(
                        <DatePicker defaultPickerValue={moment(new Date(), dateFormat)} placeholder='预期日期'
                        />
                    )}
                </Form.Item>
            </Form.Item>
            <Form.Item label="任务简介" >
                {getFieldDecorator('description', {
                    rules: [{required: true, message: '请输入任务简介!', whitespace: true}],
                })(
                <TextArea rows={4} style={{display: 'inline-block', width: 'calc(50% - 12px)'}}/>
                )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout} style={{textAlign: "center"}}>
                <Button type="primary"  style={{position: "relative", left: '-110px'}} htmlType="submit" type="primary" shape="round"
                        size='large'>
                    确认
                </Button>
                <Link to='/home'>
                    <Button style={{position: "relative", left: '-90px'}} type="primary" htmlType="submit" type="primary" shape="round"
                            size='large'>
                        返回
                    </Button>
                </Link>
            </Form.Item>
        </Form>

        return (
            <Main data={addWork}></Main>
        );
    }
}

const WrappedAddWork = Form.create({name: 'addWork'})(AddWork);

export default connect(state => ({}), {})(WrappedAddWork);
