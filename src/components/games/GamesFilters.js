import {
  AiFillStar,
  AiFillEnvironment,
  AiOutlineUserAdd,
} from "react-icons/ai";

function GamesFilters(props) {
  const {usersDisplay, isLoading} = props;


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
  );

  const gamescontent = (
    <div className="gamesFilterSection">
      {usersDisplay.map((v, i) => {
        return (
          <div key={v.gamesSid} className="game-item">
            <section>
              <figure>
                <img
                  className="games-imgs"
                  src={`/Images/gamesImages/${v.gamesImages}`}
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
                    <span>{v.ratelevel}</span>
                    <span>({v.ratequantity})</span>
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
        );
      })}
    </div>
  );

  return (
    <>
      <div className="gamesFilterMain">{isLoading ? loader : gamescontent}</div>
    </>
  );
}

export default GamesFilters;
