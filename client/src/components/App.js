import React from "react";
import { BrowserRouter , Route } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from '../action';
import Header from './Header';
import Landing from './Landing';
import DashBoard from './dashboard';
import NewSurvey from './surveys/newSurvey'



class App extends React.Component{
    componentDidMount(){
        this.props.fetchUser();
    }

    render(){
        return (
                <BrowserRouter>
                    <div>
                        <Header />
                        <div className='container'>
                            <Route path="/" component={Landing} exact />
                            <Route path="/surveys" component={DashBoard} exact />
                            <Route path="/surveys/new" component={NewSurvey} exact />
                        </div>
                    </div>
                </BrowserRouter>
        );
    }
};


export default connect(null , actions)(App)