import React from 'react';

class Basic extends React.Component{
    constructor(props){
        super(props);
        this.titleTxt = this.props.title;
        this.negBtnFN = this.negBtnFN.bind(this);
        this.posBtnFN = this.posBtnFN.bind(this);
    }

    posBtn(txt, clkFN){
        return <button className="btn inst_btn"
                       onClick={clkFN || this.posBtnFN}>
                    {txt}
               </button>
    }

    negBtn(txt, clkFN){
        return <button className="btn inst_btn cancel_btn"
                       onClick={clkFN || this.negBtnFN}>
                    {txt}
               </button>
    }

    btns(posTxt, overridePosBtn, negTxt, overrideNegBtn){
        return <div>
                    {this.negBtn(negTxt, overrideNegBtn)}
                    {this.posBtn(posTxt, overridePosBtn)}
               </div>
    }

    static title(title){
        return <h1>{title}</h1>
    }

    posBtnFN(){
        this.props.okFN();
    }

    negBtnFN(){
        this.props.cancelFN();
    }

    render(){
        const {modalClass} = this.props;
        let modalCls = "modal ";

        if(this.props.modalClass)
            modalCls += modalClass;

        return (
            <div className={modalCls}>
                <div className="modal_content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Basic;