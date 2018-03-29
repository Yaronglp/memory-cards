import React from 'react';

class Card extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            flipped: false,
            isMatched:false
        };
        this.flipCard = this.flipCard.bind(this);
        this.cardMatched = this.cardMatched.bind(this);
    }

    flipCard(e){
        const {flipped} = this.state;

        if(this.props.isPermittedToPeek()){
            if(!flipped) {
                let obj = {
                    ele: e.currentTarget,
                    value: this.props.alt,
                    matchCallback:this.cardMatched
                };
                this.props.peekCard(obj);
            }
            else
                this.props.cancelPeek();

            e.currentTarget.classList.toggle('flipped');
            this.setState({
                flipped:!flipped
            });
        }
    }

    cardMatched(){
        this.setState({
            isMatched:true
        });
    }

    render(){
        const {pic, alt, value} = this.props;

        return (
            <div className="card_container">
                <div className="flip_card" onClick={!this.state.isMatched ? this.flipCard : null}>
                    <div className="front_card"/>
                    <div className="back_card">
                        <img className="img_card"
                             src={pic}
                             alt={alt}
                             data-val={value}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;
