import GamesFilters from './GamesFilters'
import GamesHome from './GamesHome'
import { useState, useEffect } from 'react'
import { AiOutlineSearch, AiOutlineRollback } from 'react-icons/ai'

import axios from 'axios'

function GamesMainPage() {
  //  -----------------生成參考資料--------------------
  const [starlevel, setStarLevel] = useState([])
  const [starquantity, setStarQuantity] = useState([])
  useEffect(() => {
    const generateData = () => {
      const newStarLevel = []
      const newStarQuantity = []
      for (let i = 0; i < 200; i++) {
        const randNum = Math.random() * (4.9 - 3.1) + 3.1
        newStarLevel.push(Number(randNum.toFixed(1)))
        newStarQuantity.push(Number(cardStarQuantity(i)))
      }
      setStarLevel(newStarLevel)
      setStarQuantity(newStarQuantity)
    }

    const cardStarQuantity = (i) => {
      return Math.floor(Math.random() * i * 10) + 1
    }

    generateData()
  }, [])

  // 從伺服器得到資料記錄用
  const [datas, setDatas] = useState([])

  // 呈現用
  const [usersDisplay, setUsersDisplay] = useState([])

  // 元件控制區塊
  const [showGamesHome, setShowGamesHome] = useState(true)
  const [showGamesFilter, setShowGamesFilter] = useState(false)

  //---功能狀態區塊---
  // 搜尋欄文字狀態
  const [inputText, setInputText] = useState('')
  // 搜尋欄確認狀態 用於過濾
  const [keyword, setKeyword] = useState('')
  // 搜尋欄狀態確認狀態
  const [buttonFilter, setButtonFilter] = useState('false')
  // 下拉式城市狀態
  const [selectedCityValue, setSlectedCityValue] = useState('')
  // 下拉式人數狀態
  const [selectedPeopleValue, setSlectedPeopleValue] = useState(0)
  // 進階按鈕狀態
  const [isActiveFilterBlock, setActiveFilterBlock] = useState('false')

  //---篩選列表狀態區塊---
  const [gamesDifficulty, setGamesDifficultye] = useState('全部難度')
  const [gamesFeature, setGamesFeature] = useState('全部類型')
  const [gamesPrice, setGamesPrice] = useState(800)
  const [gamesTime, setGamesTime] = useState('全部時間')
  const [gamesSort, setGamesSort] = useState('密室逃脫')
  const [gamesOrder, setGamesOrder] = useState('評價分數')
  const [gamesOrderStata, setGamesOrderStata] = useState(1)
  // ---載入中---
  const [isLoading, setIsLoading] = useState(true)

  //向伺服器用get獲取資料
  const getDatas = async () => {
    const res = await axios.get('/data/games.json')
    console.log(res.data)
    setDatas(res.data)
  }

  // ----篩選列表功能區塊---

  // 排序篩選功能
  const filterByKeyword = (newDatas, keyword) => {
    if (!!keyword) {
      return newDatas.filter((v, i) => {
        return v.gamesName.includes(keyword)
      })
    } else {
      return newDatas
    }
  }

  const filterByCity = (newDatas, selectedCityValue) => {
    if (selectedCityValue !== '請選擇城市') {
      return newDatas.filter((v, i) => {
        return v.storeCity.includes(selectedCityValue)
      })
    } else {
      return newDatas
    }
  }

  const gamesPeople = Number(selectedPeopleValue)
  const filterByPeople = (newDatas, gamesPeople) => {
    if (gamesPeople !== 0) {
      return newDatas.filter((v, i) => {
        return (
          v.gamesPeopleMin <= gamesPeople && v.gamesPeopleMax >= gamesPeople
        )
      })
    } else {
      return newDatas
    }
  }

  const sortByType = (datas, type) => {
    switch (type) {
      case 0:
        return [...datas].sort((a, b) => b.ratequantity - a.ratequantity)

      // 由大至小 => type=1 (預設)
      case 1:
        return [...datas].sort((a, b) => b.ratelevel - a.ratelevel)

      case 2:
        return [...datas].sort((a, b) => a.gamesPrice - b.gamesPrice)

      default:
        return [...datas].sort((a, b) => b.ratelevel - a.ratelevel)
    }
  }

  const filterByDifficulty = (newDatas, gamesDifficulty) => {
    if (gamesDifficulty !== '全部難度') {
      return newDatas.filter((v, i) => {
        return v.difficulty.includes(gamesDifficulty)
      })
    } else {
      return newDatas
    }
  }

  const filterByFeature = (newDatas, gamesFeature) => {
    if (gamesFeature !== '全部類型') {
      return newDatas.filter((v, i) => {
        return (
          v.feature01.includes(gamesFeature) ||
          v.feature02.includes(gamesFeature)
        )
      })
    } else {
      return newDatas
    }
  }

  const filterByPrice = (newDatas, gamesPrice) => {
    if (gamesPrice !== 800) {
      return newDatas.filter((v, i) => {
        return v.gamesPrice <= gamesPrice
      })
    } else {
      return newDatas
    }
  }

  const filterByTime = (newDatas, gamesTime) => {
    if (gamesTime !== '全部時間') {
      return newDatas.filter((v, i) => {
        return v.Time.includes(gamesTime)
      })
    } else {
      return newDatas
    }
  }

  const filterBySort = (newDatas, gamesSort) => {
    if (gamesSort !== '全部玩法') {
      return newDatas.filter((v, i) => {
        return v.Sort.includes(gamesSort)
      })
    } else {
      return newDatas
    }
  }

  // didMount (After first render，初次render之後執行一次)
  useEffect(() => {
    getDatas()
  }, [])

  // ---新增兩筆屬性資料---
  datas.forEach((v, i) => {
    v.ratelevel = starlevel[i]
    v.ratequantity = starquantity[i]
  })

  // 呈現用狀態管理
  useEffect(() => {
    let newdatas = sortByType(datas, gamesOrderStata)
    newdatas = filterByKeyword(newdatas, keyword)
    newdatas = filterByCity(newdatas, selectedCityValue)
    newdatas = filterByPeople(newdatas, gamesPeople)
    newdatas = filterByDifficulty(newdatas, gamesDifficulty)
    newdatas = filterByFeature(newdatas, gamesFeature)
    newdatas = filterByPrice(newdatas, gamesPrice)
    newdatas = filterByTime(newdatas, gamesTime)
    newdatas = filterBySort(newdatas, gamesSort)
    setUsersDisplay(newdatas)
  }, [
    datas,
    gamesOrderStata,
    keyword,
    selectedCityValue,
    gamesPeople,
    gamesDifficulty,
    gamesFeature,
    gamesPrice,
    gamesTime,
    gamesSort,
  ])

  // 載入動畫設定持續時間
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false)
      }, 350)
    }
  }, [isLoading])

  // 載入動畫狀態管理
  useEffect(() => {
    setIsLoading(true)
  }, [
    keyword,
    buttonFilter,
    selectedCityValue,
    selectedPeopleValue,
    gamesDifficulty,
    gamesFeature,
    gamesPrice,
    gamesTime,
    gamesSort,
    gamesOrder,
  ])

  // 搜尋bar 文字資料
  const handleinputText = (e) => {
    setInputText(e.target.value)
    // 如果使用者清除所有輸入時要恢復原本列表
    if (e.target.value === '') {
      setKeyword('')
    }
  }

  // 搜尋bar功能Enter建
  const handleEnterSearch = (e) => {
    if (e.key === 'Enter') {
      setShowGamesHome(false)
      setShowGamesFilter(true)
      setKeyword(inputText)
    }
  }

  // 搜尋bar 點擊button功能
  const handlekeyword = () => {
    setShowGamesHome(false)
    setShowGamesFilter(true)
    setKeyword(inputText)
    // 搜尋欄按鈕狀態
    setButtonFilter(!buttonFilter)
  }

  // 下拉式city功能
  const handleSelectedCity = (e) => {
    setShowGamesHome(false)
    setShowGamesFilter(true)
    setSlectedCityValue(e.target.value)
  }

  // 下拉式人數功能
  const handleSelectedPeople = (e) => {
    setShowGamesHome(false)
    setShowGamesFilter(true)
    setSlectedPeopleValue(e.target.value)
  }

  // 返回遊戲主頁按鈕
  const handleRolBack = () => {
    setShowGamesHome(true)
    setShowGamesFilter(false)
  }

  // 進階篩選按鈕功能
  const handleToggleFilterBlock = () => {
    setActiveFilterBlock(!isActiveFilterBlock)
  }

  //---篩選列表區塊---
  const myGamesDifficulty = (value) => {
    setGamesDifficultye(value)
  }
  const myGamesFeature = (value) => {
    setGamesFeature(value)
  }
  const myGamesPrice = (value) => {
    setGamesPrice(value)
  }
  const myGamesTime = (value) => {
    setGamesTime(value)
  }
  const myGamesSort = (value) => {
    setGamesSort(value)
  }
  const myGamesOrder = (value) => {
    setGamesOrder(value)
  }

  // Database資料庫
  const cities = [
    { label: '台北市', value: '台北市' },
    { label: '新北市', value: '新北市' },
    { label: '桃園市', value: '桃園市' },
    { label: '新竹市', value: '新竹市' },
    { label: '台中市', value: '台中市' },
    { label: '高雄市', value: '高雄市' },
  ]

  const people = [
    { label: '2人', value: 2 },
    { label: '3人', value: 3 },
    { label: '4人', value: 4 },
    { label: '5人', value: 5 },
    { label: '6人', value: 6 },
    { label: '7人', value: 7 },
    { label: '8人', value: 8 },
    { label: '9人', value: 9 },
    { label: '10人', value: 10 },
  ]

  const difficulty = ['全部難度', '新手入門', '中度玩家', '重度解謎']
  const feature = [
    '全部類型',
    '偵探推理',
    '機關重重',
    '劇情厲害',
    '場景逼真',
    '互動操作',
    '謎題邏輯',
    '輕鬆歡樂',
    '恐怖驚悚',
    '緊張刺激',
    '勾心鬥角',
    '團隊合作',
    '親子同遊',
    '玩法特別',
    '角色扮演',
  ]
  const price = [800, 700, 600, 500, 400, 300]
  const time = ['全部時間', '30', '60', '90', '120']
  const sort = ['全部玩法', '密室逃脫', '劇本殺', '時境解謎']
  const order = ['評價數量', '評價分數', '遊戲金額']

  return (
    <div className="gamesMain">
      <div className="gamesNavbar">
        {/* 搜尋欄位 */}
        <div className="gamesSearch gamesInputStyle">
          <input
            className="inputSearch gamesNone"
            type="text"
            placeholder="請輸入遊戲名稱"
            value={inputText}
            onChange={handleinputText}
            onKeyDown={handleEnterSearch}
          />

          {/* 搜尋欄位按鈕 */}
          <button className="buttonSearch gamesNone" onClick={handlekeyword}>
            <span>|</span>
            <span>
              <AiOutlineSearch />
            </span>
          </button>
        </div>

        {/* 下拉式city功能 */}
        <select
          className="selectedCity gamesInputStyle"
          value={selectedCityValue}
          onChange={handleSelectedCity}
        >
          <option>請選擇城市</option>
          {cities.map((v, i) => {
            return (
              <option key={i} value={v.value}>
                {v.label}
              </option>
            )
          })}
        </select>

        {/* 下拉式人數功能 */}
        <select
          className="selectedPeople gamesInputStyle"
          value={selectedPeopleValue}
          onChange={handleSelectedPeople}
        >
          <option value={0}>不限</option>
          {people.map((v, i) => {
            return (
              <option key={i} value={v.value}>
                {v.label}
              </option>
            )
          })}
        </select>

        {/* 進階篩選按鈕 */}
        <button
          className={
            showGamesFilter
              ? 'buttonFilterMore gamesInputStyle'
              : 'buttonFilterMoreoff'
          }
          onClick={handleToggleFilterBlock}
        >
          進階篩選
        </button>

        {/* 返回遊戲主頁按鈕 */}
        <button
          className={showGamesFilter ? 'rolBack gamesInputStyle' : 'rolBackoff'}
          type="button"
          onClick={handleRolBack}
        >
          <div>
            <AiOutlineRollback />
          </div>
        </button>

        {/* 進階篩選區塊 */}
        <section
          className={isActiveFilterBlock ? 'filterBlockoff' : 'filterBlock'}
        >
          <div
            className={
              showGamesFilter ? 'filterBlockSecond' : 'filterBlockSecondoff'
            }
          >
            <div className="filterBtnMain">
              <div className="filterBtnFirst">
                <p>難度</p>
              </div>
              <ul>
                {difficulty.map((v, i) => {
                  return (
                    <li
                      key={i}
                      className={
                        gamesDifficulty === difficulty[i]
                          ? 'filterBtnClock'
                          : 'filterBtn'
                      }
                      onClick={() => {
                        myGamesDifficulty(v)
                        // setGamesDifficultyeFilter(v);
                      }}
                    >
                      {v}
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="filterBtnMain">
              <div className="filterBtnFirst">
                <p>類型</p>
              </div>
              <ul>
                {feature.map((v, i) => {
                  return (
                    <li
                      key={i}
                      className={
                        gamesFeature === feature[i]
                          ? 'filterBtnClock'
                          : 'filterBtn'
                      }
                      onClick={() => {
                        myGamesFeature(v)
                      }}
                    >
                      {v}
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="filterBtnMain">
              <div className="filterBtnFirst">
                <p>金額</p>
              </div>
              <ul>
                {price.map((v, i) => {
                  return (
                    <li
                      key={i}
                      className={
                        gamesPrice === price[i] ? 'filterBtnClock' : 'filterBtn'
                      }
                      onClick={() => {
                        myGamesPrice(v)
                      }}
                    >
                      {v}↓
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="filterBtnMain">
              <div className="filterBtnFirst">
                <p>時間</p>
              </div>
              <ul>
                {time.map((v, i) => {
                  return (
                    <li
                      key={i}
                      className={
                        gamesTime === time[i] ? 'filterBtnClock' : 'filterBtn'
                      }
                      onClick={() => {
                        myGamesTime(v)
                      }}
                    >
                      {v}
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="filterBtnMain">
              <div className="filterBtnFirst">
                <p>其他</p>
              </div>
              <ul>
                {sort.map((v, i) => {
                  return (
                    <li
                      key={i}
                      className={
                        gamesSort === sort[i] ? 'filterBtnClock' : 'filterBtn'
                      }
                      onClick={() => {
                        myGamesSort(v)
                      }}
                    >
                      {v}
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="filterBtnMain">
              <div className="filterBtnFirst">
                <p>排列</p>
              </div>
              <ul>
                {order.map((v, i) => {
                  return (
                    <li
                      key={i}
                      className={
                        gamesOrder === order[i] ? 'filterBtnClock' : 'filterBtn'
                      }
                      onClick={() => {
                        myGamesOrder(v)
                        setGamesOrderStata(i)
                      }}
                    >
                      {v}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </section>
      </div>

      {showGamesHome ? <GamesHome /> : null}
      {showGamesFilter ? (
        <GamesFilters usersDisplay={usersDisplay} isLoading={isLoading} />
      ) : null}
    </div>
  )
}

export default GamesMainPage
