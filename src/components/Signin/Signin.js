import { SigninRouter, MemberRouter } from './SigninModel'

const Signin = () => {
  return (
    <div className="container mt-5">
      <div className="d-flex flex-nowrap flex-column flex-lg-row row row-cols-lg-3 justify-content-center row-cols-1 my-5">
        {/* <SigninRouter name="會員" nameen="MEMBER" url="member" /> */}
        <MemberRouter name="會員" nameen="MEMBER" />
        <SigninRouter name="工作室" nameen="SHOP KEEPER" url="shop" />
      </div>
    </div>
  )
}

export default Signin
