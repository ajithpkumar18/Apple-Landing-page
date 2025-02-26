import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { useRef } from "react"
// ts-ignore
import { exploreVideo, explore1Img, explore2Img } from "../utils"

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
    const videoRef = useRef<HTMLVideoElement>();
    useGSAP(() => {

        gsap.to('exploreVideo', {
            scrollTrigger: {
                trigger: '#exploreVideo',
                toggleActions: 'play pause reverse restart',
                start: '-10% bottom'
            },
            onComplete: () => {
                // ts-ignore
                videoRef.current?.play();
            }
        })

        gsap.to("#features_title", {
            opacity: 1,
            y: 0,
            scrollTrigger: {
                trigger: "#features_title",
                toggleActions: 'restart reverse restart reverse',
                start: 'top 85%'
            }
        })

        gsap.to(".g_grow", {
            scale: 1,
            opacity: 1,
            ease: 'power1',
            scrollTrigger: {
                trigger: "#features_title",
                toggleActions: 'restart reverse restart reverse',
                start: 'top 80%',
                scrub: 5.5
            }
        })

        if (window.innerWidth < 750) {
            gsap.to(".g_text", {
                y: 0,
                opacity: 1,
                ease: 'power1',
                duration: 1,
                stagger: 0.7,
                scrollTrigger: {
                    trigger: '.g_text',
                    toggleActions: "restart reverse restart reverse",
                    start: "top 85%",
                }
            })
        }
        else {
            gsap.to(".g_text", {
                y: 0,
                opacity: 1,
                ease: 'power1',
                duration: 1,
                scrollTrigger: {
                    trigger: '.g_text',
                    toggleActions: "restart reverse restart reverse",
                    start: "top 85%",
                }
            })
        }

    }, [])
    return (
        <section className="h-full sm:py-32 py-20 sm:px-10 px-5 bg-zinc relative overflow-hidden">
            <div className="screen-max-width">
                <div className="mb-12 w-full">
                    <h1 id="features_title" className="text-gray lg:text-6xl md:text-5xl text-3xl lg:mb-0 mb-5 font-medium translate-y-20 opacity-0">Explore the full story.</h1>
                </div>

                <div className="flex flex-col justify-center items-center overflow-hidden">
                    <div className="mt-32 mb-24 pl-24">
                        <h1 className="text-5xl lg:text-7xl font-semibold">iPhone.</h1>
                        <h2 className="text-5xl lg:text-7xl font-semibold">
                            Forged in titanium.
                        </h2>
                    </div>
                    <div className="flex-center flex-col sm:px-10">
                        <div className="relative h-[50vh] w-full flex items-center">
                            <video ref={videoRef} playsInline id="exploreVideo" className="w-full h-full object-cover object-center" preload="none" muted autoPlay>
                                <source src={exploreVideo} type="video/mp4" />
                            </video>
                        </div>

                        <div className="flex flex-col w-full relative">
                            <div className="w-full flex flex-col md:flex-row gap-5 items-center">
                                <div className="overflow-hidden flex-1 h-[50vh]">
                                    <img src={explore1Img} alt="titanium" className="g_grow w-full h-full object-cover object-center scale-150 opacity-0" />
                                </div>

                                <div className="overflow-hidden flex-1 h-[50vh]">
                                    <img src={explore2Img} alt="titanium" className="g_grow w-full h-full object-cover object-center scale-150 opacity-0" />
                                </div>
                            </div>

                            <div className=" w-full flex flex-center flex-col md:flex-row mt-10 md:mt-16 gap-5">
                                <div className="flex-1 flex-center">
                                    <p className="g_text text-gray max-w-md text-lg md:text-xl font-semibold opacity-0 translate-y-[100px]">
                                        iPhone 15 Pro is {' '}
                                        <span className="text-white">
                                            the first iPhone to feature an aerospace-grade titanium design
                                        </span>,
                                        using the same alloy that spacecrafts use for missions to Mars.
                                    </p>
                                </div>

                                <div className="flex-1 flex-center">
                                    <p className="g_text text-gray max-w-md text-lg md:text-xl font-semibold opacity-0 translate-y-[100px]">
                                        Titanium has one of the best strength-to-weight ratios of any metal, making these our {' '}
                                        <span className="text-white">
                                            lightest Pro models ever.
                                        </span>,
                                        You'll notice the difference, the moment you pick one up
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* <div className=" w-full flex-center flex-col md:flex-row mt-5 md:mt-16 gap-5">

                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    )
}