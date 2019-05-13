import React from "react"; ;

class tests extends React.Component{
    constructor(props){
        super(props);

    }

    componentWillReceiveProps(nextProps){
        console.log("==============>",nextProps, this.props);
    }
    render() {
        return (
            <div style={{background:'red',color:'#fff',display:(this.props.visible == false ? 'none' : 'block')}} >
                子组件
            </div>
        )
    }
}

export default tests;