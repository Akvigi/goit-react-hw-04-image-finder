import styles from "./SearchForm.module.css"
import PropTypes from 'prop-types'

import React, { useState } from 'react'

const SearchForm = ({ onSubmitFunc }) => {
    const [query, setQuery] = useState('')  
    
    const onHandleSubmit = (e) => {
        e.preventDefault();
        onSubmitFunc(query);
        setQuery("")
    }
    
    return (
        <div className={styles.Searchbar}>
            <form className={styles.SearchForm} onSubmit={(e) => onHandleSubmit(e)}>
                <input
                    className={styles.SearchFormInput}
                    onChange={(e) => setQuery(e.currentTarget.value.toLowerCase().trim())}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
                <button type="submit">
                    <span>Search</span>
                </button>
            </form>
        </div>
        );
}

SearchForm.propTypes = {
    onSubmitFunc: PropTypes.func,
}

export default SearchForm