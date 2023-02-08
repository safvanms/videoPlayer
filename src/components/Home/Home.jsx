import React, { useRef, useState } from 'react'
import './Home.css'
import { FaPlay } from 'react-icons/fa'
import { FaPause } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'

export default function Home() {
  const [play, setPlay] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [src, setSrc] = useState('')
  const [resolution, setResolution] = useState('1080p')

  const videoRef = useRef(null)

  function handleSrc(e) {
    setSrc(e.target.value)
  }

  console.log(src)

  function handlePlay(e) {
    e.preventDefault()
    setIsDisabled(true)
    setPlay(true)
    videoRef.current.play()
  }

  function playerControl() {
    setPlay((prevPlay) => !prevPlay)
    if (play === true) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
  }

  const handleResolutionChange = () => {
    if (resolution === '1080p') {
      setResolution('720p')
      videoRef.current.src = src.replace('1080p', '720p')
      videoRef.current.load()
    } else if (resolution === '720p') {
      setResolution('1080p')
      videoRef.current.src = src.replace('720p', '1080p')
      videoRef.current.load()
    }
  }

  const extension = src.split('.').pop()

  const typeMap = {
    mp4: 'video/mp4',
    webm: 'video/webm',
    ogv: 'video/ogg',
    avi: 'video/x-msvideo',
    mov: 'video/quicktime',
    wmv: 'video/x-ms-wmv',
    flv: 'video/x-flv',
    mkv: 'video/x-matroska',
    '3gp': 'video/3gpp',
    asf: 'video/x-ms-asf',
    asx: 'video/x-ms-asf',
    dif: 'video/x-dv',
    dv: 'video/x-dv',
  }
  const type = typeMap[extension] || 'Sorry Couldnt load'

  return (
    <>
      <div className="section">
        <input type="text" placeholder="Enter video URL" onChange={handleSrc} />
        <button className="enter" disabled={isDisabled} onClick={handlePlay}>
          {' '}
          Play{' '}
        </button>
      </div>
      <div className="v-container">
      <video ref={videoRef} src={src} type={type} controls  poster="https://video.com/poster.jpg" />
        {/* <source  /> */}
      </div>
      <div className="buttons">
        <button className="playandpause" onClick={playerControl}>
          {play ? <FaPause /> : <FaPlay />}
        </button>

        <div>
          <label htmlFor="resolution">
            Quality <IoMdSettings />
          </label>
          <select
            id="resolution"
            value={resolution}
            onChange={handleResolutionChange}
          >
            <option value="1080p">High</option>
            <option value="720p">Medium</option>
          </select>
        </div>
      </div>
    </>
  )
}


