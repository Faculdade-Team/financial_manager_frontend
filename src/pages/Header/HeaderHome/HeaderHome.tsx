import { Pressable } from '../../../components/Pressable'
import './HeaderHome.less'
import { UserOutlined, BellOutlined } from '@ant-design/icons'

function HeaderHome() {
  return (
    <div className="header-home">
      <h4 className="header-home__title">Bem Vindo Marcus</h4>
      <div className="header-home__icons">
        <Pressable className="header-home__icons--icon">
          <BellOutlined />
        </Pressable>
        <Pressable className="header-home__icons--icon">
          <UserOutlined />
        </Pressable>
      </div>
    </div>
  )
}

export default HeaderHome
