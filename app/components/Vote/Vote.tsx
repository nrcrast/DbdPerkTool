import React, { Component, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import UserContext from '../../context/UserContext';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import sort from 'fast-sort';
import api from '../../api/Api';
import AlreadyVotedPage from './AlreadyVotedPage';
import SuccessModal from '../SuccessModal';
import ErrorModal from '../ErrorModal';
import logger from 'electron-log';
import Spinner from 'react-bootstrap/Spinner';
type MyProps = {};

const PollContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-bottom: 20px;
`;

const PollWrapper = styled.div`
  width: 50%;
  height: 100%;
  margin-bottom: 20px;
  align-self: center;
  overflow-y: scroll;
  overflow-x: hidden;
  border: 2px solid rgba(35, 164, 164, 0.4);
`;

const PollIcon = styled.i`
  color: #23a4a4;
`;

export default function Vote(props: MyProps) {
  const userContext = useContext(UserContext);

  const [selectedPack, setSelectedPack] = useState('');
  const [userHasVoted, setUserHasVoted] = useState(false);
  const [currentVote, setCurrentVote] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const [packs, setPacks] = useState([]);
  const [loading, setLoading] = useState(true);

  let disabled = false;

  if(!userContext.user) {
    disabled = true;
  }

  let heading = 'Nominate a pack to be featured in the Icon Toolbox!';
  if (disabled) {
    heading = 'Please login to participate in the featured pack vote!';
  }

  async function getVote() {
    try {
      const vote = await api.executor.apis.default.getVote();
      setCurrentVote(vote);
      setUserHasVoted(true);
    } catch (err) {
      setUserHasVoted(false);
    }
  }

  async function getPacks() {
    const resp = await api.executor.apis.default.getCandidates();
    setPacks(resp);
  }

  useEffect(() => {
    getPacks()
      .finally(() => {
        return getVote();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (userHasVoted) {
    return (
      <PollContainer>
      <AlreadyVotedPage
        candidates={packs}
        id={currentVote.id}
      ></AlreadyVotedPage>
      </PollContainer>
    );
  }

  sort(packs).asc(pack => pack.name);

  const packRows = packs
    .filter(pack => pack.downloads < 300)
    .map(pack => {
      const img = pack.hasPerks
        ? `${pack.previewDir}/perks_0.png`
        : `${pack.previewDir}/portraits_0.png`;
      if(disabled) {
        return (
          <ListGroup.Item
            disabled
          >
            <Image className="vote-img-preview" src={img}></Image>
            {pack.name} - {pack.author}
          </ListGroup.Item>
        );
      } else {
        if (pack.id === selectedPack) {
          return (
            <ListGroup.Item
              action
              active
              onClick={() => {
                setSelectedPack(pack.id);
              }}
            >
              <Image className="vote-img-preview" src={img}></Image>
              {pack.name} - {pack.author}
            </ListGroup.Item>
          );
        } else {
          return (
            <ListGroup.Item
              action
              onClick={() => {
                setSelectedPack(pack.id);
              }}
            >
              <Image className="vote-img-preview" src={img}></Image>
              {pack.name} - {pack.author}
            </ListGroup.Item>
          );
        }
      }
    });

  return (
    <PollContainer>
      <h2>
        <PollIcon className="fas fa-poll mr-2"></PollIcon>{heading}<PollIcon className="ml-2 fas fa-poll"></PollIcon>
      </h2>
      <PollWrapper>
        <ListGroup>{packRows}</ListGroup>
      </PollWrapper>
      <Button
        disabled={disabled}
        size="lg"
        variant="secondary"
        onClick={async () => {
          try {
            await api.executor.apis.default.doVote(
              {},
              { requestBody: { packId: selectedPack } }
            );
            setShowSuccess(true);
          } catch (err) {
            logger.error('Error voting: ', err);
            setShowFail(true);
          }
        }}
      >
        Submit
      </Button>
      <SuccessModal
        title="Successfully sent vote"
        text="You will now be redirected to the current results!"
        show={showSuccess}
        onHide={() => {
          setShowSuccess(false);
          setCurrentVote({ id: selectedPack });
          setUserHasVoted(true);
        }}
      ></SuccessModal>
      <ErrorModal
        title="Error sending vote"
        text="See log for details..."
        show={showFail}
        onHide={() => {
          setShowFail(false);
        }}
      ></ErrorModal>
    </PollContainer>
  );
}
