// import { useState } from "react";
import { AiFillStar, AiFillEnvironment, AiOutlineUserAdd } from 'react-icons/ai'

function GamesFilters(props) {
  const { datas, keyword, gamesDifficulty } = props

  //  console.log(datas);
  //  console.log(keyword);
  console.log(gamesDifficulty)

  // Card srar data
  const starlevel = [
    '4.7',
    '4.9',
    '4.3',
    '4.5',
    '3.9',
    '4.1',
    '3.5',
    '3.7',
    '3.1',
    '3.3',
    '3.2',
    '3.0',
    '3.6',
    '3.4',
    '4.0',
    '3.8',
    '4.4',
    '4.2',
    '4.8',
    '4.6',
  ]

  // 純函式-傳入資料陣列，以keyword進行過濾
  const filterByKeyword = (datas, keyword) => {
    return datas.filter((v, i) => {
      return v.gamesName.includes(keyword)
    })
  }

  // ---篩選列表篩選功能區塊---
  const filterByDifficulty = (datas, gamesDifficulty) => {
    switch (gamesDifficulty) {
      case '新手入門':
        return datas.filter((v, i) => {
          return v.difficulty.includes(gamesDifficulty)
        })
      case '中度玩家':
        return datas.filter((v, i) => {
          return v.difficulty.includes(gamesDifficulty)
        })
      case '重度解謎':
        return datas.filter((v, i) => {
          return v.difficulty.includes(gamesDifficulty)
        })
      case '全部難度':
      default:
        return datas
    }
  }

  return (
    <>
      <div className="gamesFilterMain">
        <div className="gamesFilterSection">
          {filterByDifficulty(
            filterByKeyword(datas, keyword),
            gamesDifficulty
          ).map((v, i) => {
            return (
              <div key={v.gamesSid} className="game-item">
                <section>
                  <figure>
                    <img
                      className="games-imgs"
                      src={`/Images/gamesImages/${v.gamesLogo}`}
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
                        <span>
                          {
                            starlevel[
                              Math.floor(((Math.random() * i) % 20) + 1)
                            ]
                          }
                        </span>
                        <span>({Math.floor(Math.random() * i * 10) + 1})</span>
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
      </div>
    </>
  )
}

export default GamesFilters
