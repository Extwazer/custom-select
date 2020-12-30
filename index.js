import {Select} from "./assets/select";
import './assets/styles.scss';

const select = new Select('#select',{
    placeholder: 'Select please element',
    data: [
        {id: '1', value: 'Test1'},
        {id: '2', value: 'Test2'},
        {id: '3', value: 'Test3'},
        {id: '4', value: 'Test4'},
        {id: '5', value: 'Test5'},
        {id: '6', value: 'Test6'},
        {id: '7', value: 'Test7'},
    ]
});

window.s = select;