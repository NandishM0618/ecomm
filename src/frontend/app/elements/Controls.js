const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow p-2`}
            style={{
                ...style,
                display: "block",
                color: "black",
                backgroundColor: "gray",
                border: "2px solid gray",
                borderRadius: "50%",
                position: "absolute",
                right: "0px",
                width: "30px",
                height: "30px",
                padding: "4px",
                textAlign: "center",
                lineHeight: "30px",
                cursor: "pointer",
            }}
            onClick={onClick}
        >
            &gt;
        </div>
    );
};

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow`}
            style={{
                ...style,
                display: "block",
                color: "black",
                backgroundColor: "gray",
                border: "2px solid gray",
                borderRadius: "50%",
                position: "absolute",
                zIndex: 99,
                left: "0px",
                width: "30px",
                height: "30px",
                padding: "4px",
                textAlign: "center",
                lineHeight: "30px",
                cursor: "pointer",
            }}
            onClick={onClick}
        >
            &lt;
        </div>
    );
};

export { NextArrow, PrevArrow };
