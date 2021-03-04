import { Button, Card, Form, Input } from 'antd'
import React, { } from 'react'
import styled from '@emotion/styled'
import { useAuth } from '../../context/auth-context'
import logo from 'assets/logo.svg';
import left from 'assets/left.svg';
import right from 'assets/right.svg';


interface IProps { }

const LoginScreen: React.FC<IProps> = (props) => {

  const { login } = useAuth()

  const handleSubmit = (values: { username: string, password: string }) => {
    login({ ...values })
  }

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Form
          onFinish={handleSubmit}
        >
          <Form.Item
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input placeholder="username" />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password placeholder="password" />
          </Form.Item>
          <Form.Item>
            <Button style={{ width: '100%' }} htmlType="submit" type="primary">登录</Button>
          </Form.Item>
        </Form>
      </ShadowCard>
    </Container>
  )
}


export default (LoginScreen)

// css in js  

const Header = styled.header`
background: url(${logo}) no-repeat center;
padding:5rem 0;
background-size:8rem;
width:100%;
`

const Background = styled.div`
position: absolute;
width:100%;
height:100%;
background-repeat: no-repeat;
background-attachment:fixed;
background-position:left bottom, right bottom;
background-size:calc(((100vw - 40rem)/2) - 3.2rem),calc(((100vw - 40rem)/2) - 3.2rem),cover;
background-image:url(${left}),url(${right})
`

const ShadowCard = styled(Card)`
width:40rem;
min-height:25rem;
padding:3.2rem 4rem;
border-radius:0.3rem;
box-sizing:border-box;
box-shadow:rgba(0,0,0,0.1)0 0 10px;
text-align:center;
`

const Container = styled.div`
display:flex;
flex-direction:column;
align-items:center;
min-height:100vh;
`