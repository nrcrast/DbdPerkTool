import React, { Component, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import UserContext from '../../context/UserContext';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import sort from 'fast-sort';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import api from '../../api/Api';
type MyProps = { id: string; candidates: Array<Any> };

const PageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export default function AlreadyVotedPage(props: MyProps) {
  const userContext = useContext(UserContext);
  const [results, setResults] = useState([]);

  let votedPack = props.candidates.find(pack => pack.id == props.id);

  const getCurrentResults = async function() {
    const resp = await api.executor.apis.default.getVoteResults();
    setResults(resp);
  };

  useEffect(() => {
    getCurrentResults();
  }, []);

  if (!votedPack) {
    return <Spinner animation="border" />;
  }

  let totalVotes = 0;
  results.forEach((result) => {
	totalVotes += result.votes;
  });

  const rows = sort(results).by([{desc: u => u.votes}, {asc: u => u.name}]).map(result => {
	  const pct = (result.votes / totalVotes) * 100.0;
    return (
      <tr>
        <td>{result.name}</td>
        <td>{result.author}</td>
        <td>{result.votes}</td>
		<td>{pct.toFixed(1)}%</td>
      </tr>
    );
  });

  return (
    <PageWrapper>
      <h3>
        You've already voted for {votedPack.name} by {votedPack.author}
      </h3>
	  <br/>
	  <h4>Results</h4>
      <Table striped bordered className="mt-2">
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th># Votes</th>
			<th>Vote %</th>
          </tr>
        </thead>
        <tbody>
         {rows}
        </tbody>
      </Table>
    </PageWrapper>
  );
}
