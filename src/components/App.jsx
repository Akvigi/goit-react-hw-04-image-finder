import React, { useEffect, useState } from "react";
import fetchIMG from "Service/api";
import Gallery from "./Gallery/Gallery";
import SearchForm from "./Search/SearchForm";
import styles from "./App.module.css"
import { ThreeDots } from 'react-loader-spinner'
import Modal from "./Gallery/Modal";

const PER_PAGE = 20;

export const App = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [modal, setModal] = useState(null)
  const [loadMore, setLoadMore] = useState(false)

  const getImages = async (query, page) => {
    setIsLoading(true)
    try {
      await fetchIMG(query, page).then(({ hits, totalHits }) => {
        setImages(prevState => ([...prevState, ...hits]))
        setLoadMore(page < Math.ceil(totalHits / PER_PAGE))
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (query !== '') {
      getImages(query, page);
    }
  }, [query, page])
  
  const onHandleSubmit = (value) => {
    if (value === query) {
      return;
    }
    setQuery(value)
    setPage(1)
    setImages([])
    setIsLoading(false)
    setModal(null)
    setLoadMore(false)
  }

  const onHandleLoadMore = () => {
    setPage(prevState => (prevState + 1))
  }

  const showModal = (src, alt) => {
    setModal({src: src, alt: alt})
  }

  const unshowModal = () => {
    setModal(null)
  }

  return (
      <div className={styles.App}>
        <SearchForm onSubmitFunc={onHandleSubmit} />
        <Gallery array={images} showModal={showModal} />
        {isLoading && <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ThreeDots color="#00BFFF" height={80} width={80} />
        </div>}
        {loadMore && <button onClick={onHandleLoadMore}>Load more</button>}
        {modal !== null && <Modal src={modal.src} alt={modal.alt} unshowModal={unshowModal} />}
      </div>
    );
}


export default App;
