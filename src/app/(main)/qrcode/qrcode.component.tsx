import React, { useEffect, useRef, useState } from 'react'
import QrScanner from 'qr-scanner'
import { Button } from "primereact/button";
import { useRouter } from 'next/navigation';
import QrDialog from './input-dialog.component';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useAppSelector, useAppDispatch, useAppStore } from '@/redux/hooks';
import { IQrcode } from '@/app/shared/interface/qrcode';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { addData } from '@/redux/features/qrcode/codeDataSlice';

function QrCodeComponent() {
    const ini_data = useAppSelector(state => state.qrcode.value);
    const [numofbox, setNumofbox] = useState('');
    const dispatch = useAppDispatch();

    const styles = {
        qrContainer: {
            width: '100%',
            height: '100%'
        }
    }
    const [camQrResult, setCamQrResult] = useState('No result')
    const [visible, setVisible] = useState(false);
    let isStop = useRef(false)
    let checkStartCam = useRef(true)
    let havingRes = useRef(false);

    const videoRef = useRef<HTMLVideoElement>()

    // const video = document.getElementById('qr-video')

    // const videoContainer = document.getElementById('video-container')
    // const camHasCamera = document.getElementById('cam-has-camera')
    const scanner = useRef<QrScanner>()
    const isLeave = useRef(false);


    useEffect(() => {
        console.log("ini_data", ini_data);
        const video = document.getElementById('qr-video') as HTMLVideoElement
        videoRef.current = video

        const scannerx = new QrScanner(
            video,
            (result: any) => {
                // console.log('scan success')
                setCamQrResult(result.data)
                setVisible(true);
                video.pause()
            },
            {
                onDecodeError: (error: any) => {
                    // console.log('scan unsuccess')
                    setCamQrResult(error)
                    setVisible(false);
                    // camQrResult.style.color = 'inherit'
                },
                highlightScanRegion: true,
                highlightCodeOutline: true
            }
        )

        function startScanner(times_start: string) {
            if (times_start == "first" && checkStartCam.current) {
                scannerx.start()
                checkStartCam.current = false;
                console.log("startScanner first")
            } else {
                if (video.paused) {
                    video.play()
                }
                if (isStop.current) {
                    console.log("startScanner others time")
                    scannerx.start()
                    isStop.current = false
                }
            }
        }
        (document.getElementById('start-button') as HTMLElement).addEventListener('click', () => {
            startScanner('not first')
        });

        (document.getElementById('stop-button') as HTMLElement).addEventListener('click', () => {
            scannerx.stop()
            isStop.current = true
        });
        startScanner('first');
        return () => {
            if (isLeave.current) {
                scannerx.stop();
                console.log("leave page")
            }
            if (!isLeave.current) {
                isLeave.current = true;
                console.log("in page")
            }

        };

    }, [])

    function pauseVideo() {
        if (videoRef.current?.played) videoRef.current?.pause()
    }

    function addBox() {
        setVisible(false);

    }

    return (
        <div>
            <div id='video-container' className='col-4'>
                <video style={styles.qrContainer} id='qr-video'></video>
            </div>
            <div className="card">
                <b>Detected QR code: </b>
                <span id='cam-qr-result'>{camQrResult}</span>
            </div>

            {/* <button onClick={startScanner}>Start</button>
      <button onClick={stopScanner}>Stop</button> */}
            <div className="card">
                <div className="flex flex-wrap gap-2">
                    <Button id="start-button" label="Scan" severity="info" />
                    {/* <Button onClick={pauseVideo} label="Pause" severity="warning" /> */}
                    <Button id="stop-button" label="Stop" severity="danger" />
                </div>
            </div>
            {/* <div>
        <button id='start-button'>Start</button>
        <button id='stop-button'>Stop</button>
        <button onClick={pauseVideo}>Pause</button>
      </div> */}

            <QrDialog qr={camQrResult} visible={visible} />
            {/* qrcode datatable */}
            <div className="card">
                <DataTable value={ini_data} stripedRows tableStyle={{ minWidth: '50rem' }}>
                    <Column field="id" header="#"></Column>
                    <Column field="code" header="Code"></Column>
                    <Column field="value" header="Value"></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default QrCodeComponent