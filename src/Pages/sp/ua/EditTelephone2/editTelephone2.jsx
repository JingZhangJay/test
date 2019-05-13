import React from 'react';
import ReactDom from 'react-dom';
import {Button, Form, Input, Steps,Icon} from "antd";
const Step = Steps.Step;

class EditTelephone2 extends React.Component {
    constructor(props){
        super(props)
        this.state={
            title: '',
        }
    }
    componentDidMount() {
        this.setState({
            title:this.props.location.query.title
        })
    }

    render() {
        return (
            <div className="userInfo">
                <div>
                    <Steps className='long-step'>
                        <Step status="finish" title="验证身份"  />
                        <Step status="finish" title={"修改"+this.state.title}  />
                        <Step status="process" title="完成" />
                    </Steps>
                </div>
                <div className='form-position'>
                    <p style={{width:'65%',fontSize:30,color:'#fff',margin:'0 auto'}}>
                        <Icon type="smile-circle" />
                        {" ".replace(/ /g, "\u00a0")}
                        恭喜您{this.state.title}修改成功!
                    </p>
                </div>

            </div>
        );
    }
}

export default EditTelephone2;