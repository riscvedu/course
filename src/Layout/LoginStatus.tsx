import { useCallback, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Menu, Modal, Form, Input, Button, message } from 'antd'
import { USER_INFO_STORAGE_KEY, DETAULT_USER_AVATAR } from '../constants'
import VerificationCode, { VerificationCodeNum } from '../components/VerificationCode'
import { useAppState } from '../hook'

const PhoneRegex = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
interface IFromProps {
  phone: string
  code: string
}

const LoginForm = (props: { onSubmit: (phone: string) => void | Promise<boolean> }) => {
  const codeRef = useRef<{
    getCodes: () => number[]
    getCodesAsString: (caseInsensitive?: boolean) => string
  }>()
  const [codeIsValid, setCodeIsValid] = useState(true)
  const [form] = Form.useForm<IFromProps>()
  const onFinish = (value: IFromProps) => {
    if (
      value.code.length === VerificationCodeNum &&
      value.code.toLowerCase() === codeRef.current?.getCodesAsString(true)
    ) {
      props.onSubmit(value.phone)
    } else {
      setCodeIsValid(false)
    }
  }

  return (
    <Form form={form} className="login-form" onFinish={onFinish} autoComplete="off" size="large">
      <h3>请使用手机号登录</h3>
      <Form.Item
        name="phone"
        rules={[
          { required: true, message: '请输入手机号' },
          { pattern: PhoneRegex, message: '请输入正确手机号' }
        ]}
      >
        <Input placeholder="请输入手机号" />
      </Form.Item>

      <Form.Item
        name="code"
        rules={[{ required: true, message: '请输入验证码' }]}
        help={codeIsValid ? undefined : '验证码输入错误'}
        validateStatus={codeIsValid ? undefined : 'error'}
      >
        <Input placeholder="请输入验证码" addonAfter={<VerificationCode ref={codeRef} />} />
      </Form.Item>

      <Form.Item>
        <Button style={{ width: '100%' }} type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>

      <span>
        登录即代表阅读并同意 <span style={{ color: '#3db477' }}>《服务协议和隐私政策》</span>
      </span>
    </Form>
  )
}
const LoginStatus = () => {
  const {
    state: { currentUser },
    dispatch
  } = useAppState()
  const [loginVisible, setLoginVisible] = useState(false)

  const login = (phone: string) => {
    dispatch({
      type: 'LOGIN',
      payload: {
        nickname: phone
      }
    })
  }
  const logout = () => {
    dispatch({
      type: 'LOGOUT'
    })
  }
  const initUserInfo = useCallback(() => {
    const phone = localStorage.getItem(USER_INFO_STORAGE_KEY)
    if (phone) {
      login(phone)
    }
  }, [])
  useEffect(() => {
    initUserInfo()
  }, [initUserInfo])

  const handleSubmit = (phone: string) => {
    localStorage.setItem(USER_INFO_STORAGE_KEY, phone)
    message.success('登录成功，欢迎回来!')
    setLoginVisible(false)
    login(phone)
  }
  if (!currentUser?.nickname) {
    return (
      <>
        <span onClick={() => setLoginVisible(true)}>登录</span>
        <Modal
          width={350}
          open={loginVisible}
          footer={null}
          onCancel={() => setLoginVisible(false)}
          maskClosable={false}
        >
          <LoginForm onSubmit={handleSubmit} />
        </Modal>
      </>
    )
  }
  const menu = (
    <Menu
      onClick={({ key }) => {
        console.log(key)
        if (key === 'logout') {
          localStorage.removeItem(USER_INFO_STORAGE_KEY)
          logout()
        }
      }}
      items={[
        {
          key: 'myCourse',
          label: <Link to="/myCourse">我的课程</Link>
        },
        {
          key: 'logout',
          label: <span>退出登录</span>
        }
      ]}
    />
  )
  return (
    <Dropdown overlayClassName="user-dropdown-menus" overlay={menu} placement="bottomRight" arrow>
      <span className="not-link">
        <img width={30} src={currentUser.avatar || DETAULT_USER_AVATAR} alt="avatar" />{' '}
        {currentUser.nickname}
      </span>
    </Dropdown>
  )
}

export default LoginStatus
