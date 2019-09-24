import { LightningElement, track } from 'lwc';

//importing Apex Class method
import saveAccount from '@salesforce/apex/controllerCuenta.saveAccount';

import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import NAME_FIELD from '@salesforce/schema/Account.Name'
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class CrearCuentaLWC extends LightningElement {

    @track error;

    //this object have record information
    @track accRecord = {
        Name: NAME_FIELD,
        Industry: INDUSTRY_FIELD,
        Phone: PHONE_FIELD,
    };

    handleName(event){
        this.accRecord.Name = event.target.value;
        window.console.log('Name ==> ' + this.accRecord.Name);
    }

    handlePhone(event){
        this.accRecord.Phone = event.target.value;
        window.console.log('Phone ==> ' + this.accRecord.Phone);
    }

    handleIndustry(event) {
        this.accRecord.Industry = event.target.value;
        window.console.log('Industry ==> '+this.accRecord.Industry);
    }

    save(){
        saveAccount({objAcc : this.accRecord})
        .then(result => {
            this.accRecord = {};

            window.console.log('result ===> ' + result);

            this.dispatchEvent(new ShowToastEvent({
                title: 'Cuenta Creada!',
                message: 'La cuenta ha sido creado',
                variant: 'success'
            }),);
        })
        .catch(error => {
            this.error = error.message;
        });
    }
}