import React, {
    Component
} from 'react';

class NewRadio extends Component {
    state = {
        radio = {
            name: "",
            brand: "",
            model: "",
            description: ""
        }
    }

    render() {
        return (<
            div >
            <
            span > New Radio < /span> < /
            div >
            );
        }
    }
    
export default NewRadio;