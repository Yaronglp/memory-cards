import Basic from './Basic';

class Msg extends Basic {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Basic modalClass="msg_game_modal">
                {Basic.title(this.titleTxt)}
                <div className="btn_holder">
                    {this.posBtn('OK')}
                </div>
            </Basic>
        );
    }
}

export default Msg;