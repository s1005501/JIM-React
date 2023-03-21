import React, { useEffect, useReducer, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../style/FisrtPage/style.css'

const InputHandler = (e, action, setCurrentKey) => {
  let keys = []
  if (action === 'keydown') {
    if (
      (e.key === 'a' || e.key === 'd' || e.key === 'Shift' || e.key === 'w') &&
      keys.indexOf(e.key) === -1
    ) {
      keys.push(e.key)
    }
  } else {
    if (e.key === 'a' || e.key === 'd' || e.key === 'Shift' || e.key === 'w') {
      keys.splice(keys.indexOf(e.key), 1)
    }
  }

  setCurrentKey(keys)
}

const backgroundParams = (gameWidth, gameHeight, image, backgroundX, speed) => {
  return {
    gameWidth,
    gameHeight,
    image,
    x: backgroundX,
    y: 0,
    width: 12000,
    height: 960,
    speed: speed,
  }
}

const drawBackground = ({ image, width, height, x, y }, ctx) => {
  ctx.drawImage(image, x, y, width, height)
  ctx.drawImage(image, x + width, y, width, height)
}

const updateBackground = ({ x, speed, width }, setBackgroundX) => {
  x -= speed
  if (x < 0 - width) x = 0
  if (x > 0) return
  setBackgroundX(x)
}

const playerParams = (
  gameWidth,
  gameHeight,
  playerImg,
  speed,
  frameX,
  frameY,
  maxFrame,
  y,
  volecity,
  x
) => {
  return {
    gameWidth,
    gameHeight,
    width: 600,
    height: 495,
    playerImg,
    x: x,
    y: y,
    frameX: frameX,
    frameY: frameY,
    speed: speed,
    volecity: volecity,
    gravity: 1,
    maxFrame: maxFrame,
    fps: 20,
    frameTimer: 100,
    framInterval: 1000 / 20,
  }
}

const drawPlayer = (
  { playerImg, frameX, width, frameY, height, x, y },
  ctx
) => {
  ctx.drawImage(
    playerImg,
    frameX * width,
    frameY * height - 50,
    width,
    height,
    x,
    y,
    width,
    height
  )
}
const updatePlayerPosition = (
  {
    frameX,
    width,
    frameY,
    height,
    x,
    y,
    frameTimer,
    framInterval,
    maxFrame,
    speed,
    gameWidth,
    gameHeight,
    volecity,
    gravity,
  },
  deltaTime,
  currentKey,
  setSpeed,
  setFrameX,
  setFrameY,
  setMaxFrame,
  setY,
  setVolecity,
  setX,
  backgroundX,
  setIsOpen,
  box1,
  setBox1,
  box2,
  setBox2,
  box3,
  setBox3,
  box4,
  setBox4,
  setBoxTrigger,
  navigate,
  gameOver,
  setGameOver
) => {
  // console.log(box1)
  if (backgroundX <= -2240 && backgroundX >= -2241 && !box1) {
    setBox1(!box1)
    setIsOpen(true)
    setBoxTrigger(0)
  }
  if (backgroundX <= -4600 && backgroundX >= -4601 && !box2) {
    setBox2(!box2)
    setIsOpen(true)
    setBoxTrigger(1)
  }
  if (backgroundX <= -7400 && backgroundX >= -7401 && !box3) {
    setBox3(!box3)
    setIsOpen(true)
    setBoxTrigger(2)
  }
  if (backgroundX <= -9900 && backgroundX >= -9901 && !box4) {
    setBox4(!box4)
    setIsOpen(true)
    setBoxTrigger(3)
  }

  if (gameOver === true) {
    navigate('gameover')
  }
  const OnGround = () => {
    return y >= gameHeight - height
  }
  if (frameTimer > framInterval) {
    if (frameX >= maxFrame) {
      frameX = 0
    } else {
      frameX++
    }
    frameTimer = 0
  } else {
    frameTimer += deltaTime
  }

  x += speed
  if (currentKey.indexOf('d') > -1) {
    speed = 20
    maxFrame = 3
    frameY = 1
  } else if (currentKey.indexOf('a') > -1) {
    speed = -20
    maxFrame = 3
    frameY = 2
  } else if (currentKey.indexOf('w') > -1 && OnGround()) {
    volecity -= 20
  } else {
    speed = 0
    maxFrame = 7
    frameY = 0
  }
  y += volecity
  if (!OnGround()) {
    volecity += gravity
    maxFrame = 0
    frameY = 3
  } else {
    volecity = 0
  }
  if (y > gameHeight - height) y = gameHeight - height
  if (x < 0) x = 0
  else if (x > gameWidth - width - 700) x = gameWidth - width - 700
  setVolecity(volecity)
  setX(x)
  setY(y)
  setMaxFrame(maxFrame)
  setFrameX(frameX)
  // setTimeout(()=>{
  //   setFrameX(frameX)
  // },200)
  setFrameY(frameY)
  setSpeed(speed)
}

const Movement = ({ setIsOpen, setBoxTrigger, gameOver, setGameOver }) => {
  const canvas = useRef(null)
  const player = useRef(null)
  const image = useRef(null)
  const [currentKey, setCurrentKey] = useState([])
  //bg
  const [backgroundX, setBackgroundX] = useState(-1000)
  const [speed, setSpeed] = useState(0)
  //player
  const [frameX, setFrameX] = useState(0)
  const [frameY, setFrameY] = useState(1)
  const [maxFrame, setMaxFrame] = useState(3)
  const [x, setX] = useState(0)
  const [y, setY] = useState(960 - 495)
  const [volecity, setVolecity] = useState(0)
  //
  const [box1, setBox1] = useState(false)
  const [box2, setBox2] = useState(false)
  const [box3, setBox3] = useState(false)
  const [box4, setBox4] = useState(false)

  const navigate = useNavigate()
  useEffect(() => {
    window.addEventListener(
      'load',
      () => {
        window.addEventListener(
          'keydown',
          (e) => {
            InputHandler(e, 'keydown', setCurrentKey)
          },
          false
        )
        window.addEventListener(
          'keyup',
          (e) => {
            InputHandler(e, 'keyup', setCurrentKey)
          },
          false
        )
      },
      false
    )
  }, [])
  useEffect(() => {
    const animate = (timeStamp) => {
      const ctx = canvas.current.getContext('2d')
      canvas.current.width = 1920
      canvas.current.height = 960

      let lastTime = 0
      lastTime = timeStamp
      const deltaTime = timeStamp - lastTime

      const backgroundparams = backgroundParams(
        canvas.current.width,
        canvas.current.height,
        image.current,
        backgroundX,
        speed
      )
      // ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
      drawBackground(backgroundparams, ctx)
      updateBackground(backgroundparams, setBackgroundX)
      const playerparams = playerParams(
        canvas.current.width,
        canvas.current.height,
        player.current,
        speed,
        frameX,
        frameY,
        maxFrame,
        y,
        volecity,
        x
      )
      drawPlayer(playerparams, ctx)
      updatePlayerPosition(
        playerparams,
        deltaTime,
        currentKey,
        setSpeed,
        setFrameX,
        setFrameY,
        setMaxFrame,
        setY,
        setVolecity,
        setX,
        backgroundX,
        setIsOpen,
        box1,
        setBox1,
        box2,
        setBox2,
        box3,
        setBox3,
        box4,
        setBox4,
        setBoxTrigger,
        navigate,
        gameOver,
        setGameOver
      )
      // requestAnimationFrame(animate)
    }
    // animate(0)
    window.addEventListener(
      'load',
      () => {
        animate(0)
      },
      false
    )
    const id = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(id)
    // return () => window.removeEventListener('load', animate)
  }, [currentKey, backgroundX, speed, frameY, maxFrame, x, y, volecity])
  return (
    <>
      <canvas id="canvas1" ref={canvas}></canvas>
      <img id="playerImg" src="./images/first_page/cat.png" ref={player} />
      <img
        id="backgroundImg"
        src="./images/first_page/tree_box.png"
        ref={image}
      />
    </>
  )
}

export default Movement
