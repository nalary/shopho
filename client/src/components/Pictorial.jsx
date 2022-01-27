import { useState } from "react";
import styled from "styled-components";

const PictorialContainer = styled.div`
    display: inline-block;
    width: 100%;
    margin-bottom: 10px;
    position: relative;    
`;
  
const Image = styled.img`
    display: block;
    width: 100%;
    border-radius: 10px;
`;

const Video = styled.video`
    display: block;
    width: 100%;
    border-radius: 10px;
    z-index: 999;
`;

const Info = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    color: white;
`;

const Pictorial = ({pictorial}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <PictorialContainer  
            key={pictorial.id}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}      
        >
            {pictorial.type === "video" 
                ? (isHovered 
                        ? <Video src={pictorial.source} controls progress="true" loop/> 
                        : <Video src={pictorial.source}/>)
                : <Image src={pictorial.source}/>
            }
            
            {isHovered ||
                <Info>
                    <Title>{pictorial.type === "video" ? pictorial.title : pictorial.id}</Title>
                </Info>
            }
        </PictorialContainer>
    );
};

export default Pictorial;
