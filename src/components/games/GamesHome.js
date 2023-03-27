import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function GamesHome() {
  const navigate = useNavigate()
  // const { usersDisplay } = props
  const [currentSlide, setCurrentSlide] = useState(0)

  const slideImages = [
    {
      id: 22,
      src: '/Images/gamesHomeImages/imagebig1.png',
      alt: 'placeholder',
    },
    {
      id: 197,
      src: '/Images/gamesHomeImages/imagebig2.png',
      alt: 'placeholder',
    },
    {
      id: 5,
      src: '/Images/gamesHomeImages/imagebig3.png',
      alt: 'placeholder',
    },
    {
      id: 7,
      src: '/Images/gamesHomeImages/imagebig4.png',
      alt: 'placeholder',
    },
    {
      id: 27,
      src: '/Images/gamesHomeImages/imagebig5.png',
      alt: 'placeholder',
    },
    {
      id: 6,
      src: '/Images/gamesHomeImages/imagebig6.png',
      alt: 'placeholder',
    },
  ]

  function handleNextBtnClick() {
    setCurrentSlide((currentSlide + 1) % slideImages.length)
  }

  function handlePrevBtnClick() {
    setCurrentSlide(
      (currentSlide - 1 + slideImages.length) % slideImages.length
    )
  }

  function handleImgClick(index) {
    setCurrentSlide(index)
  }

  // 滾輪式遊戲列表
  const [scrollX, setScrollX] = useState(0)
  const [lastScrollTime, setLastScrollTime] = useState(Date.now())
  // 滾輪式遊戲列表
  useEffect(() => {
    const handleScroll = (event) => {
      const { deltaY } = event
      const imageWidth = 180 // 每張圖片的寬度
      const maxScrollX = 6 * imageWidth // 最大的滾動位置
      const now = Date.now()
      let newScrollX

      // 計算滾動時間差，如果小於一定的值則不進行滾動
      if (now - lastScrollTime < 200) {
        return
      }

      if (deltaY > 0) {
        // 向右滾動
        newScrollX = scrollX + imageWidth
        if (newScrollX > maxScrollX) {
          newScrollX = 0
        }
      } else {
        // 向左滾動
        newScrollX = scrollX - imageWidth
        if (newScrollX < 0) {
          newScrollX = maxScrollX
        }
      }

      setLastScrollTime(now)
      setScrollX(newScrollX)
      // setTransitioning(true)
    }

    window.addEventListener('wheel', handleScroll)
    return () => window.removeEventListener('wheel', handleScroll)
  }, [scrollX, lastScrollTime])

  return (
    <div className="gameshome">
      <div className="gamesslider">
        <div
          className="gamesslides"
          style={{
            transform: `translateX(-${
              (currentSlide * 100) / slideImages.length
            }%)`,
          }}
        >
          {slideImages.map((image, i) => (
            <div className="slideImagesMain">
              <div className={`slidebackgroundimage${i}`}>
                <img
                  key={i}
                  src={image.src}
                  alt={image.alt}
                  onClick={() => {
                    navigate(`/order/${image.id}`)
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          className="gamescarouselbutton gamescarouseprev"
          onClick={handlePrevBtnClick}
        >
          &#10094;
        </button>
        <button
          className="gamescarouselbutton gamescarousenext"
          onClick={handleNextBtnClick}
        >
          &#10095;
        </button>
        // <div className="gameslidertextcontent"></div>
      </div>
      <div className="container">
        <div
          className="gameshomecontent"
          style={{ transform: `translateX(-${scrollX}px)` }}
        >
          <img
            src="/Images/gamesHomeImages/image1.png"
            alt="placeholder"
            onClick={() => handleImgClick(0)}
          />
          <img
            src="/Images/gamesHomeImages/image2.png"
            alt="placeholder"
            onClick={() => handleImgClick(1)}
          />
          <img
            src="/Images/gamesHomeImages/image3.png"
            alt="placeholder"
            onClick={() => handleImgClick(2)}
          />
          <img
            src="/Images/gamesHomeImages/image4.png"
            alt="placeholder"
            onClick={() => handleImgClick(3)}
          />
          <img
            src="/Images/gamesHomeImages/image5.png"
            alt="placeholder"
            onClick={() => handleImgClick(4)}
          />
          <img
            src="/Images/gamesHomeImages/image6.png"
            alt="placeholder"
            onClick={() => handleImgClick(5)}
          />
          <img
            src="/Images/gamesHomeImages/image1.png"
            alt="placeholder"
            onClick={() => handleImgClick(0)}
          />
          <img
            src="/Images/gamesHomeImages/image2.png"
            alt="placeholder"
            onClick={() => handleImgClick(1)}
          />
        </div>
      </div>
    </div>
  )
}

export default GamesHome
