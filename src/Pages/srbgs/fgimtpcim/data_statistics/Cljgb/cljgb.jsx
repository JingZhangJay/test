import React from "react";
import {Row,Col, Form,DatePicker,Tree,Button,Select,Tabs,Checkbox,Modal, Input,TreeSelect,Radio} from "antd";
import { parseTime, FromsIframe, disabledDate} from '../../../../../asset/srbgs/js/common';
import FreeScrollBar from 'react-free-scrollbar';
import { SelectGroup} from "../../../../../Components";

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const TabPane = Tabs.TabPane;
const Option = Select.Option; 
const SHOW_PARENT = TreeSelect.SHOW_PARENT; 
const RadioGroup = Radio.Group;
const TreeNode = Tree.TreeNode;

require("./cljgb.css")

class Cljgb extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            downAndUp: false,
            optionVisible: false,
            checkedKeys: [],
            expandedKeys: [],
            treeDataList :[
                {
                    label: '刑事处理',
                    value: '1-0',
                    key: '',
                    children: [
                        {
                            label: '判有期徒刑',
                            value: '701',
                            key: '701',
                        },
                        {
                            label: '判有期徒刑缓刑',
                            value: '702',
                            key: '702',
                        },
                        {
                            label: '管制',
                            value: '703',
                            key: '703',
                        },
                        {
                            label: '拘役',
                            value: '704',
                            key: '704',
                        },
                        {
                            label: '逮捕',
                            value: '705',
                            key: '705',
                        },
                        {
                            label: '刑事拘留',
                            value: '706',
                            key: '706',
                        },
                        {
                            label: '取保候审',
                            value: '707',
                            key: '707',
                        },
                        {
                            label: '监视居住',
                            value: '708',
                            key: '708',
                        },
                        {
                            label: '并处罚金',
                            value: '709',
                            key: '709',
                        },
                        {
                            label: '拘役缓刑',
                            value: '710',
                            key: '710',
                        }
                    ]
                },
                {
                    label: '党纪处理',
                    value: '2-0',
                    key: '',
                    children: [
                        {
                            label: '党纪警告',
                            value: '717',
                            key: '717',
                        },
                        {
                            label: '严重警告',
                            value: '718',
                            key: '718',
                        },
                        {
                            label: '撤销党内职务',
                            value: '719',
                            key: '719',
                        },
                        {
                            label: '留党察看',
                            value: '720',
                            key: '720',
                        },
                        {
                            label: '开除党籍',
                            value: '721',
                            key: '721',
                        },
                    ],
                },
                {
                    label: '政纪处理',
                    value: '3-0',
                    key: '',
                    children: [
                        {
                            label: '政纪警告',
                            value: '722',
                            key: '722',
                        },
                        {
                            label: '记过',
                            value: '723',
                            key: '723',
                        },
                        {
                            label: '记大过',
                            value: '724',
                            key: '724',
                        },
                        {
                            label: '降级',
                            value: '725',
                            key: '725',
                        },
                        {
                            label: '撤销行政职务',
                            value: '726',
                            key: '726',
                        },
                        {
                            label: '开除公职',
                            value: '727',
                            key: '727',
                        },
                        {
                            label: '解除聘用合同',
                            value: '728',
                            key: '728',
                        },
                    ],
                },
                {
                    label: '行政处理个人',
                    value: '4-0',
                    key: '',
                    children: [
                        {
                            label: '没收医疗器械',
                            value: '770',
                            key: '770',
                        },
                        {
                            label: '没收B超',
                            value: '771',
                            key: '771',
                        },
                        {
                            label: '没收非法所得',
                            value: '772',
                            key: '772',
                        },
                        {
                            label: '没收药品',
                            value: '773',
                            key: '773',
                        },
                        {
                            label: '罚款',
                            value: '774',
                            key: '774',
                        },
                        {
                            label: '行政拘留',
                            value: '775',
                            key: '775',
                        },
                        {
                            label: '吊销执业医师证书',
                            value: '776',
                            key: '776',
                        },
                        {
                            label: '吊销乡村医师证书',
                            value: '777',
                            key: '777',
                        },
                        {
                            label: '注销生育证',
                            value: '778',
                            key: '778',
                        },
                        {
                            label: '不批准再生育',
                            value: '779',
                            key: '779',
                        },
                        {
                            label: '解除劳动关系',
                            value: '780',
                            key: '780',
                        },
                        {
                            label: '批评教育',
                            value: '781',
                            key: '781',
                        },
                        {
                            label: '落实长效节育措施',
                            value: '782',
                            key: '782',
                        },
                        {
                            label: '吊销助理医师证书',
                            value: '783',
                            key: '783',
                        },
                        {
                            label: '吊销护士执业证书',
                            value: '784',
                            key: '784',
                        },
                        {
                            label: '其他',
                            value: '785',
                            key: '785',
                        },
                    ],
                },
                {
                    label: '行政处理单位',
                    value: '5-0',
                    key: '',
                    children: [
                        {
                            label: '没收单位医疗器械',
                            value: '760',
                            key: '760',
                        },
                        {
                            label: '没收单位B超',
                            value: '761',
                            key: '761',
                        },
                        {
                            label: '吊销机构执业许可证',
                            value: '762',
                            key: '762',
                        },
                        {
                            label: '取缔医疗机构',
                            value: '763',
                            key: '763',
                        },
                        {
                            label: '取消医疗科目',
                            value: '764',
                            key: '764',
                        },
                        {
                            label: '单位罚款',
                            value: '765',
                            key: '765',
                        },
                        {
                            label: '没收单位非法所得',
                            value: '766',
                            key: '766',
                        },
                        {
                            label: '没收单位药品',
                            value: '767',
                            key: '767',
                        },
                        {
                            label: '其他',
                            value: '768',
                            key: '768',
                        }
                    ],
                }
            ],
        }
    }

    /**
     * 过滤传送数据
     * 将勾选后的数据和已拥有的权限数据进行组合
     * 将重复部分(未做更改的数据)过滤
     */
    clearArr(arr){
        var obj = {};
        var temp = [];
        arr.forEach(function(el){
            obj[el] ? obj[el]++ : obj[el] = 1;
        });
        for(var k in obj) {
            if(obj[k] % 2 !== 0) temp.push(k);
        }
        return temp;
    }


     /**
     * 点击复选框事件
     */
    onCheck(checkedKeys, info) {
         // checkedKeys.map((item) =>{
         //   console.log( )
         //
         //     console.log( item )
         // })

        this.setState({
            checkedKeys: checkedKeys
        })
    }

    onExpand (){
        console.log('Trigger Expand');
    };

    treeSelect(selectedKeys,e){
        // console.log('selectedKeys === > ', selectedKeys)
        let {expandedKeys} = this.state;
        let arr = [],
            tempArr = [];

        expandedKeys.forEach(item => {
            arr.push(item)
        })
        tempArr = arr.concat(selectedKeys);
        // tempArr = Array.from(new Set(arr))
        console.log(arr)
        this.setState({
            expandedKeys: tempArr
        })
    }


    // 查询
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((error,values)=>{
            FromsIframe(  //     县：cljgbXian.ureport.xml  县以上：cljgbSSG.ureport.xml
                'http://10.1.92.2:6150/ureport/preview?_u=file:'+ (window.sessionStorage.getItem('assigningCode') == "3" ? 'cljgbXian.ureport.xml': 'cljgbSSG.ureport.xml')
                + '&lasj='+ parseTime(values.lasj)
                + '&lasjEnd='+ parseTime(values.lasjEnd)
                + '&clsj='+ parseTime(values.clsj)
                + '&clsjEnd='+ parseTime(values.clsjEnd)
                + '&jasj='+ parseTime(values.jasj)
                + '&jasjEnd='+ parseTime(values.jasjEnd)
                + '&clfw='+ values.clfw
                + '&type='+ this.state.type
                + '&badw='+ values.badw
                + '&tjr='+ window.sessionStorage.getItem('zoningCode')
            )
        })
    }

    // 处理范围选择弹出框 确认
    optionOk(e){
        let { checkedKeys } = this.state
        this.setState({
            type: checkedKeys,
            optionVisible: false
        })
    }

    // 处理范围选择弹出框 显示
    optionShow(){
        this.setState({
            optionVisible: true
        })
    }
    // 处理范围选择弹出框 取消
    optionCancel(e){ 
        this.setState({
            optionVisible: false,
            checkedKeys: [],
        })
    }

    // 区划下拉框的 Value
    handleZoningCode(test,e){
        for(var key in e) {
            if (key == "xzqhOnly") {
                this.props.form.setFieldsValue({
                    "badw": e[key]
                })
            } else if (key == "xzqhAllSix") {
                this.props.form.setFieldsValue({
                    "afdd": e[key]
                })
            }
        }
    }

    // 收起 搜素框
    downAndUpHandel(){
        // document.getElementsByClassName('formConten')[0].className='formConten up'
        let {downAndUp} = this.state;
        this.setState({
            downAndUp: !downAndUp
        })
    }

    render(){
        const { getFieldProps } = this.props.form;

        let loop = (data) =>
            data.map(item => {
                if (item.children) {
                    return (
                        <TreeNode key={ item.key}  title={item.label}
                        >
                            {loop(item.children)}
                        </TreeNode>
                    );
                }else{
                        return <TreeNode key={ item.key}  title={item.label} isLeaf={true}/>;
                }
            });

        return(
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        处理结果表
                        <p className={`downAndUp ${this.state.downAndUp ? 'rotate' : ''}`} onClick={this.downAndUpHandel.bind(this)}></p>
                    </div>
                    <div className={`formConten ${this.state.downAndUp ? 'up' : ''}`}>
                    <Form horizontal className="ant-advanced-search-form" onSubmit={this.handleSubmit.bind(this)}>
                            <Row gutter={16}>
                                <Col sm={9}>
                                    <FormItem
                                        label="立案时间"
                                        labelCol={{ span: 6 }} 
                                        hasFeedback
                                    >
                                        <Col span="8"> 
                                            <DatePicker {...getFieldProps('lasj')} disabledDate={disabledDate}/>
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8"> 
                                            <DatePicker {...getFieldProps('lasjEnd')} disabledDate={disabledDate}/>
                                        </Col>            
                                    </FormItem>
                                    <FormItem
                                        label="办案单位"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                        required
                                    >
                                        {/* <Input placeholder="请选择地区" {...getFieldProps('badw')}/> */}
                                        <SelectGroup sign="xzqhOnly"  {...getFieldProps('badw')}  handleZoningCode={this.handleZoningCode.bind(this,'xzqhOnly')}></SelectGroup>
                                    </FormItem>

                                </Col>
                                <Col sm={8}>
                                    <FormItem
                                        label="结案时间"
                                        labelCol={{ span: 6 }} 
                                        hasFeedback
                                    >
                                        <Col span="8"> 
                                            <DatePicker {...getFieldProps('jasj')} disabledDate={disabledDate} />
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8"> 
                                            <DatePicker {...getFieldProps('jasjEnd')} disabledDate={disabledDate} />
                                        </Col>   
                                    </FormItem>
                                    <FormItem
                                        label="处理时间"
                                        labelCol={{ span: 6 }}
                                        hasFeedback
                                        help
                                    >
                                        <Col span="8"> 
                                            <DatePicker {...getFieldProps('clsj')} disabledDate={disabledDate} />
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8"> 
                                            <DatePicker {...getFieldProps('clsjEnd')} disabledDate={disabledDate} />
                                        </Col>   
                                    </FormItem>
                                </Col>
                                <Col sm={7}> 
                                    <FormItem
                                        label="处理种类"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                    > 
                                        <RadioGroup {...getFieldProps('type')} > 
                                            <Radio value="all">全部</Radio>
                                            <Radio value="select" onClick={this.optionShow.bind(this)}>选择</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                    <FormItem
                                        label="处理范围"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                        hasFeedback
                                        help
                                    >
                                        <Select {...getFieldProps('clfw')}>
                                            <Option value="">全部</Option>
                                            <Option value="1">本地</Option>
                                            <Option value="2">外地</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} offset={12} style={{ textAlign: 'right' }}>
                                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}>查询</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                <div className="queryResults">
                    <div id="FromsIframeBox">
                        <FreeScrollBar
                        className="example"
                        autohide={true}
                        fixed={true}
                        start={'right'}
                        onScrollbarScrollTimeout={100}>
                            <iframe id='FromsIframe' src="" frameborder="0"   scrolling="no" width="100%" height="100%" frameborder="0" allowTransparency="true"></iframe>
                        </FreeScrollBar>
                   </div>
                </div>

                <Modal visible={this.state.optionVisible}  title="处理种类"
                    onCancel={this.optionCancel.bind(this)}
                    onOk={this.optionOk.bind(this)} style={{overflow:'hidden'}}
                    >

                    <Tree
                        // onSelect={this.treeSelect.bind(this)}
                        // onExpand={this.onExpand.bind(this)}
                        // expandedKeys ={this.state.expandedKeys.length ==0 ? []:this.state.expandedKeys}
                        checkable
                        checkedKeys={this.state.checkedKeys.length==0?[]:this.state.checkedKeys}
                        onCheck={this.onCheck.bind(this)}
                    >
                        {loop(this.state.treeDataList)}
                    </Tree>
                    

                </Modal>
            </div>
        )
    }
}

Cljgb = Form.create()(Cljgb);

export default Cljgb