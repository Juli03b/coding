import React from "react";

const Coin = ({side, coins}) => {
    return (
        <>
        { !!side && <img src={coins[side].img} width="500" height="500" alt={side} data-testid={side} />}
        </>
    );
}

Coin.defaultProps = {
    coins: {
        heads: {
            img: "https://www.pngkey.com/png/full/438-4381412_silver-coins-png-download-head-of-a-coin.png",
        },
        tails: {
            img:"https://images-na.ssl-images-amazon.com/images/I/51NyMaKLydL._AC_.jpg"
        }
    }
}

export default Coin;