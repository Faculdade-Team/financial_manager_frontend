import HeaderSingIn from '../Header/HeaderSignIn/HeaderSignIn/HeaderSignIn'
import BodySignIn from './BodySignIn/BodySignIn'
import './SignIn.less'

function SignIn() {
  return (
    <div className="container-sign-in">
      <HeaderSingIn />
      <BodySignIn />
    </div>
  )
}

export default SignIn
