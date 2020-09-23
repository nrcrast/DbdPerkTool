import React, { Component, useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import routes from '../constants/routes.json';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import PlainTextInput from './Form/PlainTextInput';
import UserContext from '../context/UserContext';
import AuthorLink from './MyProfile/AuthorLink';
import uuid from 'react-uuid';
import SuccessModal from './SuccessModal';
import api from '../api/Api';
import NoAuthorProfile from './NoAuthorProfile';

type MyProps = {};

const DescriptionHeader = styled.h4``;

const AddLinkWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-right: 10px;
  align-items: center;
`;

const UserImageWrapper = styled.div`
display: flex;
justify-content: center;
`;

export default function MyProfile(props: MyProps) {
  const userContext = useContext(UserContext);

  if (!userContext.user) {
    return <Redirect to={routes.PERKS} />;
  }

  if (!userContext.user.authorProfile) {
    return <NoAuthorProfile />;
  }

  const [blurb, setBlurb] = useState(userContext.user.authorProfile.blurb);
  const [links, setLinks] = useState(userContext.user.authorProfile.links);
  const [showSuccess, setShowSuccess] = useState(false);
  const [donateLink, setDonateLink] = useState(
    userContext.user.authorProfile.donateLink
  );

  const addLink = () => {
    console.log('Adding link');
    setLinks([...links, { label: '', link: '' }]);
  };

  console.log('Links: ', links);

  const authorLinks = links.map((link, index) => {
    return (
      <AuthorLink
        key={uuid()}
        label={link.label}
        link={link.link}
        onChange={(label: string, linkText: string) => {
          link.label = label;
          link.link = linkText;
        }}
        onRemove={() => {
          console.log('Index: ', index);
          const newLinks = [...links];
          newLinks.splice(index, 1);
          setLinks(newLinks);
        }}
      ></AuthorLink>
    );
  });

  return (
    <Col className="col-8">
      <UserImageWrapper>
        <Image
          src={userContext.user.steamAvatarUrl}
          className="my-profile-avatar"
          roundedCircle
        />
      </UserImageWrapper>
      <Form
        onSubmit={async e => {
          e.preventDefault();
          console.log(`Saving Links: `, links);
          await api.executor.apis.default.putUser(
            {},
            {
              requestBody: {
                authorProfile: {
                  blurb,
                  donateLink,
                  links
                }
              }
            }
          );
          await userContext.setUser(await api.getUser());
          setShowSuccess(true);
        }}
      >
        <DescriptionHeader>General</DescriptionHeader>
        <PlainTextInput
          label="About Me"
          value={blurb}
          onChange={e => setBlurb(e.target.value)}
        />
        <PlainTextInput
          label="Donation Link"
          value={donateLink}
          onChange={e => setDonateLink(e.target.value)}
        />
        <DescriptionHeader>
          Other Links (Discord, Twitter, etc..)
        </DescriptionHeader>
        {authorLinks}
        <AddLinkWrapper>
          <i
            onClick={() => {
              addLink();
            }}
            className="fas fa-plus-circle fa-2x author-link-add"
          ></i>
        </AddLinkWrapper>
        <Button variant="secondary" type="submit">
          Save
        </Button>
      </Form>
      <SuccessModal
        onHide={() => setShowSuccess(false)}
        title="Success"
        text="Author profile updated successfully!"
        show={showSuccess}
      ></SuccessModal>
    </Col>
  );
}
