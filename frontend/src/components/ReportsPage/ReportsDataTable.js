
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Knob } from 'primereact/knob';


const ReportsDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.profileName}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.description}</p>
    const iconTemplate2 = (rowData, { rowIndex }) => <i className={"pi " + rowData.media}  ></i>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.plate}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.date}</p>
    const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.stickerID}</p>
    const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.location}</p>
    const knobTemplate7 = (rowData, { rowIndex }) => <Knob value={rowData.riskMatrix}  />

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10}>
            <Column field="profileName" header="Reporter" body={pTemplate0} style={{ minWidth: "8rem" }} />
            <Column field="description" header="Incident Description" body={pTemplate1} style={{ minWidth: "8rem" }} />
            <Column field="media" header="Evidence" body={iconTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="plate" header="Plate" body={pTemplate3} style={{ minWidth: "8rem" }} />
            <Column field="date" header="Date" body={pTemplate4} style={{ minWidth: "8rem" }} />
            <Column field="stickerID" header="stickerID" body={pTemplate5} style={{ minWidth: "8rem" }} />
            <Column field="location" header="Location of incident" body={pTemplate6} style={{ minWidth: "8rem" }} />
            <Column field="riskMatrix" header="Risk of Driver" body={knobTemplate7} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default ReportsDataTable;