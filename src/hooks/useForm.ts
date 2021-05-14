import { useState } from 'react';
import { formatNPWP } from '../utils/FormatNPWP';

interface ISignerData {
    npwp: string,
    name: string,
    signatory: string,
    statusTaxpayer: string,
    defaultSignatory: boolean
};

export const useForm = (callback: any, initialState: ISignerData) => {
    const [values, setValues] = useState(initialState);

    const onChangeNPWP = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("On change "+event.target.name, formatNPWP(event.target.value));
        const value = event.target.value.split(/[.-]/).join("");
        if (/^[0-9]*$/.test(value)){
            setValues({ ...values, [event.target.name]: event.target.value });
        }
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("On change "+event.target.name, event.target.value);
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const onCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("On change "+event.target.name, event.target.checked);
        setValues({ ...values, [event.target.name]: event.target.checked });
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        callback(); // triggering the callback
    };

    // return values
    return {
        onChangeNPWP,
        onChange,
        onCheck,
        onSubmit,
        values,
    };
}