'use client'
import { CustomerService } from '@/service/tableSerice/CustomerService'
import { FilterMatchMode } from 'primereact/api'
import { Button } from 'primereact/button'
import { Column, ColumnFilterApplyTemplateOptions, ColumnFilterClearTemplateOptions } from 'primereact/column'
import { DataTable, DataTableFilterMeta } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Toolbar } from 'primereact/toolbar'
import React, { useEffect, useRef, useState } from 'react'

interface Country {
    name: string;
    code: string;
}

interface Representative {
    name: string;
    code: string;
}

interface Customer {
    id: number | null;
    name: string;
    country: Country;
    company: string;
    date: string;
    status: string;
    verified: boolean;
    activity: number;
    representative: Representative;
    balance: number;
}
function FormControlLot() {
    let emptyCustomer: Customer = {
        id: null,
        name: '',
        country: { name: '', code: '' },
        company: '',
        date: '',
        status: '',
        verified: false,
        activity: 1,
        representative: { name: '', code: '' },
        balance: 1
    };
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const [customerDialog, setCustomerDialog] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);
    const [deleteCustomerDialog, setDeleteCustomerDialog] = useState<boolean>(false);
    const toast = useRef<Toast>(null);
    const [customer, setCustomer] = useState<Customer>(emptyCustomer);
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    });

    useEffect(() => {
        CustomerService.getCustomersMedium().then((data: any) => setCustomers(data));
    }, []);
    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };
    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        console.log("value", value);
        let _filters = { ...filters };

        // @ts-ignore
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const header = renderHeader();
    const openNew = () => {
        setCustomer(emptyCustomer);
        setSubmitted(false);
        setCustomerDialog(true);
    };
    const confirmDeleteSelected = () => {
        setDeleteCustomerDialog(true);
    };
    const actionBodyTemplate = (rowData: Customer) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editCustomer(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteCustomer(rowData)} />
            </React.Fragment>
        );
    };
    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
            </div>
        );
    };
    const deleteCustomer = () => {
        let _customer = customers.filter((val) => val.id !== customer.id);

        setCustomers(_customer);
        setDeleteCustomerDialog(false);
        setCustomer(emptyCustomer);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Customer Deleted', life: 3000 });
    };
    const editCustomer = (customer: Customer) => {
        setCustomer({ ...customer });
        setCustomerDialog(true);
    };
    const hideDeleteCustomerDialog = () => {
        setDeleteCustomerDialog(false);
    };
    const confirmDeleteCustomer = (customer: Customer) => {
        setCustomer(customer);
        setDeleteCustomerDialog(true);
    };
    const hideDialog = () => {
        setCustomerDialog(false);
    };
    const saveCustomer = () => {
       setSubmitted(true);

        if (customer.name.trim()) {
            let _customers = [...customers];
            let _customer = { ...customer };

            if (customer.id) {
                const index = customers.findIndex(x => x.id = customer.id);

                _customers[index] = _customer;
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Customer Updated', life: 3000 });
            } else {
                _customer.id = Math.random();
                _customer.name = 'Test';
                _customers.push(_customer);
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setCustomers(_customers);
            setCustomerDialog(false);
            setCustomer(emptyCustomer);
        }
    };
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _customer = { ...customer };

        // @ts-ignore
        _customer[`${name}`] = val;

        setCustomer(_customer);
    };
    const customerDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveCustomer} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteCustomerDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteCustomer} />
        </React.Fragment>
    );
    return (
        <div>
            <Toast ref={toast} />
            <h1>Table</h1>
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
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
                <DataTable value={customers} paginator sortField="name" rows={5} rowsPerPageOptions={[5, 10, 25, 50]} sortMode="multiple" header={header} tableStyle={{ minWidth: '50rem' }} globalFilterFields={['name', 'country.name', 'representative.name', 'status']} filters={filters}>
                    <Column field="name" header="Name" sortable style={{ width: '20%' }}></Column>
                    <Column field="country.name" header="Country" style={{ width: '20%' }}></Column>
                    <Column field="company" header="Company" style={{ width: '20%' }}></Column>
                    <Column field="status" header="Status" style={{ width: '20%' }}></Column>
                    <Column field="representative.name" header="Representative" style={{ width: '20%' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>
            {/* edit dialog */}
            <Dialog visible={customerDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} modal className="p-fluid" onHide={hideDialog} footer={customerDialogFooter}>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id='name' name='name' placeholder="Name" value={customer.name} onChange={(e) => onInputChange(e, 'name')} />
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Status
                    </label>
                    <InputText id='status' name='status' placeholder="Status" value={customer.status} onChange={(e) => onInputChange(e, 'status')} />
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Company
                    </label>
                    <InputText id='company' name='company' placeholder="Company" value={customer.company} onChange={(e) => onInputChange(e, 'company')} />
                </div>
            </Dialog>
            <Dialog visible={deleteCustomerDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteCustomerDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {customer && (
                        <span>
                            Are you sure you want to delete <b>{customer.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
        </div>
    )
}

export default FormControlLot