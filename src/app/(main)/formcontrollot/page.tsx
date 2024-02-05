'use client'
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column, ColumnEditorOptions, ColumnEvent } from 'primereact/column';
import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Toolbar } from 'primereact/toolbar';
import React, { useEffect, useRef, useState } from 'react'
import { IForm } from '@/service/formlot/formInterface';
import { FormLotService } from '@/service/formlot/formlotService';

export var formData: IForm[] = [
    {
        id: 1,
        sequenceNo: 1,
        process: "Turning OP1",
        machine_no: "123",
        date: "",
        authority: "",
    },
    {
        id: 2,
        sequenceNo: 2,
        process: "Milling OP2",
        machine_no: "222",
        date: "",
        authority: "",
    },
    {
        id: 3,
        sequenceNo: 3,
        process: "Turning OP3",
        machine_no: "6498",
        date: "",
        authority: "",
    },
    {
        id: 4,
        sequenceNo: 4,
        process: "Turning OP4",
        machine_no: "649",
        date: "",
        authority: "",
    },
];
const data: IForm[] = formData

function FormControlLot() {
    const [lotForm, setLotForm] = useState<IForm[]>([]);
    const [usedlotForm, setUsedLotForm] = useState<IForm[]>([]);
    const last_index = useRef(0);
    const [selectedRow, setSelectedRow] = useState<Number>()
    const [deleteRowDialog, setDeleteRowDialog] = useState<boolean>(false)
    const [useFormDialog, setUseFormDialog] = useState<boolean>(false);

    const column = [
        { field: 'sequenceNo', header: 'Index' },
        { field: 'process', header: 'Process' },
        { field: 'machine_no', header: 'Machine No' },
        { field: 'date', header: 'Date' },
        { field: 'authority', header: 'Authoriry' },
    ]

    const machine_val = [
        { name: 'Disable', code: 'disable' }, { name: 'Enable', code: 'enable' }
    ]
    useEffect(() => {
        setLotForm(data);

    }, [])
    const textEditor = (options: ColumnEditorOptions) => {
        return <InputText type="text" value={options.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback!(e.target.value)} />;
    };
    // if editor type is different

    const priceEditor = (options: ColumnEditorOptions) => {
        return <InputText type="text" value={options.value} />;
    };
    const cellEditor = (options: ColumnEditorOptions) => {
        if (options.field === 'price') return priceEditor(options);
        else return textEditor(options);
    };

    //
    // START FORM LOT CONTROL
    function addRow() {
        last_index.current = lotForm.length;
        var _data = ([...lotForm])
        _data.push({
            id: last_index.current + 1, // should be null until send to DB
            sequenceNo: last_index.current + 1,
            process: '',
            machine_no: '',
            date: '',
            authority: ''
        })
        setLotForm(_data);
    }
    // new row function
    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="info" onClick={addRow} outlined />
            </div>
        );
    };
    // complete row edit 
    const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
        var _data = ([...lotForm])
        let { newData, index } = e;

        _data[index] = newData as IForm;

        setLotForm(_data);
    };
    // delete row
    const actionBodyTemplate = (rowData: IForm) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteFormLot(rowData)} />
            </React.Fragment>
        );
    };
    // hide delete row dialog notification
    const hideDeleteRowDialog = () => {
        setDeleteRowDialog(false);
    };
    // machine field maybe is dropdown element so i leave it here just in case
    function machineEditor(options: ColumnEditorOptions) {
        console.log("machineEditor", options.value);
        return (
            <Dropdown value={options.value} options={machine_val} optionLabel="name"
                placeholder="Select machine status" onChange={(e: DropdownChangeEvent) => (options.editorCallback!(e.value.name), console.log('e.value', e.value))} className="w-full md:w-14rem" />
        )
    }
    // button in delete confirm dialog
    const deleteFormLotDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteRowDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteRow} />
        </React.Fragment>
    );
    // delete row function
    function deleteRow() {
        let _data = lotForm.filter((val) => val.id !== selectedRow);
        setLotForm(_data);
        setDeleteRowDialog(false);
    }
    // confirm delete row
    const confirmDeleteFormLot = (_formlot: IForm) => {
        setSelectedRow(_formlot.id);
        setDeleteRowDialog(true);
    };
    // END FORM LOT CONTROL
    //
    // START USED FORM CONTROL
    const rightDialogTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Save" severity="info" onClick={saveUsedForm} />
            </div>
        );
    };
    function dateEditor(options: ColumnEditorOptions) {
        console.log("dateEditor", options.value);
        return (
            <Calendar value={options.value} onChange={(e) => console.log(JSON.stringify(e.target.value))} dateFormat="dd/mm/yy" />
        )
    }
    function saveFormLot(_formSave: IForm[]) {
        formData = ([..._formSave]);
    }
    function useFormFunc() {
        setUseFormDialog(true);
        // create form from form lot control
        setUsedLotForm(lotForm);
    }
    const onCellEditComplete = (e: ColumnEvent) => {
        let { rowData, newValue, field, originalEvent: event } = e;
        console.log("newValue", newValue, "; field", field);
        if (newValue.trim().length > 0) rowData[field] = newValue;
        else event.preventDefault();
    }
    // END USED FORM CONTROL





    function saveUsedForm() {

    }
    return (
        <div>
            <h1>Form Control Lot</h1>
            <div className="formgroup-inline">
                <div className="field">
                    {/* <label htmlFor="productCode" className="p-sr-only">Product code</label> */}
                    <InputText id='productCode' name='productCode' placeholder="Product code" />
                </div>
                <div className="field">
                    {/* <label htmlFor="line" className="p-sr-only">Line</label> */}
                    <InputText id='line' name='line' placeholder="Line" />
                </div>
                <Button label="Search" className="bg-primary border-primary-500 px-3 py-2 text-base border-1 border-solid border-round cursor-pointer transition-all transition-duration-200 hover:bg-primary-600 hover:border-primary-600 active:bg-primary-700 active:border-primary-700" />
            </div>
            <div className="card">
                <div className="grid">
                    <div className="col-2 col-offset-10">
                        <div className="text-end">
                            <Button label="Use Form" severity="success" onClick={useFormFunc} />
                        </div>
                    </div>
                </div>
                <div className="form-header-section">

                </div>
                <div className="form-body-section">
                    <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
                    <DataTable value={lotForm} dataKey="id" editMode="row" tableStyle={{ minWidth: '50rem' }} onRowEditComplete={onRowEditComplete} reorderableColumns reorderableRows onRowReorder={(e) => setLotForm(e.value)}>
                        <Column rowReorder style={{ width: '3rem' }} />
                        <Column field="sequenceNo" header="Index">
                        </Column>
                        <Column field="process" header="Process" editor={(options) => textEditor(options)}>
                        </Column>
                        <Column field="machine_no" header="Machine No" editor={(options) => textEditor(options)}>
                        </Column>
                        <Column field="date" header="Date">
                        </Column>
                        <Column field="authority" header="Authoriry">

                        </Column>
                        <Column rowEditor={true} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '4rem' }}></Column>
                    </DataTable>
                </div>

            </div>
            <Dialog visible={deleteRowDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteFormLotDialogFooter} onHide={hideDeleteRowDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {(
                        <span>
                            Are you sure you want to delete this row?
                        </span>
                    )}
                </div>
            </Dialog>
            <Dialog visible={useFormDialog} onHide={() => setUseFormDialog(false)} header="Form control" style={{ width: '50vw' }}>
                <Toolbar className="mb-4" right={rightDialogTemplate}></Toolbar>
                <DataTable value={usedlotForm} dataKey="id" editMode="cell" tableStyle={{ minWidth: '50rem' }}>
                    <Column style={{ width: '3rem' }} />
                    <Column field="sequenceNo" header="Index">
                    </Column>
                    <Column field="process" header="Process" >
                    </Column>
                    <Column field="machine_no" header="Machine No">
                    </Column>
                    <Column field="date" header="Date" editor={(options) => textEditor(options)} onCellEditComplete={onCellEditComplete}>
                    </Column>
                    <Column field="authority" header="Authoriry" editor={(options) => textEditor(options)} onCellEditComplete={onCellEditComplete}>

                    </Column>
                    {/* <Column rowEditor={true} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column> */}

                </DataTable>
            </Dialog>
        </div>
    )
}

export default FormControlLot