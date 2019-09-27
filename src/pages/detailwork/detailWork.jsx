import {
    Form,
    Input,
    Select,
    Button, DatePicker, Checkbox,
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

class DetailWork extends Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        checked: '',
    };
    constructor(props){
        super(props);
        if(this.props.location.state.status == 2){
            this.state.checked = true;
        }else {
            this.state.checked = false;
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            let pathname = this.props.location.pathname;
            let index = pathname.lastIndexOf("\/");
            let _this =this;
            let id = pathname.substring(index+1,pathname.length);
            values.id = id;
            values.aspect = 1;
            console.log(this.props);
            if(values.status == true){
                values.status = 2
            }else {
                values.status = 1
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

    onChange = e => {
        this.setState({
            checked: e.target.checked,
        });
        console.log('checked = ', e.target.checked);
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
        const detailWork = <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="标题" >
                {getFieldDecorator('title', {
                    rules: [
                        {
                            required: true,
                            message: '请输入你的标题!',
                        },
                    ],
                    initialValue:this.props.location.state.title?this.props.location.state.title:''
                })(<Input style={{display: 'inline-block', width: 'calc(50% - 12px)'}} />)}
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
                    initialValue:this.props.location.state.priority?this.props.location.state.priority:''
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
                    {getFieldDecorator('completetime',{rules: [{ required: true, message: '请选择时间!' }],
                        initialValue:this.props.location.state.createtime?moment(''+this.props.location.state.createtime+'', dateFormat):''})(
                        <DatePicker defaultPickerValue={moment(new Date(), dateFormat)}/>
                    )}
                </Form.Item>
            </Form.Item>
            <Form.Item label="预期日期">
                <Form.Item
                    style={{display: 'inline-block', width: 'calc(50% - 12px)'}}
                >
                    {getFieldDecorator('createtime',{rules: [{ required: true, message: '请选择时间!' }],
                        initialValue:this.props.location.state.createtime?moment(''+this.props.location.state.completetime+'', dateFormat):''})(
                        <DatePicker defaultPickerValue={moment(new Date(), dateFormat)}/>
                    )}
                </Form.Item>
            </Form.Item>
            <Form.Item label="任务简介" >
                {getFieldDecorator('description', {
                    rules: [{required: true, message: '请输入任务简介!', whitespace: true}],
                    initialValue:this.props.location.state.description?this.props.location.state.description:''
                })(
                    <TextArea rows={4} style={{display: 'inline-block', width: 'calc(50% - 12px)'}}/>
                )}
            </Form.Item>
            <Form.Item label="完成" >
                {getFieldDecorator('status',{
                })(
                    <Checkbox checked={this.state.checked}  onChange={this.onChange}
                    >
                    </Checkbox>
                )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout} style={{textAlign: "center"}}>
                <Button type="primary"  style={{position: "relative", left: '-110px'}} htmlType="submit" type="primary" shape="round"
                        size='large'>
                    确认修改
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
            <Main data={detailWork}></Main>
        );
    }
}

const WrapDetailWork = Form.create({name: 'detailWork'})(DetailWork);

export default connect(state => ({}), {})(WrapDetailWork);
