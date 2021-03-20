import React from 'react'
import {Form, FormControl } from 'react-bootstrap';

const SearchBar = ({keyword,setKeyword}) => {
    return (
         <Form className="mt-2 d-flex justify-content-center" inline>
            <FormControl name="search"  key="searchKey239"  onChange={(e) => setKeyword(e.target.value)}  value={keyword} type="text" placeholder="Търси рецепта..."   />
          </Form>    
    )
}

export default SearchBar
