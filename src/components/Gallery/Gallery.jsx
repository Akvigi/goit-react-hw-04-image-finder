import styles from "./Gallery.module.css"
import PropTypes from 'prop-types'
import React from 'react'

const Gallery = ({ array, showModal }) => {
    return (
        <ul className={styles.ImageGallery}>{array.length > 0 && array.map(({ id, webformatURL, largeImageURL, tags, likes }) => {
            return <li className={styles.ImageGalleryItem} key={`${id}${likes}`}><img className={styles.Image} src={webformatURL} href={largeImageURL} onClick={() => showModal(largeImageURL, tags)} alt={tags} /></li>})}
        </ul>
    );

}

Gallery.propTypes = {
    array: PropTypes.array,
    showModal: PropTypes.func,
}

export default Gallery

