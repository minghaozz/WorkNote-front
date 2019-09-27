import React, {Component} from 'react';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import Life from "@/pages/life/life";
import Home from "@/pages/home/home";
import DetailWork from "@/pages/detailwork/detailWork"
import WrapDetailLife from "@/pages/detailLife/detailLife"
import AddWork from "@/pages/addwork/addWork"
import WrappedAddLife from "@/pages/addlife/addLife"
import Records from "@/pages/record/record"
import WrapLogin from "@/pages/login/login"
import WrapRegister from "@/pages/register/register"
import WrappedRegistrationForm from "@/pages/test"


// react-router4 不再推荐将所有路由规则放在同一个地方集中式路由，子路由应该由父组件动态配置，组件在哪里匹配就在哪里渲染，更加灵活
export default class RouteConfig extends Component {
    render() {
        return (<HashRouter>
                <Switch>
                    <Route path="/" exact component={WrapLogin}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/life" component={Life}/>
                    <Route path="/detail_work" component={DetailWork}/>
                    <Route path="/detail_life" component={WrapDetailLife}/>
                    <Route path="/add_work" component={AddWork}/>
                    <Route path="/add_life" component={WrappedAddLife}/>
                    <Route path="/record" component={Records}/>
                    <Route path="/register" component={WrapRegister}/>
                    <Route path="/test" component={WrappedRegistrationForm}/>
                    <Redirect from="/*" to="/"/>
                </Switch>
            </HashRouter>
        )
    }
}
