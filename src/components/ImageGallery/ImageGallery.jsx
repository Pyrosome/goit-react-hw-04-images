import { useState, useEffect } from "react"
import toast from 'react-hot-toast';
import { getImg } from "components/APIservice"
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { GalleryUl } from './ImageGallery.styled';
import { Loader } from "components/Loader/Loader";
import { Button } from "components/Button/Button";
import { Modal } from "components/Modal/Modal";


export const ImageGallery = ({ input, page, onLoad }) => {

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [button, setButton] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [largeImg, setLargeImg] = useState('');
    const [alt, setAlt] = useState('');

    useEffect(() => {
        if (input === '') {
            return;
        }
        setImages([])
    }, [input])

    useEffect(() => {
        if (input === '') {
            return;
        }  
        
        setLoading(true);
        getImg(input, page)
                .then(response => {
                    return response.json();
                }).then((images) => {
                    if (images.total===0) {
                        return toast.error('There was no images found on your request.')
                    } else {    
                        setImages(prevState => ([...prevState, ...images.hits]));
                        setButton(page < Math.ceil(images.totalHits / 12))
                        
                        if (page===1) {
                            return toast.success(`${images.totalHits} images found!`)
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                    return toast.error('Something went wrong. Please try again.')
                })
                .finally(() => {
                    setLoading(false);  
                })

    }, [input, page])

    const onClickImg = e => {        
        setLargeImg(e.target.name);
        setAlt(e.target.alt);
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false)
    };

    return (
        <div>
                {loading && page===1 && <Loader/> } 
                <GalleryUl>
                    {images &&
                        images.map(({ id, webformatURL, tags, largeImageURL } ) => {
                            return <ImageGalleryItem key={id} src={webformatURL} alt={tags} name={largeImageURL} onClick={onClickImg} />
                    })}
                </GalleryUl>
                {button && <Button onClick={onLoad} />}
                {openModal && <Modal selectedImage={largeImg} alt={alt} onClose={closeModal} />}
        </div>
    )
    
}
