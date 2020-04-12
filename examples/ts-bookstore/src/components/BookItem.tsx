import React, { FunctionComponent } from 'react';
import { Link } from 'reactant-web';
import { IBook } from '../model';

export const BookItem: FunctionComponent<Pick<
  IBook,
  'price' | 'count' | 'name'
> & { link?: string }> = ({ name, price, count, link }) => {
  const bookName = link ? (
    <Link to={link}>
      Book:
      {name}
    </Link>
  ) : (
    <span>
      Book:
      {name}
    </span>
  );
  return (
    <p>
      {bookName}
      <i>
        Price:
        {price}
      </i>
      <span>
        Count:
        {count}
      </span>
    </p>
  );
};
