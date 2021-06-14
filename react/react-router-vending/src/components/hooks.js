import { useEffect } from "react";

const useSetBackground = (url) => {
    useEffect( () => {
        const body = document.getElementsByTagName("body");
        
        body[0].style.backgroundImage = `url("${url}"`;
        body[0].style.backgroundRepeat = "no-repeat";
        body[0].style.backgroundPosition = "center";
        body[0].style.backgroundAttachment = "fixed";
        body[0].style.backgroundSize = "50% 100%";
    }, [url]);
}

export default useSetBackground;