import React from 'react';
import PlayGame from './component/PlayGame';
import AddPics from './modal/AddPics';
import {duplicateAndScrambleArr, addImgResources} from './helper/Util';
import '../css/main.css';
import data from './helper/data.json';
import Choice from "./component/Choice";

class App extends React.Component{
    constructor(){
        super();
        this.startGame = this.startGame.bind(this);
        this.addNewPics = this.addNewPics.bind(this);
        this.openPicsModal = this.openPicsModal.bind(this);
        this.exitPicsModal = this.exitPicsModal.bind(this);
        this.exitGame = this.exitGame.bind(this);
        this.customCards = [];
    }

    componentWillMount(){
        let arr = duplicateAndScrambleArr(data.cards);

        this.setState({
            cards:arr,
            startGame:false,
            openPicsModal:false
        });
    }

    openPicsModal(){
        this.setState({
            openPicsModal:true
        });
    }

    rebuildCardsData(arr){
        let tmpArr = JSON.parse(JSON.stringify(data)).cards;

        for (let i = 0; i < arr.length; i++) {
            tmpArr[i].pic = arr[i];
        }

        this.customCards = duplicateAndScrambleArr(tmpArr);

        this.setState({
            cards:this.customCards,
            openPicsModal:false
        });
    }

    addNewPics(imgArr){
        addImgResources(imgArr)
            .then((res) => {
                this.rebuildCardsData(res);
            })
            .catch((err) => {
                console.error(err);
                alert("One or more pictures are invalid,\nPlease check it and try again.");
            });
    }

    exitPicsModal(){
        this.setState({
            openPicsModal:false
        });
    }

    startGame(){
        this.setState({
            startGame:true
        });
    }

    exitGame(){
        this.setState({
            startGame:false,
            cards: this.state.cards
        });
    }

    render() {
        const {cards, startGame, openPicsModal} = this.state;

        return (
            startGame === true ?
                <PlayGame cards={cards}
                          exitFN={this.exitGame}/> :
                openPicsModal === false ?
                    <Choice title={data.openScreen.title}
                            btn1Title={data.openScreen.btn1}
                            btn1FN={this.startGame}
                            btn2Title={data.openScreen.btn2}
                            btn2FN={this.openPicsModal}/> :
                    <AddPics title={data.addPicture.title}
                             cancelFN={this.exitPicsModal}
                             okFN={this.addNewPics}/>
        );
    }
}

export default App;