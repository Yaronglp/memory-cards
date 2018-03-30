import Basic from './Basic';

class Msg extends Basic {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Basic modalClass="msg_game_modal">
                {Basic.title(this.titleTxt)}
                {this.posBtn('OK')}
            </Basic>
        );
    }
}

export default Msg;