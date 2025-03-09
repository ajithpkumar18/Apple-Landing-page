import React, { useEffect, useRef, useState } from "react"
import { pauseImg, playImg, replayImg } from "../utils/index"
import { hightlightsSlides } from "../constants/index"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type videoType = {
    isEnd: boolean,
    startPlay: boolean,
    videoId: number,
    isLastVideo: boolean,
    isPlaying: boolean,
}
const VideoCarousel = () => {
    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    const [video, setVideo] = React.useState<videoType>({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    })

    const [loadedData, setLoadedData] = useState([]);

    const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;


    useGSAP(() => {

        gsap.to("#slider", {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: 'power2.inOut'
        })
        gsap.to('#video', {
            scrollTrigger: {
                trigger: '#video',
                toggleActions: 'restart none none none'
            },
            onComplete: () => {
                setVideo((pre) => ({
                    ...pre,
                    startPlay: true,
                    isPlaying: true
                }))
            }
        })
    }, [isEnd, videoId])


    useEffect(() => {

        if (loadedData.length > 3) {
            if (!isPlaying) {
                // @ts-ignore
                videoRef.current[videoId].pause();
            }
            else {
                // @ts-ignore
                startPlay && videoRef.current[videoId].play();
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData])


    // @ts-ignore
    const handleLoadedMetadata = (i, e) => setLoadedData((pre) => [...pre, e])


    useEffect(() => {

        let currentProgress = 0;

        let span = videoSpanRef.current;

        if (span[videoId]) {
            let anim = gsap.to(span[videoId], {

                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100)

                    if (progress != currentProgress) {
                        currentProgress = progress;

                        gsap.to(videoDivRef.current[videoId], {
                            width: window.innerWidth < 760 ? '10vw' : window.innerWidth < 1200 ? '10vw' : '4vw'
                        })
                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: 'white'
                        })
                    }
                },

                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: '12px'
                        })

                        gsap.to(span[videoId], {
                            backgroundColor: "#afafaf"
                        })
                    }
                }

            })

            if (videoId === 0) {
                anim.restart()
            }

            const animUpdate = () => {
                // @ts-ignore
                anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration)
            }

            if (isPlaying) {
                gsap.ticker.add(animUpdate)
            }
            else {
                gsap.ticker.remove(animUpdate)
            }
        }

    }, [videoId, startPlay])

    // @ts-ignore
    const handleProcess = (type, i) => {
        switch (type) {
            case 'video-end':
                setVideo((prevVideo) => ({ ...prevVideo, isEnd: true, videoId: i + 1 }))
                break;
            case 'video-last':
                setVideo((pre) => ({ ...pre, isLastVideo: true }))
                break;
            case 'video-reset':
                setVideo((pre) => ({ ...pre, isLastVideo: false, videoId: 0 }))
                break;
            case 'play': setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }))
                break;
            case 'pause': setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }))
                break;
            default: break;
        }
    }


    return (
        <>
            <div className="flex items-center">
                {/* @ts-ignore */}
                {hightlightsSlides.map((list, i) => (
                    <div key={list.id} id="slider" className="sm:pr-20 pr-10">

                        <div className="relative sm:w-[70vw] w-[88vw] md:h-[70vh] sm:h-[50vh] h-[35vh]">
                            <div className="w-full h-full flex items-center justify-center rounded-3xl overflow-hidden bg-black ">
                                <video
                                    id="video"
                                    playsInline={true}
                                    preload="auto"
                                    muted

                                    className={`${list.id === 2 && 'translate-x-44'}
                                    pointer-events-none
                                    `}
                                    ref={(el) => (
                                        // @ts-ignore
                                        videoRef.current[i] = el
                                    )
                                    }

                                    onEnded={() => {
                                        i !== 3 ? handleProcess('video-end', i) : handleProcess('video-last', i)
                                    }}

                                    onPlay={() => {
                                        setVideo((pre) => ({
                                            ...pre, isPlaying: true
                                        }))
                                    }}

                                    onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}
                                >
                                    <source src={list.video} type="video/mp4" />
                                </video>
                            </div>
                            <div className="absolute top-12 left-[5%] z-10">

                                {
                                    // @ts-ignore
                                    list.textLists.map((text) => (
                                        <p key={text} className="md:text-2xl text-xl font-medium">
                                            {text}
                                        </p>
                                    ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div >
            <div className="relative flex items-center justify-center mt-10">
                <div className="flex items-center justify-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
                    {videoRef.current.map((_, i) => (
                        <span
                            key={i}
                            // @ts-ignore
                            ref={(el) => (videoDivRef.current[i] = el)}
                            className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
                        >

                            <span className="absolute h-full w-full rounded-full" ref={(el) =>
                                // @ts-ignore
                                (videoSpanRef.current[i] = el)
                            }></span>
                        </span>
                    ))}
                </div>
                <button className="control-btn">
                    <img
                        src={
                            isLastVideo ? replayImg :
                                !isPlaying ? playImg : pauseImg
                        }
                        alt={
                            isLastVideo ? 'replay' :
                                !isPlaying ? 'play' : 'pause'
                        }
                        onClick={
                            // @ts-ignore
                            isLastVideo ? () => handleProcess('video-reset') :
                                // @ts-ignore    
                                !isPlaying ? () => handleProcess('play') : () => handleProcess('pause')
                        }
                    />
                </button>
            </div>
        </>
    )
}

export default VideoCarousel