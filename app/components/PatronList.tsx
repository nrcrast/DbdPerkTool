import React, { useState, useEffect } from 'react';
import slugify from '@sindresorhus/slugify';
import api from '../api/Api';
import Spinner from 'react-bootstrap/Spinner';

export default function PatronList() {
  const [patrons, setPatrons] = useState([]);
  const [patronsLoaded, setPatronsLoaded] = useState(false);

  const loadPatrons = async () => {
    const apiPatrons = await api.getPatrons();
    setPatrons(apiPatrons);
    setPatronsLoaded(true);
  };

  const patronList = patronsLoaded ? patrons.map<React.ReactNode>(patron => {
    return (
      <p key={`patron-${slugify(patron)}`} className="text-center mt-0 mb-0">
        <small>{patron}</small>
      </p>
    );
  }) : (<Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          className="mr-2"
        />);

  useEffect(() => {
    loadPatrons();
  }, []);

  return (
    <div>
      <h4 className="text-center">❤️Special thanks to Patrons❤️</h4>
      {patronList}
    </div>
  );
}
