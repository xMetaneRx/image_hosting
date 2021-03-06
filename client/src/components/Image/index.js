import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';

const ImageContainer = styled.div`
  margin: 1rem auto;
  width: 90%;
  display: flex;
  flex-direction: column;
  
  @media (min-width: 1200px) {
    width: 60%;
  }
`;

const Loader = styled.div`
  margin: 2rem auto;
  width: 100px;
  height: 100px;
  border: 3px solid #17322F;
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;

@keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
`

const ImageInformation = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #17322F;
  color: white;
  text-align: center;
`;

const Title = styled.h2`
  padding: 0.3rem 0;
  color: white;
  font-weight: 700;
`;

const Description = styled.p`
  padding: 0.3rem 0;
  color: white;
  font-weight: 200;
`;

const Img = styled.img`
  width: 100%;
`;

const ErrorMessage = styled.h2`
  text-align: center;
  margin-top: 2rem;
  color: #17322F;
  font-size: 38px;
`;

function Image() {
    const {pathname} = useLocation();
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        async function getImage() {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_API}/getImageInfo${pathname}`);
                const imageInfo = response.data[0];
                if(imageInfo) {
                    setImage({id: imageInfo.id, image: imageInfo.image, title: imageInfo.title, description: imageInfo.description});
                }
                setIsLoading(false);
            } catch(error) {
                console.error(error);
            }
        }

        getImage();
    }, [])

    return (
        <>
            <Helmet>
                <title>{image ? image.title : 'Image not found'}</title>
            </Helmet>
            {isLoading ? <Loader /> : image ?
            <ImageContainer>
                <Img src={`data:image/png;base64, ${image.image}`} />
                <ImageInformation>
                    <Title>{image.title}</Title>
                    <Description>{image.description}</Description>
                </ImageInformation>
            </ImageContainer> : <ErrorMessage>Image not found</ErrorMessage>
            }
        </>
    )
}

export default Image;