import React from "react";
import { BrowserRouter , Route } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from '../action';
import Header from './Header';
import Landing from './Landing'

const DashBoard = () => <div>DashBoard</div>
const SurverNew = () => <div>SurverNew</div>

class App extends React.Component{
    componentDidMount(){
        this.props.fetchUser();
    }

    render(){
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route path="/" component={Landing} exact />
                        <Route path="/surveys" component={DashBoard} exact />
                        <Route path="/surveys/new" component={SurverNew} exact />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null , actions)(App)