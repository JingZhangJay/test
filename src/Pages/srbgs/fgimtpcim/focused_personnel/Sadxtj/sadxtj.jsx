import React from "react";
import { Menu, Icon } from 'antd';

import {Tests} from "../../../../../Components/index"
require('./sadxtj.css');


class Sadxtj extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:'1',
            show: false,
        }
    }

    click (){
        alert('111')
        this.setState({
            data: '3',
            show: true,
        })
    }

    render() {
        return (
            <div>
                <div> 涉案对象查询 </div>
                <button onClick={this.click.bind(this)}>1234432123r</button>
                <Tests data={this.state.data} visible={this.state.show} />
            </div>
        )
    }
}

export default Sadxtj;