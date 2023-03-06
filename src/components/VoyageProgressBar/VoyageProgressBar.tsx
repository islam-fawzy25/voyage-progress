import React, { useEffect, useState } from "react";
import "./VoyageProgressBar.scss"
import pinIcon from "../../icons/pin.png"

interface ProgressBarProps {
    portOfLoading: string
    portOfDischarge: string
    depatureTime: Time
    arrivalTime: Time
}

interface Time {
    hour: number
    minute: number
}

export default function VoyageProgressBar({ portOfLoading, portOfDischarge, arrivalTime, depatureTime }: ProgressBarProps) {
    const arrayLength = 14;
    const dotsArray = new Array(arrayLength).fill(0);
    const [pinPlaced, setPinPlaced] = useState<number>(0)

    const updateProgressBar = (arrivalTime: Time, depatureTime: Time): number => {
        const currentTime = new Date().getHours() + new Date().getMinutes() / 60
        const journeyTime = (arrivalTime.hour + arrivalTime.minute / 60) - (depatureTime.hour + depatureTime.minute / 60)
        const sailedDistance = (currentTime - (depatureTime.hour + depatureTime.minute / 60)) / journeyTime
        return Math.round(14 * sailedDistance)
    }

    // For Testing
    useEffect(() => {
        setPinPlaced(updateProgressBar(arrivalTime, depatureTime))
        const interval = setInterval(() => {
            setPinPlaced(updateProgressBar(arrivalTime, depatureTime))
        }, 1000)
          return () => {
              clearInterval(interval)
          }
    }, [])
 
    return (
        <div className={`progress-bar-container`}>
            {dotsArray.map((elem, index) => (
                <div key={index} className={`progress-bar`}>
                    <div className={`pin-dot-container`}>
                        <div className={Math.max(0, pinPlaced) === index || Math.min(dotsArray.length-1, pinPlaced) === index ? "pin-active" : "pin-not-active"}>
                            <img src={pinIcon} alt="pin-icon" />
                        </div >
                        <div className={index <= pinPlaced ? "dot-active" : "dot-not-active"}>
                            <div className={index === 0 || index === dotsArray.length - 1 ? "big-circle" : "small-circle"}></div>
                        </div>
                    </div>
                    <div className="port-name-container">
                        {index === 0 && <div>{portOfLoading}</div>}
                        {index === dotsArray.length - 1 && <div>{portOfDischarge}</div>}
                    </div>
                </div>
            ))}
        </div>
    )
}