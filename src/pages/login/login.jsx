import React,{Component} from "react"
import { Form,Icon,Input,Button} from 'antd'
import "./css/login.less"
import logo from "./imgs/logo.png"
const {Item} = Form

 class Login extends Component{
//   handleSubmit = () =>{
//     //1.获取用户输入
//     // 2.校验数据
//     // 3.发送登录请求 axios  以上三步用了antd就不是这个步骤了

//   }
  handleSubmit = e => {
        e.preventDefault();  //阻止默认事件，禁止form表单提交，通过ajax发送
        this.props.form.validateFields((err, values) => {
        if (!err) {
            alert("向服务器发送登录请求！")
        }
    });
  };
  pwdValidator = (rule,value,callback) =>{
    // console.log(value)
    if(!value){
        // 提示密码必须输入
        callback("密码必须输入")

    }else if(value.length > 12){
        // 提示密码必须小于等于12位
        callback("密码必须小于等于12位")
    }else if(value.length<4){
        // 提示密码必须大于等于4位
        callback("密码必须大于等于4位")

    }else if(!(/^\w+$/).test(value)){
        // 提示密码必须是字母、数字、下划线
        callback("密码必须是字母、数字、下划线")
    }else{
        callback()
    }
   
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    console.log(getFieldDecorator)
    
    return(
      
      <div className="login">
        <header>
            <img src={logo} alt="logo"/>
            <h1>商品管理系统</h1>
        </header>
        <section>
            <h1>用户登录</h1>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Item>
                    {getFieldDecorator('username', {

                        // 用户名密码的合法性要求
                        // 1.必须输入  2.必须大于4位 3.必须小于12位 4.必须是英文 数字下滑线组成
                    rules: [
                        { required: true, message: '用户名必须输入！' },
                        {max:12,message:"用户名必须小于等于12位"},
                        {min:4,message:"用户名必须大于等于4位"},
                        {pattern:/^\w+$/,message:"用户名必须是字母数字下划线"},
                    ],
                    })(
                    <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                    />,
                    )}
                </Item>
                <Item>
                    {getFieldDecorator('password', {
                    rules: [
                        { validator:this.pwdValidator },

                    
                    ],
                    })(
                    <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                    />,
                    )}
                </Item>
                <Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                </Button>
                </Item>
            </Form>
        </section>
      </div>
    )
  }

  
}
export default Form.create()(Login)