import {
  AiFillStar,
  AiFillEnvironment,
  AiOutlineUserAdd,
  AiOutlineDropbox,
} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

function GamesFilters(props) {
  const { usersDisplay, isLoading, handleButtonClick, showButton } = props
  const navigate = useNavigate()

  const loader = (
    <div className="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )

  const gamescontent = (
    <div className="gamesFilterSection">
      {usersDisplay.map((v, i) => {
        return (
          <div key={i} className="game-item">
            <section
              style={{ cursor: 'pointer' }}
              onClick={() => {
                navigate(`/order/${v.gamesSid}`)
              }}
            >
              <figure>
                <img
                  className="games-imgs"
                  src={
                    v.gamesImages.length > 20
                      ? `/Images/uploads/${v.gamesImages}`
                      : `/Images/gamesImages/${v.gamesImages}`
                  }
                  alt={v.gamesName}
                />
                <div className="games-description">
                  <span>{v.difficulty}</span>
                  <span>{v.feature01}</span>
                  <span>{v.feature02}</span>
                </div>
              </figure>
              <article className="games-article">
                <div className="games-article-tagtop">
                  <span className="cardgamesname">{v.gamesName}</span>
                  <span>
                    <span className="gamestaricon">
                      <AiFillStar />
                    </span>
                    <span>{v.level}</span>
                    <span>({v.count})</span>
                  </span>
                </div>
                <div className="games-article-tagbottom">
                  <span>
                    <AiFillEnvironment /> <span>{v.storeCity}</span>
                  </span>
                  <span>
                    <AiOutlineUserAdd />
                    <span>
                      {v.gamesPeopleMin}-{v.gamesPeopleMax}
                    </span>
                  </span>
                  <span>${v.gamesPrice}起</span>
                </div>
              </article>
            </section>
          </div>
        )
      })}
    </div>
  )

  const nogamesfilter = (
    <div className="nogamesfilter">
      <div>
        <AiOutlineDropbox />
      </div>
      <div>沒有相關內容</div>
    </div>
  )

  return (
    <>
      <div className="gamesFilterMainblank"></div>
      <div className="gamesFilterMain">
        {isLoading
          ? loader
          : !!usersDisplay.length
          ? gamescontent
          : nogamesfilter}
        {showButton && (
          <button className="gamesgototop" onClick={handleButtonClick}>
            <img
              src="/Images/gamesHomeImages/back-to-top.jpg"
              alt="placeholder"
            />
          </button>
        )}
      </div>
    </>
  )
}

export default GamesFilters
