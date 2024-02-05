'use client'
import Link from 'next/link';
import { Dock } from 'primereact/dock';
import { Fieldset } from 'primereact/fieldset';
import { MenuItem } from 'primereact/menuitem';
import { Steps } from 'primereact/steps';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react'

function Step() {
    // const [activeIndex, setActiveIndex] = useState<number>(0);
    const [activeIndex, setActiveIndex] = useState<number>(1);
    const toast = useRef(null);
    const itemss: MenuItem[] = [
        {
            label: 'Personal',
            command: (event) => {
                // toast.current.show({ severity: 'info', summary: 'First Step', detail: event.item.label });
            }
        },
        {
            label: 'Seat',
            command: (event) => {
                // toast.current.show({ severity: 'info', summary: 'Second Step', detail: event.item.label });
            }
        },
        {
            label: 'Payment',
            command: (event) => {
                // toast.current.show({ severity: 'info', summary: 'Third Step', detail: event.item.label });
            }
        },
        {
            label: 'Confirmation',
            command: (event) => {
                // toast.current.show({ severity: 'info', summary: 'Last Step', detail: event.item.label });
            }
        }
    ];

    const itemRenderer = (item: any, itemIndex: any) => {
        const isActiveItem = activeIndex === itemIndex;
        const backgroundColor = isActiveItem ? 'var(--primary-color)' : 'var(--surface-b)';
        const textColor = isActiveItem ? 'var(--surface-b)' : 'var(--text-color-secondary)';

        return (
            <span
                className="inline-flex align-items-center justify-content-center align-items-center border-circle border-primary border-1 h-3rem w-3rem z-1 cursor-pointer"
                style={{ backgroundColor: backgroundColor, color: textColor, marginBottom: '20px', marginTop: '0px' }}
                onClick={() => setActiveIndex(itemIndex)}
            >

                <Link href={item.url}>
                    <i className={`${item.icon} text-xl`} >

                    </i>
                </Link>



            </span>
        );
    };

    const items: MenuItem[] = [
        {
            icon: 'pi pi-user',
            url: '#step-one',
            template: (item) => itemRenderer(item, 0)
        },
        {
            icon: 'pi pi-calendar',
            url: '#step-two',
            template: (item) => itemRenderer(item, 1)
        },
        {
            icon: 'pi pi-check',
            url: '#step-three',
            template: (item) => itemRenderer(item, 2)
        }
    ];
    return (
        <div>
            <h1>Step</h1>
            <div className="card">
                <Dock model={items} position="left" magnification={false}>
                    {/* <Steps model={items} activeIndex={activeIndex} readOnly={false} className="m-2 pt-4" /> */}
                </Dock>

                <div id="step-one">
                    <h4>Step 1</h4>
                    <Fieldset legend="Header">
                        <p className="m-0">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </Fieldset>
                    <Fieldset legend="Header">
                        <p className="m-0">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </Fieldset>
                </div>
                <div id="step-two">
                    <h4>Step 2</h4>
                    <Fieldset legend="Header">
                        <p className="m-0">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </Fieldset>
                    
                </div>
                <div id="step-three">
                    <h4>Step 3</h4>
                    <Fieldset legend="Header">
                        <p className="m-0">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </Fieldset>
                    
                </div>
            </div>
            <h1>Step primereact</h1>
            <div className="card">
            <Toast ref={toast}></Toast>
            <Steps model={itemss} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false} />
        </div>
        </div>
    )
}

export default Step