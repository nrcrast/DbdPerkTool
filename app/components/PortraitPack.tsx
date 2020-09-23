import React, { Component, useState, useContext } from 'react';
import { subject } from '@casl/ability';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import PortraitPackModel from '../models/PortraitPack';
import PackMetaMapper from '../models/PackMetaMapper';
import InstallButton from './IconPack/InstallButton';
import Author from './IconPack/Author';
import LatestChapter from './IconPack/LatestChapter';
import MainPreview from './IconPack/MainPreview';
import Title from './IconPack/Title';
import NsfwWarning from './IconPack/NsfwWarning';
import Details from './IconPack/PortraitPack/Details';
import settingsUtils from '../settings/Settings';
import styled from 'styled-components';
import UserContext from '../context/UserContext';
import AdminControls from './IconPack/AdminControls';
import { DateTime } from 'luxon';

type MyProps = {
  id: string;
  downloads: number;
  setFilter: any;
  meta: any;
  onAuthorClick: any;
  onError: any;
  onInstallComplete: any;
  viewMode: string;
};
type MyState = {
  saving: boolean;
  saveProgress: number;
  showDetails: boolean;
};

const PortraitPreviewWrapper = styled.div`
  padding-top: 30px;
`;

export default function PortraitPack(props: MyProps) {
  const [saving, setSaving] = useState(false);
  const [saveProgress, setSaveProgress] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const userContext = useContext(UserContext);

  const doInstall = async (id: string, progressCb: any) => {
    const pack = new PortraitPackModel(PackMetaMapper.fromRaw(props.meta));
    try {
      await pack.install(progressCb, {});
      props.onInstallComplete(id);
    } catch (e) {
      props.onError(`Error installing pack ${id}: ${e}`);
    }
  };

  const installPack = async () => {
    setSaving(true);
    setSaveProgress(0);
    await doInstall(props.id, () => {});
    setSaving(false);
    setSaveProgress(0);
  };

  const urls = [...Array(4).keys()].map(i => {
    return `portraits_${i}.png`;
  });

  let adminButtons = null;

  if (
    userContext.user &&
    userContext.user.abilities.can('manage', subject('PerkPack', props.meta))
  ) {
    adminButtons = <AdminControls id={props.id} meta={props.meta} />;
  }

  const lastUpdateStr = DateTime.fromISO(props.meta.lastUpdate).toRelative();

  let cardBody = (
    <Card.Body className="mb-0">
      <Row>
        <Col>
          <p>
            <b>Author:</b>{' '}
            <Author
              onClick={(name: string) => {
                props.onAuthorClick(name);
              }}
              name={props.meta.author}
            />
          </p>
        </Col>
        <Col>
          <p>
            <b>Downloads:</b> {props.meta.downloads}
          </p>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <b>Latest Chapter:</b>{' '}
          <LatestChapter
            name={props.meta.latestChapter}
            onClick={() => {
              props.setFilter(props.meta.latestChapter);
            }}
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <b>Last Update:</b> {lastUpdateStr}
        </Col>
      </Row>
    </Card.Body>
  );

  if (props.viewMode === 'Compact') {
    cardBody = (
      <Card.Body className="mb-0">
        <b>Author:</b>{' '}
        <Author
          onClick={(name: string) => {
            props.onAuthorClick(name);
          }}
          name={props.meta.author}
        />
        <br />
        <b>Latest Chapter:</b>{' '}
        <LatestChapter
          name={props.meta.latestChapter}
          onClick={() => {
            props.setFilter(props.meta.latestChapter);
          }}
        />
        <Row className="mb-2">
          <Col>
            <b>Last Update:</b> {lastUpdateStr}
          </Col>
        </Row>
      </Card.Body>
    );
  }

  const featured = props.meta.featured ? 'pack-featured' : '';

  return (
    <Card className={`${featured} ml-0 mr-0 text-center shadow perk-card`}>
      <PortraitPreviewWrapper>
        <Card.Body className="p-2">
          <MainPreview
            viewMode={props.viewMode}
            urls={urls}
            id={props.id}
            baseUrl={props.meta.previewDir}
            isNsfw={props.meta.isNsfw && !settingsUtils.settings.showNsfw}
          />
        </Card.Body>
      </PortraitPreviewWrapper>
      <Title
        name={props.meta.name}
        isFeatured={props.meta.featured}
        id={props.id}
      />
      {cardBody}
      <InstallButton installInProgress={saving} onClick={installPack} />
      <Button
        variant="secondary"
        className="m-1"
        onClick={() => {
          setShowDetails(true);
        }}
      >
        Details
      </Button>
      <Details
        show={showDetails}
        onHide={() => setShowDetails(false)}
        id={props.id}
        meta={props.meta}
      />
      {adminButtons}
    </Card>
  );
}
