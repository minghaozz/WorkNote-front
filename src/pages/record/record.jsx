import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button,Layout, Input, Form, Card, Icon, Modal} from "antd";
import Main from "../../components/main/main";
import './record.less';
import ReactDOM from 'react-dom';
import axios from "axios";

let id = 1;

class Record extends Component {

    state = {
        confirmDirty: false,
        visible: false,
        listdata: [],
        min: 0,
        i: 0,
        mycard:[]
    };
    constructor(props){
        super(props);
        this.getData(this);
    }
    editCard = () => {
        this.setState({
            visible: true,
        });
    };


    handleSubmit = e => {
        e.preventDefault();
        let _this =this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            axios.post('http://localhost:8888/api/key/insert_keys',values)
                .then(function (response) {
                    _this.setState({
                        visible: false,
                    });
                    window.location.reload();
                })
                .catch(function (error) {
                    console.log(error);
                });
        });

    };
    getData(_this) {
        axios.get('http://localhost:8888/api/key/search_keys', {params: {aspect: 1, pageNum: 1}})
            .then(function (response) {
                _this.setState({
                    listdata:response.data.data
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    handleOk = e => {
        this.handleSubmit(e);
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    remove = k => {
        const {form} = this.props;
        const ckeys = form.getFieldValue('ckeys');
        if (ckeys.length === 1) {
            return;
        }
        // can use data-binding to set
        form.setFieldsValue({
            ckeys: ckeys.filter(key => key !== k),
        });

    };

    add = () => {
        const {form} = this.props;
        // can use data-binding to get
        const ckeys = form.getFieldValue('ckeys');
        const nextKeys = ckeys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            ckeys: nextKeys,
        });
    };
    handleConfirmBlur = e => {
        const {value} = e.target;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    render() {
        console.log(++this.state.i)
        if(this.state.i!=1&&this.state.i!=2){
            this.state.listdata = []
        }
        let cardData  = <div>
            <Button onClick={this.editCard} style={{position: "absolute",right: 30}} type="primary" shape="circle" icon="plus"/>
            <div className='mycard' style={{width: 270, display: "inline-block"}}></div>
            <div className='card-style mycard'></div>
            <div className='card-style mycard'></div>
            <div className='card-style mycard'></div>
                {this.state.listdata.map(obj=> {
                    this.dom = document.createElement('div');
                     const jsxdom = <Card title={obj.title} extra={<span className='date-color'>{obj.createtime}</span>} actions={[
                         <Icon type="edit" key="edit" onClick={this.editCard}/>
                     ]} style={{width: 270}}>
                         {
                             obj.keyss.split(',').map(obj => (
                             <p>{obj}</p>
                         ))}
                     </Card>;
                     ReactDOM.render(jsxdom, this.dom);
                    document.getElementsByClassName("mycard")[this.state.min].appendChild(this.dom);
                    let h = obj.keyss.split(',').length;
                    if(obj.id<=3){
                        if(obj.id==1){
                            this.state.mycard[0] = h;
                        }
                        if(obj.id==2) {
                            this.state.mycard[1] = h;
                        }
                        if(obj.id==3){
                            this.state.mycard[2] = h;
                        }
                        this.state.min = obj.id;
                    }
                    else if(obj.id> 3) {
                        if(obj.id==4) {
                            this.state.mycard[3] = h
                        }
                        var arr = new Array();
                        arr.push(this.state.mycard[0],this.state.mycard[1],this.state.mycard[2],this.state.mycard[3])
                        var min = Math.min.apply(null, arr);
                        let number = arr.indexOf(min);
                        this.state.min = number;
                        console.log(arr)
                        console.log(number)
                    if(obj.id!=4){
                        this.state.mycard[number] = h+this.state.mycard[number];
                    }
                    }
                })
                }
        </div>

        const {getFieldDecorator, getFieldValue} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 20},
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: {span: 24, offset: 0},
                sm: {span: 20, offset: 4},
            },
        };
        getFieldDecorator('ckeys', {initialValue: []});
        const ckeys = getFieldValue('ckeys');
        const formItems = ckeys.map((k, index) => (
            <Form.Item
                {...(formItemLayoutWithOutLabel)}
                required={false}
                key={k}
            >
                {getFieldDecorator(`keys[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: "请输入要点",
                        },
                    ],
                })(<Input placeholder="请输入要点" style={{width: '60%', marginRight: 8}}/>)}
                {ckeys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k)}
                    />
                ) : null}
            </Form.Item>
        ));
        return (
            <Layout>
                <div>
                    <Modal
                        title="新增日常要点记录"
                        visible={this.state.visible}
                        okText='确认'
                        cancelText='取消'
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <Form.Item
                            {... formItemLayoutWithOutLabel}
                            label= '要点'
                            required={false}
                            key={0}
                        >
                            {getFieldDecorator(`keys[0]`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: "请输入要点",
                                    },
                                ],
                            })(<Input placeholder="请输入要点" style={{width: '60%', marginRight: 8}}/>)}
                        </Form.Item>
                        <Form>
                            {formItems}
                            <Form.Item {...formItemLayoutWithOutLabel} label="标题" >
                                {getFieldDecorator('title', {
                                    rules: [{required: true, message: '请输入标题!', whitespace: true}],
                                })(
                                    <Input style={{display: 'inline-block', width: '60%'}}/>
                                )}
                            </Form.Item>
                            <Form.Item {...formItemLayoutWithOutLabel}>
                                <Button type="dashed" onClick={this.add} style={{width: '60%'}}>
                                    <Icon type="plus"/> 增加一个要点
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
                    <Main data={cardData}/>
            </Layout>

        )
    }
}

const Records = Form.create({name: 'dynamic_form_item'})(Record);
export default connect(state => ({}), {})(Records);