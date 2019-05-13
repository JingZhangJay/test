import React from "react";
import {Row, Col, Form,Cascader,Button,DatePicker,Radio,Modal,Table } from "antd";
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group
require("./sjcljghzb.css")

const tableData = [
    {
        key: 1, select: '判有期徒刑',type: '追究刑事责任',
    }, {
        key: 2, select: '拘役缓刑',type: '追究刑事责任',
    },{
        key: 3, select: '判有期徒刑缓刑',type: '追究刑事责任',
    },{
        key: 4, select: '管制',type: '追究刑事责任',
    },{
        key: 5, select: '拘役',type: '追究刑事责任',
    },{
        key: 6, select: '逮捕',type: '追究刑事责任',
    },{
        key: 7, select: '刑事拘留',type: '追究刑事责任',
    },{
        key: 8, select: '取保候审',type: '追究刑事责任',
    },{
        key: 9, select: '监视居住',type: '追究刑事责任',
    },{
        key: 10, select: '并处罚金',type: '追究刑事责任',
    },{
        key: 11, select: '警告',type: '党政纪处分_党纪处分',
    },{
        key: 12, select: '严重警告',type: '党政纪处分_党纪处分',
    },{
        key: 13, select: '撤销党内职务',type: '党政纪处分_党纪处分',
    },{
        key: 14, select: '留党察看',type: '党政纪处分_党纪处分',
    },{
        key: 15, select: '开除党籍',type: '党政纪处分_党纪处分',
    },{
        key: 16, select: '警告',type: '党政纪处分_政纪处分',
    },{
        key: 17, select: '记过',type: '党政纪处分_政纪处分',
    },{
        key: 18, select: '记大过',type: '党政纪处分_政纪处分',
    },{
        key: 19, select: '降级',type: '党政纪处分_政纪处分',
    },{
        key: 20, select: '撤销行政职务',type: '党政纪处分_政纪处分',
    },{
        key: 21, select: '开除公职',type: '党政纪处分_政纪处分',
    },{
        key: 22, select: '解除聘用合同',type: '党政纪处分_政纪处分',
    },{
        key: 23, select: '没收医疗器械',type: '行政处罚单位',
    },{
        key: 24, select: '没收B超',type: '行政处罚单位',
    },{
        key: 25, select: '吊销机构执业许可证',type: '行政处罚单位',
    },{
        key: 26, select: '取缔医疗机构',type: '行政处罚单位',
    },{
        key: 27, select: '取消医疗科目',type: '行政处罚单位',
    },{
        key: 28, select: '罚款',type: '行政处罚单位',
    },{
        key: 29, select: '没收非法所得',type: '行政处罚单位',
    },{
        key: 30, select: '没收药品',type: '行政处罚单位',
    },{
        key: 31, select: '其他',type: '行政处罚单位',
    },{
        key: 32, select: '没收医疗器械',type: '行政处罚个人',
    },{
        key: 33, select: '不批准再生育',type: '行政处罚个人',
    },{
        key: 34, select: '解除劳动关系',type: '行政处罚个人',
    },{
        key: 35, select: '批评教育',type: '行政处罚个人',
    },{
        key: 36, select: '落实长效节育措施',type: '行政处罚个人',
    },{
        key: 37, select: '吊销助理医师证书',type: '行政处罚个人',
    },{
        key: 38, select: '吊销护士执业证书',type: '行政处罚个人',
    },{
        key: 39, select: '其他',type: '行政处罚个人',
    },{
        key: 40, select: '没收B超',type: '行政处罚个人',
    },{
        key: 41, select: '没收非法所得',type: '行政处罚个人',
    },{
        key: 42, select: '没收药品',type: '行政处罚个人',
    },{
        key: 43, select: '罚款',type: '行政处罚个人',
    },{
        key: 44, select: '行政拘留',type: '行政处罚个人',
    },{
        key: 45, select: '吊销执业医师证书',type: '行政处罚个人',
    },{
        key: 46, select: '注销生育证',type: '行政处罚个人',
    },
];


class Sjcljghzb extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            downAndUp: false,
            visible: false,
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.props.form)
        console.log('收到表单值：', this.props.form.getFieldsValue());
    }

    onChange(){
        console.log(this)
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
        const columns = [
            { title: '选择处理', dataIndex: 'select', key: 'select'},
            { title: '处理类型', dataIndex: 'type', key: 'type' }
        ];

        // 通过 rowSelection 对象表明需要行选择
        const rowSelection = {
            onChange(selectedRowKeys, selectedRows) {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect(record, selected, selectedRows) {
                console.log(record, selected, selectedRows);
            },
            onSelectAll(selected, selectedRows, changeRows) {
                console.log(selected, selectedRows, changeRows);
            },
        };

        return(
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        省级处理结果汇总表
                        <p className={`downAndUp ${this.state.downAndUp ? 'rotate' : ''}`} onClick={this.downAndUpHandel.bind(this)}></p>
                    </div>
                    <div className={`formConten ${this.state.downAndUp ? 'up' : ''}`}>
                        <Form horizontal className="ant-advanced-search-form" onSubmit={this.handleSubmit.bind(this)}>
                            <Row gutter={16}>
                                <Col sm={8}>
                                    <FormItem
                                        label="立案时间"
                                        labelCol={{ span: 9 }}
                                        wrapperCol={{ span: 14 }}
                                        hasFeedback
                                    >
                                        <RangePicker />
                                    </FormItem>
                                    <FormItem
                                        label="办案单位"
                                        labelCol={{ span: 9 }}
                                        wrapperCol={{ span: 14 }}
                                        hasFeedback
                                        help
                                    >
                                        <Cascader options={this.state.areaData} {...getFieldProps('area')} />
                                    </FormItem>
                                </Col>
                                <Col sm={8}>
                                    <FormItem
                                        label="结案时间"
                                        labelCol={{ span: 9 }}
                                        wrapperCol={{ span: 14 }}
                                        hasFeedback
                                    >
                                        <RangePicker/>
                                    </FormItem>

                                    <FormItem
                                        label="处理种类"
                                        labelCol={{ span: 9 }}
                                        wrapperCol={{ span: 14 }}
                                        hasFeedback
                                    >
                                        <RadioGroup onChange={this.onChange} value={this.state.value}>
                                            <Radio key="全部" value="全部">全部</Radio>
                                            <Radio key="选择" value="选择">选择</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </Col>
                                <Col sm={8}>
                                    <FormItem
                                        label="处理时间"
                                        labelCol={{ span: 9 }}
                                        wrapperCol={{ span: 14 }}
                                        hasFeedback
                                        help
                                    >
                                        <RangePicker/>
                                    </FormItem>

                                    <FormItem
                                        label="处理地点"
                                        labelCol={{ span: 9 }}
                                        wrapperCol={{ span: 14 }}
                                        hasFeedback
                                    >
                                        <RadioGroup onChange={this.onChange} value={this.state.value}>
                                            <Radio key="全部" value="全部">全部</Radio>
                                            <Radio key="本地" value="选择">本地</Radio>
                                            <Radio key="外地" value="选择">外地</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} offset={12} style={{ textAlign: 'right' }}>
                                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}>查询</Button>
                                    <Button>导出</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                {/* 处理信息 */}
                <Modal title="选择处理结果">
                    <Table rowSelection={rowSelection} columns={columns} dataSource={tableData} />
                </Modal>
            </div>
        )
    }
}

Sjcljghzb = Form.create()(Sjcljghzb);

export default Sjcljghzb