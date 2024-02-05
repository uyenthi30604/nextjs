import { addData } from '@/redux/features/qrcode/codeDataSlice';
import { useAppDispatch } from '@/redux/hooks';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './qrcodePage.module.css'
interface Props {
    qr: string
    visible: boolean
}

const QrDialog = (props: Props) => {
    const [visible, setVisible] = useState(props.visible);
    const [numofbox, setNumofbox] = useState('');
    const dispatch = useAppDispatch();
    const qr_code = props.qr;

    useEffect(() => {
        setVisible(props.visible)
    }, [props.visible]);
    function confirmBtn() {
        dispatch(addData({ box: Number(numofbox) || 0, id: qr_code }));
        setVisible(false);
    }
    return (
        <div>
            {/* <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} /> */}
            {/* style={{ width: '30vw' }} */}
            <Dialog header="QR Results" visible={visible} className={styles.qrDialog} onHide={() => setVisible(false)}>
                <div className="flex flex-wrap align-items-center mb-3 gap-2">
                    <label htmlFor="username" className="p-sr-only">QR Code</label>
                    <InputText id="username" placeholder="QR Code" className="p-invalid mr-2" value={qr_code} />

                </div>
                <div className="flex flex-wrap align-items-right gap-2 mb-3 ">
                    <label htmlFor="email" className="p-sr-only">Number of box</label>
                    <InputText value={numofbox} id="email" placeholder="Number of box" onChange={e => setNumofbox(e.currentTarget.value)} className="p-invalid mr-2" />
                </div>
                <div className="flex flex-wrap gap-2 justify-content-center">
                    <Button icon="pi pi-check" label="Confirm" className="mr-2" onClick={confirmBtn}></Button>
                    <Button icon="pi pi-times" label="Cancel" onClick={() => setVisible(false)}></Button>
                </div>
            </Dialog>
        </div>
    )
}

export default QrDialog