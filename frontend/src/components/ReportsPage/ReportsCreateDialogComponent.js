
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';


 
const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const ReportsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        set_entity({})
    },[props.show])
    const onSave = async () => {
        let _data = {
            profileName: _entity.profileName,
            description: _entity.description,
            media: _entity.media,
            plate: _entity.plate,
            date: _entity.date,
            stickerID: _entity.stickerID,
            location: _entity.location,
            riskMatrix: _entity.riskMatrix

        };

        setLoading(true);
        try {
            const result = await client.service("reports").create(_data);
            props.onHide();
            props.alert({ type: "success", title: "Create", message: "Created successfully" });
            props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };

    return (
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="reports-create-dialog-component">
                <div>
                    <p className="m-0" >Reporter:</p>
                    <InputText className="w-full mb-3" value={_entity?.profileName} onChange={(e) => setValByKey("profileName", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Incident Description:</p>
                    <InputText className="w-full mb-3" value={_entity?.description} onChange={(e) => setValByKey("description", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Evidence:</p>
                    <InputText className="w-full mb-3" value={_entity?.media} onChange={(e) => setValByKey("media", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Plate:</p>
                    <InputText className="w-full mb-3" value={_entity?.plate} onChange={(e) => setValByKey("plate", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Date:</p>
                    <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={_entity?.date} onChange={ (e) => setValByKey("date", e.target.value)} showTime ></Calendar>
                </div>
                <div>
                    <p className="m-0" >stickerID:</p>
                    <InputText className="w-full mb-3" value={_entity?.stickerID} onChange={(e) => setValByKey("stickerID", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Location of incident:</p>
                    <InputText className="w-full mb-3" value={_entity?.location} onChange={(e) => setValByKey("location", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Risk of Driver:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.riskMatrix} onChange={(e) => setValByKey("riskMatrix", e.target.value)}  />
                </div>


                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    //
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(null, mapDispatch)(ReportsCreateDialogComponent);
// createDialog_code.template
