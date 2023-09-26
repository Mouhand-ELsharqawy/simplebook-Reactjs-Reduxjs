import React from 'react';
import { useDispatch } from 'react-redux';
import { deletebook } from '../../store/bookslice';

const BooksList = ({isLoading,books}) => {
  const dispatch = useDispatch()
  return (
    <div>
      {isLoading  && <div>Loading...</div> }

      <h2>Books List</h2>

      <ul className='list-group'>
        <li className='list-group-item d-flex  justify-content-between align-items-center'>
          { books && books.length > 0 ? books.map((book)=>(
            <div className='book' key={book.id}>
            <div>{book.title}</div>
            <div className='btn-group' role='group'>
              <button type='button' className='btn btn-primary'>
                Read
              </button>
              <button type='button' className='btn btn-danger' onClick={()=>dispatch(deletebook(book.id))}>
                Delete
              </button>
            </div>
            </div>
          )): 'Oops, there is no books avilable'}
          {/* {book[0].title} */}
        </li>
      </ul>
    </div>
  );
};

export default BooksList;
