import React, { useEffect, useState } from 'react';
import './style/global.scss'
import Main, { IPost } from './components/Main';
import { Route, Routes } from 'react-router-dom';
import FullPost from './components/FullPost';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { searchPostThunk } from './slices/postSlice';
function App() {


  const dispatch = useDispatch<AppDispatch>()
  const { search } = useSelector((state: RootState) => state.input)
  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(searchPostThunk(search))
    }
    fetchPosts()
  }, [search])


  return (
    <div className="container">
      <main>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/post/:id' element={<FullPost />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
