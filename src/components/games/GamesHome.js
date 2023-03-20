import React, { useState, useEffect, useMemo } from 'react'

function GamesHome() {
  const [scrollX, setScrollX] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  const imageList = useMemo(
    () => [
      { id: 1, src: '/Images/gamesHomeImages/image1.png' },
      { id: 2, src: '/Images/gamesHomeImages/image2.png' },
      { id: 3, src: '/Images/gamesHomeImages/image3.png' },
      { id: 4, src: '/Images/gamesHomeImages/image4.png' },
      { id: 5, src: '/Images/gamesHomeImages/image5.png' },
      { id: 6, src: '/Images/gamesHomeImages/image6.png' },
    ],
    []
  )

  const [lastScrollTime, setLastScrollTime] = useState(Date.now())

  useEffect(() => {
    const handleScroll = (event) => {
      const { deltaY } = event
      const imageWidth = 430 // 每張圖片的寬度
      const maxScrollX = (imageList.length - 1) * imageWidth // 最大的滾動位置
      const now = Date.now()
      let newScrollX

      // 計算滾動時間差，如果小於一定的值則不進行滾動
      if (now - lastScrollTime < 430) {
        return
      }

      if (deltaY > 0) {
        // 向左滾動
        newScrollX = scrollX - imageWidth
        if (newScrollX < 0) {
          newScrollX = maxScrollX
        }
      } else {
        // 向右滾動
        newScrollX = scrollX + imageWidth
        if (newScrollX > maxScrollX) {
          newScrollX = 0
        }
      }

      setLastScrollTime(now)
      setScrollX(newScrollX)
      setTransitioning(true)
    }

    window.addEventListener('wheel', handleScroll)
    return () => window.removeEventListener('wheel', handleScroll)
  }, [scrollX, imageList, lastScrollTime])

  const handleTransitionEnd = () => {
    setTransitioning(false)
  }

  return (
    <div className="gameshome">
      <div className="container">
        <div className="gameshometitle">本月最推薦</div>

        <div
          className={`gameshomecontent ${transitioning ? 'transitioning' : ''}`}
          onTransitionEnd={handleTransitionEnd}
          style={{ transform: `translateX(-${scrollX}px)` }}
        >
          <img
            key={imageList[imageList.length - 1].id}
            src={imageList[imageList.length - 1].src}
            alt="placeholder"
          />
          {imageList.map((image) => (
            <img key={image.id} src={image.src} alt="placeholder" />
          ))}
          <img key={imageList[0].id} src={imageList[0].src} alt="placeholder" />
        </div>
      </div>
    </div>
  )
}

export default GamesHome
