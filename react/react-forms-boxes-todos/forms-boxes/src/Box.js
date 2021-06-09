const Box = ({color="black", height, width, deleteBox, dataTestId}) => (
    <div style={{backgroundColor: color, height: height + "rem", width: width + "rem"}} data-testid={dataTestId}>
        <button onClick={deleteBox}>X</button>
    </div>
);

export default Box;