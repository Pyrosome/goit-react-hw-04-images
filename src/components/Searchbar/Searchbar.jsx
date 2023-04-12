  import { useState } from "react"
import toast from 'react-hot-toast';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './SearchBar.styled';
import { HiArrowRight } from 'react-icons/hi2';


export const Searchbar = ({onSearch}) =>  {
    const [value, setValue] = useState('');

    const handleChange = ({ target: { value } }) => {
        setValue(value)
    }
        
    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!value) {
           return toast.error('Please type in your request.')
        }
        onSearch(value);
        setValue('')
    }

      return (
       <SearchbarHeader onSubmit={handleSubmit}>
        <SearchForm>
          <SearchFormButton type="submit">
            <HiArrowRight />
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={value}
            onChange={handleChange}
          />
        </SearchForm>
      </SearchbarHeader>
        )
    }
