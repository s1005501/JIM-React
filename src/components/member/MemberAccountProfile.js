import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
// import './../../style/JIM_Account_profile.css'
// import './../../style/JIM_Account_profile_modal.css'
import { ACCOUNT } from '../../config/api_config'
import { FaArrowCircleRight } from 'react-icons/fa'
import { FaRegEdit } from 'react-icons/fa'
import MemberAuthContext from './MemberAuthContext'
import axios from 'axios'
import MemberPasswordModal from './MemberPasswordModal'
import MemberNameModal from './MemberNameModal'
import MemberEmailModal from './MemberEmailModal'
import MemberMobileModal from './MemberMobileModal'
import MemberNickNameModal from './MemberNickNameModal'
import moment from 'moment/moment'
import { useContextValue } from '../../ContextDashbard'

function MemberAccountProfile() {
  const { render, setRender } = useContextValue()
  const { getProfileData, memberAuthState } = useContext(MemberAuthContext)
  const navigate = useNavigate()
  const [profileData, setProfileData] = useState({
    memAccount: '',
    memPassword: '',
    memName: '',
    memEmail: '',
    memMobile: '',
    memNickName: '',
    memGender: '',
    memBirth: '',
    memIdentity: '',
    memLevel: '',
    memHeadshot: '',
  })

  // profile照片上傳的func
  const memberProfileUpload = async () => {
    try {
      axios.defaults.withCredentials = true
      const fd = new FormData(document.imgUpload)

      const response = await axios.post(
        ACCOUNT + '/upload/' + memberAuthState.membersid,
        fd,
        {
          headers: {
            Authorization: 'Bearer ' + memberAuthState.memberToken,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      console.log(response.data)
      setRender(!render)
      getProfileData(ACCOUNT, setProfileData)
    } catch (ex) {}
  }

  // 第一次讀取刷新頁面
  useEffect(() => {
    getProfileData(ACCOUNT, setProfileData)
  }, [])

  const [profileUpdate, setProfileUpdate] = useState({
    memberPassword: false,
    memberName: false,
    memberEmail: false,
    memberMobile: false,
    memberNickName: false,
  })
  const [imgFiles, setImgFiles] = useState('')
  // useEffect(() => {
  //   // document.forms['imgUpload'].submit()
  // }, [imgFiles])
  // TODO modal變不見的時候沒有fade的效果(出現有是套件預設的)
  return (
    <>
      <main className="m-memberAccountMain">
        <aside className="memberAside">
          <div
            className="m-asideItem"
            onClick={() => {
              navigate('/member/order')
            }}
          >
            <p>訂單紀錄</p>
            <FaArrowCircleRight className="m-rightArrowIcon" />
          </div>
          <div
            className="m-asideItem"
            onClick={() => {
              navigate('/member/comment')
            }}
          >
            <p>評論紀錄</p>
            <FaArrowCircleRight className="m-rightArrowIcon" />
          </div>
          <div
            className="m-asideItem"
            onClick={() => {
              navigate('/member/like')
            }}
          >
            <p>收藏</p>
            <FaArrowCircleRight className="m-rightArrowIcon" />
          </div>
          <div className="m-asideItem">
            <p>個人資料</p>
            <FaArrowCircleRight
              className="m-rightArrowIcon"
              onClick={() => {
                navigate('/member')
              }}
            />
          </div>
          <div
            className="m-asideItem"
            onClick={() => {
              navigate('/member/level')
            }}
          >
            <p>會員等級</p>
            <FaArrowCircleRight
              className="m-rightArrowIcon"
              onClick={() => {
                navigate('/member/level')
              }}
            />
          </div>
        </aside>
        <div className="container">
          <div className="row">
            <div className="m-memberAccountDiv">
              <h1>會員中心</h1>
            </div>
            <div className="col m-profileMainContext">
              <h1>個人資料</h1>
              <div>
                <div className="m-profileHeadShot">
                  <img
                    src={`/Images/uploads/${profileData.memHeadshot}`}
                    alt=""
                    className="m-profileImg"
                  />
                  <form id="imgUpload" name="imgUpload">
                    <input
                      type="file"
                      name="profileUpload"
                      id="profileUpload"
                      hidden
                      onChange={(e) => {
                        if (e.target.files.length) {
                          memberProfileUpload()
                        }
                      }}
                    />
                    <button
                      className="btn"
                      onClick={async (e) => {
                        e.preventDefault()
                        const profileUpload =
                          document.querySelector('#profileUpload')
                        await profileUpload.click()
                      }}
                    >
                      選擇/上傳大頭貼
                    </button>
                  </form>
                </div>
                <div className="m-profileInfo">
                  <div>
                    <div className="m-profileAccount">
                      <p>會員帳號 :</p>
                      <div>{profileData.memAccount}</div>
                    </div>
                    <div className="m-profilePassword">
                      <div>
                        <p>會員密碼 :</p>
                        <div>{profileData.memPassword}</div>
                      </div>

                      <FaRegEdit
                        className="m-profileEditIcon"
                        onClick={() => {
                          setProfileUpdate({
                            ...profileUpdate,
                            memberPassword: !profileUpdate.memberPassword,
                          })
                        }}
                      />

                      {profileUpdate.memberPassword ? (
                        <MemberPasswordModal
                          profileUpdate={profileUpdate}
                          setProfileUpdate={setProfileUpdate}
                          profileData={profileData}
                          memberAuthState={memberAuthState}
                          setProfileData={setProfileData}
                          getProfileData={getProfileData}
                        />
                      ) : (
                        ''
                      )}
                    </div>

                    <div className="m-profileRealName">
                      <div>
                        <p>會員姓名 :</p>
                        <div>{profileData.memName}</div>
                      </div>
                      <FaRegEdit
                        className="m-profileEditIcon"
                        onClick={() => {
                          setProfileUpdate({
                            ...profileUpdate,
                            memberName: !profileUpdate.memberName,
                          })
                        }}
                      />

                      {profileUpdate.memberName ? (
                        <MemberNameModal
                          profileUpdate={profileUpdate}
                          setProfileUpdate={setProfileUpdate}
                          profileData={profileData}
                          memberAuthState={memberAuthState}
                          setProfileData={setProfileData}
                          getProfileData={getProfileData}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="m-profileEmail">
                      <div>
                        <p>會員信箱 :</p>
                        <div>{profileData.memEmail}</div>
                      </div>
                      <FaRegEdit
                        className="m-profileEditIcon"
                        onClick={() => {
                          setProfileUpdate({
                            ...profileUpdate,
                            memberEmail: !profileUpdate.memberEmail,
                          })
                        }}
                      />

                      {profileUpdate.memberEmail ? (
                        <MemberEmailModal
                          profileUpdate={profileUpdate}
                          setProfileUpdate={setProfileUpdate}
                          profileData={profileData}
                          memberAuthState={memberAuthState}
                          setProfileData={setProfileData}
                          getProfileData={getProfileData}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="m-profileMobile">
                      <div>
                        <p>會員手機 :</p>
                        <div>{profileData.memMobile}</div>
                      </div>
                      <FaRegEdit
                        className="m-profileEditIcon"
                        onClick={() => {
                          setProfileUpdate({
                            ...profileUpdate,
                            memberMobile: !profileUpdate.memberMobile,
                          })
                        }}
                      />

                      {profileUpdate.memberMobile ? (
                        <MemberMobileModal
                          profileUpdate={profileUpdate}
                          setProfileUpdate={setProfileUpdate}
                          profileData={profileData}
                          memberAuthState={memberAuthState}
                          setProfileData={setProfileData}
                          getProfileData={getProfileData}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="m-profileNickName">
                      <div>
                        <p>會員暱稱 :</p>
                        <div>{profileData.memNickName}</div>
                      </div>
                      <FaRegEdit
                        className="m-profileEditIcon"
                        onClick={() => {
                          setProfileUpdate({
                            ...profileUpdate,
                            memberNickName: !profileUpdate.memberNickName,
                          })
                        }}
                      />

                      {profileUpdate.memberNickName ? (
                        <MemberNickNameModal
                          profileUpdate={profileUpdate}
                          setProfileUpdate={setProfileUpdate}
                          profileData={profileData}
                          memberAuthState={memberAuthState}
                          setProfileData={setProfileData}
                          getProfileData={getProfileData}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="m-profileGender">
                      <p>會員性別 :</p>
                      <div>{profileData.memGender}</div>
                    </div>
                    <div className="m-profileBirth">
                      <p>會員生日 :</p>
                      <div>
                        {moment(profileData.memBirth).format('YYYY-MM-DD')}
                      </div>
                    </div>
                    <div className="m-profileIdentity">
                      <p>會員身分證字號 :</p>
                      <div>{profileData.memIdentity}</div>
                    </div>
                    <div className="m-profileLevel">
                      <p>會員等級 :</p>
                      <div>{profileData.memLevel}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default MemberAccountProfile
