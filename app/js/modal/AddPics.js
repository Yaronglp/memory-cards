import Basic from './Basic';

class AddPics extends Basic{
    constructor(props){
        super(props);
        this.numOfInputs = 9;
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmitBtn = this.onSubmitBtn.bind(this);
    }

    picsUrlInputs(){
        let arr = [];

        for(let i=0 ; i < this.numOfInputs ; ++i){
            arr.push(<input key={i}
                            data-idx={i}
                            onChange={(e) => this.onInputChange(e)}
                            placeholder="picture url..."/>
                    );
        }

        return arr;
    }

    onInputChange(e){
        let ele = e.target;

        this.setState({
            ['input' + ele.getAttribute('data-idx')] : ele.value
        });
    }

    onSubmitBtn(){
        let arr = [];
        let obj = this.state;

        for(let key in obj){
            if(obj.hasOwnProperty(key) && key.startsWith('input')){
                arr.push(obj[key]);
            }
        }
        this.props.okFN(arr);
    }

    render(){
        return (
            <Basic>
                {Basic.title(this.titleTxt)}
                {this.picsUrlInputs()}
                {this.btns('Add', this.onSubmitBtn, 'Cancel')}
            </Basic>
        );
    }
}

export default AddPics;