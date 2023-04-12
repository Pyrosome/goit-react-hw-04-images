import { Item, Img } from './ImageGalleryItem.styled';


export const ImageGalleryItem = ({ id, src, alt, name, onClick }) => {
    return (
        <Item onClick={onClick} key={id}><Img src={src} alt={alt} name={name} /></Item>
 )
}