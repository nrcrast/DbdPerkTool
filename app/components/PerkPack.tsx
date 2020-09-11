import React, { Component, useState, useContext } from 'react';
import fs from 'fs-extra';
import log from 'electron-log';
import path from 'path';
import { app, remote, shell } from 'electron';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Has from './IconPack/PerkPack/Has';
import Details from './IconPack/PerkPack/Details';
import InstallOptionsModal from './IconPack/PerkPack/InstallOptionsModal';
import InstallButton from './IconPack/InstallButton';
import PerkPackModel from '../models/PerkPack';
import PackMetaMapper from '../models/PackMetaMapper';
import Author from './IconPack/Author';
import LatestChapter from './IconPack/LatestChapter';
import MainPreview from './IconPack/MainPreview';
import Title from './IconPack/Title';
import NsfwWarning from './IconPack/NsfwWarning';
import settingsUtils from '../settings/Settings';
import api from '../api/Api';
import UserContext from '../context/UserContext';

type MyProps = {
  id: string;
  downloads: number;
  meta: any;
  onAuthorClick: any;
  setFilter: any;
  onError: any;
  onInstallComplete: any;
  viewMode: string;
};
type MyState = {
  saving: boolean;
  showInstallOpts: boolean;
  showDetails: boolean;
};

export default function PerkPack(props: MyProps) {
  const [saving, setSaving] = useState(false);
  const [showInstallOpts, setShowInstallOpts] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const userContext = useContext(UserContext);

  const doInstall = async (id: string, progressCb: any, opts: any) => {
    const pack = new PerkPackModel(PackMetaMapper.fromRaw(props.meta));
    try {
      await pack.install(progressCb, opts);

      if (settingsUtils.settings.writeToTxt === true) {
        const writePackTxtPath = path.resolve(
          (app || remote.app).getPath('userData'),
          'currentperkpack.txt'
        );
        await fs.writeFile(
          writePackTxtPath,
          `Current Perk Pack: ${props.meta.author} - ${props.meta.name}`
        );
      }

      props.onInstallComplete(id);
    } catch (e) {
      props.onError(`Error installing pack ${id}: ${e}`);
    }
  };

  const installPack = async (opts: Array<string>) => {
    setSaving(true);
    await doInstall(props.id, null, opts);
    setSaving(false);
  };

  const urls = [...Array(4).keys()].map(i => {
    return `perks_${i}.png`;
  });

  let cardBody = (
    <Card.Body className="mb-0">
      <Row className="mb-2">
        <Col>
          <b>Author:</b>{' '}
          <Author
            onClick={(name: string) => {
              props.onAuthorClick(name);
            }}
            name={props.meta.author}
          />
        </Col>
        <Col>
          <b>Downloads:</b> {props.meta.downloads}
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

      <Has
        portraits={props.meta.hasPortraits}
        powers={props.meta.hasPowers}
        items={props.meta.hasItems}
        statusEffects={props.meta.hasStatusEffects}
        addons={props.meta.hasItemAddOns}
        offerings={props.meta.hasFavors}
      />
    </Card.Body>
  );

  if (props.viewMode === 'Compact') {
    cardBody = (
      <Card.Body>
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
      </Card.Body>
    );
  }

  const margin = props.viewMode === 'Normal' ? 'm-3' : 'mb-3';
  const featured = props.meta.featured ? 'pack-featured' : '';

  return (
    <div>
      <Card
        className={`${margin} ${featured} ml-0 mr-0 text-center shadow perk-card border-0`}
      >
        <Card.Body>
          <MainPreview
            urls={urls}
            id={props.id}
            baseUrl={props.meta.previewDir}
            viewMode={props.viewMode}
            isNsfw={props.meta.isNsfw && !settingsUtils.settings.showNsfw}
          />
        </Card.Body>
        <Title
          name={props.meta.name}
          isFeatured={props.meta.featured}
          id={props.id}
        />
        {cardBody}
        <InstallButton
          installInProgress={saving}
          onClick={() => {
            setShowInstallOpts(true);
          }}
        />
        <Button
          variant="dark"
          className="m-1"
          onClick={() => {
            setShowDetails(true);
          }}
        >
          Details
        </Button>
      </Card>
      <Details
        show={showDetails}
        onHide={() => setShowDetails(false)}
        id={props.id}
        meta={props.meta}
      />
      <InstallOptionsModal
        show={showInstallOpts}
        onConfirm={(opts: Array<string>) => {
          setShowInstallOpts(false);
          installPack(opts);
        }}
        onHide={() => setShowInstallOpts(false)}
        meta={props.meta}
      />
    </div>
  );
}
