import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import api from '../../api/Api';
import UserContext from '../../context/UserContext';

const FavoriteWrapper = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  color: #d4af37;

  &:hover {
    color: yellow;
    cursor: pointer;
  }
`;

type MyProps = {
  name: string;
  id: string;
  isFeatured: boolean;
};


export default function Title(props: MyProps) {
  const userContext = useContext(UserContext);
  const isFavorite =
    userContext.user &&
    userContext.user.favorites.find(pack => pack.id === props.id);
  const favoriteStarClass = isFavorite
    ? 'fas fa-star fa-lg'
    : 'far fa-star fa-lg';
  const favoriteStar =
    userContext.user != null ? (
      <FavoriteWrapper
        onClick={async () => {
          await api.updateFavorite(props.id, !isFavorite);
          await api.getUser();
          userContext.setUser(api.currentUser);
        }}
      >
        <i className={favoriteStarClass}></i>
      </FavoriteWrapper>
    ) : null;
  if (props.isFeatured) {
    return (
      <Card.Title>
        {favoriteStar}
        <div className="ribbon-wrapper">
          <div className="ribbon">Featured</div>
        </div>
        {props.name}
      </Card.Title>
    );
  } else {
    return (
      <Card.Title>
        {favoriteStar}
        {props.name}
      </Card.Title>
    );
  }
}
