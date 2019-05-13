import React from "react";
import { Row, Col, Modal, Icon, Card,Badge,Button ,Form,Select,Input,Upload, message,} from 'antd';
import {getCaseFileShow,getCaseFileAdd,getCaseFileDownload} from "../../../../Service/srbgs/fgimtpcim/server";

require('./caseFile_Model.css')

const FormItem = Form.Item;
const Option = Select.Option;

class CaseFile_Model extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data:props.data,
            caseFileData:[],
            caseFileShowVisible:false,
            caseFileAdd:false
        }
    }

    //查看案件材料展示 请求
    async handleGetCaseFileShow (params){
        let data = await getCaseFileShow(params);
        if(data.code == '000000'){
            this.setState({
                caseFileData:data.responseData,
                caseFileShowVisible:true
            })
        }else{
            message.error('数据请求失败！')
        }
        
        console.log(this.state.caseFileData)
    }

    //添加案件材料 请求
    async handleGetCaseFileAdd (params){
        let data = await getCaseFileAdd(params);
        console.log(data);
        if (data.code == '000000') {
            message.success('数据添加成功')
        }else{
            message.error('数据添加失败')
        }
    }

    // 材料下载 请求
    async handGetCaseFileDownload(params){
        let data = await getCaseFileDownload(params);
        console.log(data)
    }
    caseFileShow(e){
         let data = {
             ajbh: this.props.data[0][0].ajbh,
             cllb: e.currentTarget.getAttribute('cllb'),
             cllx: e.currentTarget.getAttribute('cllx'),
             pageNum:1,
             pageSize:100,
         }
         this.handleGetCaseFileShow(data)
    }

    CaseFileHandle() {
        this.props.CaseFileHandle();
    }

    CaseFileHandleDetail(){
        this.setState({
            caseFileShowVisible:false
        })
    }


    showCaseAdd(){
        this.setState({
            caseFileAdd:true
        })
    }



    // 材料主题：1 案件材料； 2，涉案对象材料按涉案对象分 3，涉案对象按材料类别分
    onSelectClzt(e){
        if(e == '1'){
            document.getElementsByClassName('sadx')[0].setAttribute('style', 'display:none');
        }else{
            document.getElementsByClassName('sadx')[0].setAttribute('style', 'display:block');
        }
    }

    // 添加材料 确认按钮
    caseFileAddOk(e){
        let addData = new FormData(), 
            data; 
        this.props.form.validateFields((errors,values) => {  
            console.log(values.imgData.file)
            data = {
                ajbh:this.props.data[0][0].ajbh,
                wjlx:values.wjlx,
                cllx:values.cllx,
                clzt:values.clzt,
                cllx:values.cllx, 
                sadxbh:'',
                sadxmc:'',
                scdw: window.sessionStorage.getItem('zoningCode')
            }

            addData.append('data',JSON.stringify(data)); 
            addData.append('files',values.imgData.file.originFileObj);
            addData.append('files',values.fileData.file.originFileObj);
        });

       

        console.log(addData)
        this.handleGetCaseFileAdd(addData);
    }

    // 添加材料 取消按钮
    caseFileAddOnCancel(){
        this.setState({
            caseFileAdd:false
        })
    }

    // 案件材料下载
    materialDownload(e){  
        window.location.href =localStorage.getItem('baseURL') + '/ajgl/action/downloadAjcl?id='+e.currentTarget.parentNode.parentNode.childNodes[0].value
    }
    render() {
        const { getFieldProps } = this.props.form;

        const loopDom =  data  => data.map(item => {
            return (
                <Col sm={2} md={4} lg={6} style={{marginTop:10}}>
                    <a href="javascript:;" onClick={this.caseFileShow.bind(this)} cllb='1' cllx={item.cllx} ajbh={item.ajbh}>
                        <Badge count={item.num}>
                            <Icon type="book" className="icon" style={{fontSize:35}}/>
                        </Badge>
                        <p> {item.cllxmc}</p>
                    </a>
                </Col>
            )
        });

        const caseFileLists = data => data.map(item => {
            return(
                <Col span="8" style={{marginTop:'10px'}}>
                    <Card title={item.clmc} bordered={false}>
                        <Col span="8">
                            <img src="src/asset/srbgs/img/file.png" width="72"/>
                        </Col>
                        <Col span="16">
                            <input type="hidden" value={item.id}/>
                            <p>材料格式： <span>{item.wjlx}</span></p>
                            <p>材料类别： <span>{item.cllxmc}</span></p>
                            <p>文件格式： <span>{item.wjgs}</span></p>
                            <p>文件大小： <span>{item.wjdx}</span></p> 
                            <p>操作： <Button type="primary" onClick={this.materialDownload.bind(this)}>下载</Button></p>
                        </Col>
                    </Card>
                </Col>
            )
        })

        // const propsImg = {
        //     name: 'file',
        //     action: '/upload.do',
        //     headers: {
        //         authorization: 'authorization-text',
        //     },
        //     onChange(info) {
        //         if (info.file.status !== 'uploading') {
        //             console.log(info.file, info.fileList);
        //         }
        //         if (info.file.status === 'done') {
        //             message.success(`${info.file.name} 上传成功。`);
        //         } else if (info.file.status === 'error') {
        //             message.error(`${info.file.name} 上传失败。`);
        //         }
        //     },
        // };

        // const propsFile = {
        //     name: 'file',
        //     action: '/upload.do',
        //     headers: {
        //         authorization: 'authorization-text',
        //     },
        //     onChange(info) {
        //         if (info.file.status !== 'uploading') {
        //             console.log(info.file, info.fileList);
        //         }
        //         if (info.file.status === 'done') {
        //             message.success(`${info.file.name} 上传成功。`);
        //         } else if (info.file.status === 'error') {
        //             message.error(`${info.file.name} 上传失败。`);
        //         }
        //     },
        // };
        return(
            <div className="caseFile">

                <Modal title="案件材料" className="caseFileModel" visible={this.props.visible} width="54%"
                       onOk={this.CaseFileHandle.bind(this)} onCancel={this.CaseFileHandle.bind(this)}>
                    <Button type="dashed" style={{marginLeft:'2%',color:'#666',display:(window.sessionStorage.getItem('assigningCode') == '3'? 'block' : 'none')}} className="caseAdd" onClick={this.showCaseAdd.bind(this)}>
                        <Icon type="plus-circle" />
                        新增案件材料
                    </Button>
                    <Card title="案件对应的材料">
                        <Row>
                            {loopDom(this.props.data[0])}
                        </Row>
                    </Card>
                    <Card title="涉案对象对应材料按涉案对象分">
                        <Row>
                            {loopDom(this.props.data[1])}
                        </Row>
                    </Card>
                    <Card title="涉案对象对应材料按类别分">
                        <Row>
                            {loopDom(this.props.data[2])}
                        </Row>
                    </Card>
                </Modal>

                {/* 案件材料展示 */}
                <Modal title="案件材料展示" visible={this.state.caseFileShowVisible} className="caseFileShow" width="58%"
                       onOk={this.CaseFileHandleDetail.bind(this)} onCancel={this.CaseFileHandleDetail.bind(this)}>
                    <Row>

                        {caseFileLists(this.state.caseFileData)}

                        {/*<Col span="8">*/}
                            {/*<Card title="Card title" bordered={false}>*/}
                                {/*<Col span="12">*/}
                                    {/*<img src="" alt=""/>*/}
                                {/*</Col>*/}
                                {/*<Col span="12">*/}
                                    {/*<p>材料名称： <span>结案报告001</span></p>*/}
                                    {/*<p>材料格式： <span>扫描件</span></p>*/}
                                    {/*<p>材料类别： <span>结案报告</span></p>*/}
                                    {/*<p>文件格式： <span>.pdf</span></p>*/}
                                    {/*<p>文件大小： <span>.pdf</span></p>*/}
                                    {/*<p>文件格式： <span>442.5 KB</span></p>*/}
                                    {/*<p>操作： <Button type="primary">下载</Button></p>*/}
                                {/*</Col>*/}
                            {/*</Card>*/}
                        {/*</Col>*/}

                    </Row>
                </Modal>

                {/* 新增案件材料 */}
                <Modal title="案件材料新增" visible={this.state.caseFileAdd} width="54%"
                    onOk={this.caseFileAddOk.bind(this)}
                     onCancel={this.caseFileAddOnCancel.bind(this)}>
                    <FormItem
                        label="文件类型"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        hasFeedback
                    >
                        <Select style={{"width":"100%"}} {...getFieldProps('wjlx')}>
                            <Option value="">全部</Option>
                            <Option value="600">文档文件</Option>
                            <Option value="601">图片文件</Option>
                            <Option value="602">扫面件</Option>
                            <Option value="603">音频文件</Option>
                            <Option value="604">视屏文件</Option>
                            <Option value="605">其他</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        label="材料类型"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        hasFeedback
                    >
                        <Select style={{"width":"100%"}} {...getFieldProps('cllx')}>
                            <Option value="">全部</Option>
                            <Option value="610">立案审批表</Option>
                            <Option value="611">调查报告</Option>
                            <Option value="612">询问笔录</Option>
                            <Option value="613">行政处罚初步审核表</Option>
                            <Option value="614">案件处理集体讨论记录</Option>
                            <Option value="615">行政处罚告知书</Option>
                            <Option value="616">行政处罚决定书</Option>
                            <Option value="617">行政执法文书送达回执</Option>
                            <Option value="618">罚款收据</Option>
                            <Option value="619">党政纪处罚文件</Option>
                            <Option value="620">结案报告</Option>
                            <Option value="622">受理记录登记表</Option>
                            <Option value="623">刑事判决书</Option>
                            <Option value="621">其他</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        label="材料主题"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        hasFeedback
                    >
                        <Select style={{"width":"100%"}} {...getFieldProps('clzt')} onSelect={this.onSelectClzt.bind(this)}>
                            <Option value="">全部</Option>
                            <Option value="1">案件材料</Option>
                            <Option value="2">涉案对象材料按涉案对象分</Option>
                            <Option value="3">涉案对象按材料类别分</Option>
                        </Select>

                    </FormItem>
                    <FormItem
                        label="涉案对象"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        hasFeedback
                        className="sadx"
                    >
                        <Input size="default" {...getFieldProps('sadxmc')} />
                    </FormItem>
                    <FormItem
                        label="图片上传"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        hasFeedback
                    >
                        <Upload   {...getFieldProps('imgData')} multiple="true">
                            <Button type="ghost">
                                <Icon type="upload" /> 点击上传
                            </Button>
                        </Upload>
                    </FormItem>
                    {/*<FormItem*/}
                        {/*label="图片预览"*/}
                        {/*labelCol={{ span: 4 }}*/}
                        {/*wrapperCol={{ span: 18 }}*/}
                        {/*hasFeedback*/}
                    {/*>*/}
                        {/*<Input size="default" value={this.state.bljdContent.sbsj}/>*/}
                    {/*</FormItem>*/}
                    <FormItem
                        label="文件上传"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        hasFeedback
                    >
                        <Upload  {...getFieldProps('fileData')} multiple="true">
                            <Button type="ghost">
                                <Icon type="upload" /> 点击上传
                            </Button>
                        </Upload>
                    </FormItem>
                    {/*<FormItem*/}
                        {/*label="文件预览"*/}
                        {/*labelCol={{ span: 4 }}*/}
                        {/*wrapperCol={{ span: 18 }}*/}
                        {/*hasFeedback*/}
                    {/*>*/}
                        {/*<Input size="default" value={this.state.bljdContent.sbdw}/>*/}
                    {/*</FormItem>*/}
                </Modal>
            </div>
        )
    }
}

CaseFile_Model = Form.create()(CaseFile_Model);

export default CaseFile_Model;