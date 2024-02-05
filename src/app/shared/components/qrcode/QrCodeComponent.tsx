import React, { useEffect, useRef, useState } from 'react'
import styles from './qrComponent.module.scss'
import { Button } from 'primereact/button'
import QrScanner from 'qr-scanner';

interface Props {
    turnOnCam: boolean
}

const QrCodeComponent = (props: Props) => {
    const [turnOnCam, setTurnOnCam] = useState(props.turnOnCam);
    const [camQrResult, setCamQrResult] = useState('No result');
    const videoRef = useRef<HTMLVideoElement>()

    const _styles = {
        qrContainer: {
            width: '100%',
            height: '100%'
        }
    }

    useEffect(() => {
        const video = document.getElementById('qr-video') as HTMLVideoElement
        videoRef.current = video
        const scannerx = new QrScanner(
            video,
            (result: any) => {
                // console.log('scan success')
                setCamQrResult(result.data)
                video.pause()
            },
            {
                onDecodeError: (error: any) => {
                    setCamQrResult(error)
                },
                highlightScanRegion: true,
                highlightCodeOutline: true
            }
        )
        if (turnOnCam) scannerx.start();
        console.log("useEffect run");
        (document.getElementById('start-button') as HTMLElement).addEventListener('click', () => {
            video.play()
            console.log('run cam')
        });
       
        // run when leave page
        return () => {
            console.log("clean useEffect");
            scannerx.stop();
        }
    }, [])

    // if(turnOnCam){
    //     scannerx.start();
    // }

    return (
        <div>
            <div id='video-container' className='col-4'>
                <video style={_styles.qrContainer} id='qr-video'></video>
            </div>
            <div className="card">
                <div className="flex flex-wrap gap-2">
                    <Button id="start-button" label="Scan" severity="info" />
                    {/* <Button onClick={pauseVideo} label="Pause" severity="warning" /> */}
                    {/* <Button id="stop-button" label="Stop" severity="danger" /> */}
                </div>
            </div>
            <div className="card">
                <b>Detected QR code: {camQrResult}</b>
                <span id='cam-qr-result'></span>
            </div>
            
        </div>
    )
}

export default QrCodeComponent