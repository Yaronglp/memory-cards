const Choice = ({title, btn1Title, btn1FN, btn2Title, btn2FN}) => {
    return (
        <div className="open_screen">
            <h1 className="truncate">
                {title}
            </h1>
            <button className="btn inst_btn truncate"
                    onClick={btn1FN}>
                {btn1Title}
            </button>
            <button className="btn inst_btn truncate"
                    onClick={btn2FN}>
                {btn2Title}
            </button>
        </div>
    );
};

export default Choice;