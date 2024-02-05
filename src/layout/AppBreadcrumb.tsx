import React, { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation';
import { BreadCrumb } from 'primereact/breadcrumb';
import { BreadCrumbContext } from './context/breadcrumbcontext';

function AppBreadcrumb() {
    const pathname = usePathname()
    const home = { icon: 'pi pi-home', url: '/' }
    // const breadcrumb_arr = useRef([{ label: '', url: '/' }]);
    let breadcrumb_arr: { label: string, url: string }[] = [];
    const breadcrumb_val = BreadCrumbContext;
    
    var path_item = (pathname.slice(1)).split('/');
    // console.log("path_item", path_item);
    // console.log("path_item.length", path_item.length);
    path_item.map((item: any) => {
        var index_path = breadcrumb_val.findIndex(x => x.breadcrumb == (item));
        var temp_path = "";
        var temp_label = "";
        if (index_path > 0) {
            temp_path = breadcrumb_val[index_path].path;
            temp_label = breadcrumb_val[index_path].label
        }

        breadcrumb_arr.push({ label: temp_label, url: temp_path });
    });

    

    return (
        <div>
            <BreadCrumb model={breadcrumb_arr} home={home} />
        </div>
    )
}

export default AppBreadcrumb