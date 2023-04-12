import { useState } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import { Toaster } from 'react-hot-toast';

export const App = () => {

  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);

  const handleSubmit = (searchInput) => {
    setSearchInput(searchInput)
    setPage(1)
  }

  const handleLoad = () => {
      setPage((prevState) => (prevState+1))
  }
  
    return (
      <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
      >
        <Toaster position="top-right" toastOptions={{ duration: 1500, style: { gap: '10px'}}}/>
        <Searchbar onSearch={handleSubmit}/>
        <ImageGallery input={searchInput} page={page} onLoad={handleLoad} />
        
        
      </div>
    );
  
}
