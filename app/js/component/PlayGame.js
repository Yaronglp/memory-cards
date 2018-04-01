import React from 'react';
import Card from './Card';
import Msg from '../modal/Msg';
import data from '../helper/data.json';

class PlayGame extends React.Component{
    constructor(){
        super();
        this.peekCard = this.peekCard.bind(this);
        this.cancelPeek = this.cancelPeek.bind(this);
        this.isPermittedToPeek = this.isPermittedToPeek.bind(this);
        this.exitGame = this.exitGame.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.rtPeekedCards = 3;
        this.timerTimeout = null;
        this.warningTimeout = null;
        this.interval = null;
    }

    componentWillMount(){
        this.setState({
            cardA:{value:'a'},
            cardB:{value:'b'},
            peekedCards:0,
            matchedCards:0,
            finishGame:false,
            gameOver:false,
            timerNote:true
        });
    }

    componentDidUpdate(){
        const {peekedCards, matchedCards, finishGame} = this.state;
        const {cards} = this.props;

        if(peekedCards === 2)
            this.compareTwoCards();

        if(!finishGame && matchedCards === cards.length/2)
            this.finishGame();
    }

    startTimer(){
        this.rtPeekedCards = 0;
        let timerSec = data.timer.sec;
        let timerEle = document.getElementById('timer');

        this.setState({
            timerNote:false
        });

        this.timerTimeout = setTimeout(() => {
                                this.rtPeekedCards = 3;
                                this.setState({
                                    gameOver:true
                                });
                                timerEle.innerHTML = '';
                                clearInterval(this.interval);

                            }, timerSec * 1000);

        this.warningTimeout = setTimeout(() => {
                                  timerEle.classList.add('warning');
                              }, (timerSec - 10) * 1000);

        this.interval = setInterval(() => {
            timerEle.innerHTML = --timerSec;
        }, 1000);
    }

    exitGame(){
        this.setState({
            finishGame:false,
            matchedCards:0
        });
        this.props.exitFN();
    }

    finishGame(){
        clearTimeout(this.warningTimeout);
        clearTimeout(this.timerTimeout);
        clearInterval(this.interval);
        this.setState({
            finishGame:true
        });
    }

    compareTwoCards(){
        let {cardA, cardB, matchedCards} = this.state;

        if(cardA.value !== cardB.value){
            window.setTimeout(() => {
                this.flipDiffCards(cardA.ele,
                                   cardB.ele)
            },1000);

            this.setState({
                cardA:{value:'a'},
                cardB:{value:'b'},
                peekedCards:0
            });
        }
        else{
            cardA.matchCallback();
            cardB.matchCallback();
            this.setState({
                cardA:{value:'a'},
                cardB:{value:'b'},
                peekedCards:0,
                matchedCards:++matchedCards
            });
            this.rtPeekedCards = 0;
        }
    }

    isPermittedToPeek(){
        return this.rtPeekedCards < 2;
    }

    peekCard(card){
        const {peekedCards} = this.state;

        ++this.rtPeekedCards;

        if(peekedCards < 2){
            if(peekedCards === 0){
                this.setState({
                    peekedCards:1,
                    cardA:card
                });
            }
            else{
                this.setState({
                    peekedCards:2,
                    cardB:card
                });
            }
        }
    }

    cancelPeek(){
        this.setState({
            cardA:{value:'a'},
            peekedCards:0
        });
        this.rtPeekedCards = 0;
    }

    flipDiffCards(a, b){
        this.rtPeekedCards = 0;
        a.click();
        b.click();
    }

    render(){
        const {cards} = this.props;
        const {finishGame, gameOver, timerNote} = this.state;

        return (
            <React.Fragment>
                {
                    finishGame === true ?
                        <Msg okFN={this.exitGame}
                             title={data.finishGame.title}/> :
                        null
                }
                {
                    timerNote === true ?
                        <Msg okFN={this.startTimer}
                             title={data.timer.title}/> :
                        null
                }
                {
                    gameOver === true ?
                        <Msg okFN={this.exitGame}
                             title={data.gameOver.title}/> :
                        null
                }
                <div id="timer"> </div>
                <div className="cards_wrapper">
                    {
                        cards.map((item, idx) => <Card key={idx}
                                                       val={item.value}
                                                       alt={item.alt}
                                                       pic={item.pic}
                                                       peekCard={this.peekCard}
                                                       cancelPeek={this.cancelPeek}
                                                       isPermittedToPeek={this.isPermittedToPeek}/>
                        )
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default PlayGame;