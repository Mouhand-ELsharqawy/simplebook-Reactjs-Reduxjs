import React, { useEffect} from 'react';
import BookInfo from './BookInfo';
import BooksList from './BooksList';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../../store/bookslice';

import './book.css';

const PostContainer = () => {
  const {isLoading,books} = useSelector(state => state.books)
 
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getBooks());
    
  },[dispatch])
  return (
    <div> { 
    // book
    } 
    <div className='bookcontainer'>
      
      <hr className='my-5' />
      <div className='row'>
        <div className='col'>
          <BooksList 
          isLoading={isLoading} 
          books={books} />
          {/* <div> { book } </div> */}
        </div>
        <div className='col side-line'>
          <BookInfo />
        </div>
      </div>
      </div>
    </div>
  );
};

export default PostContainer;
