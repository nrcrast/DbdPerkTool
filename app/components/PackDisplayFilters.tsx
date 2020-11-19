import React, { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import DropdownButton from 'react-bootstrap/DropdownButton';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDebouncedCallback } from 'use-debounce';
import log from 'electron-log';
import styled from 'styled-components';
import { show } from '../app.bootstrap.min.css';
import UserContext from '../context/UserContext';

type MyProps = {
  onFiltersSet: Function;
  initialFilters: [string];
};

const Container = styled.div`
  display: flex;
  margin-bottom: 6px;
  flex-wrap: nowrap;
  align-content: center;
`;

const FilterCheckBox = styled.div`
  margin-right: 20px;
`;

const FilterList = [
  { label: 'Perks', field: 'hasPerks' },
  { label: 'Portraits', field: 'hasPortraits' },
  { label: 'Status Effects', field: 'hasStatusEffects' },
  { label: 'Powers', field: 'hasPowers' },
  { label: 'Offerings', field: 'hasFavors' },
  { label: 'Items', field: 'hasItems' },
  { label: 'Add-Ons', field: 'hasItemAddOns' },
  { label: 'Misc (Emblems, Help, Rituals, etc...)', field: 'misc' }
];

export default function PackDisplayFilter(props: MyProps) {
  const [filters, setFilters] = useState([]);

  const addFilter = filter => {
    const filtersCopy = [...filters];
    filtersCopy.push(filter);
    setFilters(filtersCopy);
    props.onFiltersSet(filtersCopy);
  };

  const removeFilter = filter => {
    const index = filters.indexOf(filter);
    const filtersCopy = [...filters];
    filtersCopy.splice(index, 1);
    setFilters(filtersCopy);
    props.onFiltersSet(filtersCopy);
  };

  const onCheckboxChange = (filter: string, checked: boolean) => {
    if (checked) {
      addFilter(filter);
    } else {
      removeFilter(filter);
    }
  };

  useEffect(() => setFilters(props.initialFilters), [props.initiialFilters]);

  const checkBoxes = FilterList.map(category => {
    const isChecked = filters.includes(category.field);
    if (isChecked) {
      return (
        <FilterCheckBox>
          <Form.Group>
            <Form.Check
              type="checkbox"
              label={category.label}
              checked
              onChange={e => {
                onCheckboxChange(category.field, e.target.checked);
              }}
            />
          </Form.Group>
        </FilterCheckBox>
      );
    } else {
      return (
        <FilterCheckBox>
          <Form.Group>
            <Form.Check
              type="checkbox"
              label={category.label}
              onChange={e => {
                onCheckboxChange(category.field, e.target.checked);
              }}
            />
          </Form.Group>
        </FilterCheckBox>
      );
    }
  });

  return (
    <Container>
      <h5 style={{ marginRight: 10 }}>Filters: </h5>
      {checkBoxes}
    </Container>
  );
}
