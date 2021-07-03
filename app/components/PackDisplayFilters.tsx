import React, { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import log from 'electron-log';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import ReactDOM from 'react-dom';

type MyProps = {
  onFiltersSet: Function;
  initialFilters: [string];
};

const FilterCheckboxContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  padding-bottom: 0px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 6px;
`

const FilterCheckBox = styled.div`
  margin-right: 20px;
  margin-bottom: 0px;
`;

enum CheckboxState {
  CHECKED,
  UNCHECKED,
  INDETERMINATE
};

function fromStateGetChecked(state: CheckboxState) {
  return state === CheckboxState.CHECKED;
}

function fromStateGetIndeterminate(state: CheckboxState) {
  return state === CheckboxState.INDETERMINATE;
}

function nextCheckboxState(state: CheckboxState): CheckboxState {
  switch (state) {
    case CheckboxState.CHECKED:
      return CheckboxState.INDETERMINATE;
    case CheckboxState.UNCHECKED:
      return CheckboxState.CHECKED;
    default:
      return CheckboxState.UNCHECKED;
  }
}

interface FilterCategory {
  label: string;
  field: string;
  state: CheckboxState;
  ref: React.RefObject<HTMLInputElement>;
}

export default function PackDisplayFilter(props: MyProps) {
  const [filters, setFilters] = useState([
    { label: 'Perks', field: 'hasPerks', state: CheckboxState.UNCHECKED, ref: React.createRef<HTMLInputElement>() },
    { label: 'Portraits', field: 'hasPortraits', state: CheckboxState.UNCHECKED, ref: React.createRef<HTMLInputElement>() },
    { label: 'Status Effects', field: 'hasStatusEffects', state: CheckboxState.UNCHECKED, ref: React.createRef<HTMLInputElement>() },
    { label: 'Powers', field: 'hasPowers', state: CheckboxState.UNCHECKED, ref: React.createRef<HTMLInputElement>() },
    { label: 'Offerings', field: 'hasFavors', state: CheckboxState.UNCHECKED, ref: React.createRef<HTMLInputElement>() },
    { label: 'Items', field: 'hasItems', state: CheckboxState.UNCHECKED, ref: React.createRef<HTMLInputElement>() },
    { label: 'Add-Ons', field: 'hasItemAddOns', state: CheckboxState.UNCHECKED, ref: React.createRef<HTMLInputElement>() },
  ]);

  const setFiltersAndNotify = (newFilters: Array<FilterCategory>) => {
    setFilters(newFilters);
    const displayFilters: Array<string> = [];

    newFilters.forEach((filter) => {
      if (filter.state !== CheckboxState.UNCHECKED) {
        displayFilters.push(filter.state === CheckboxState.CHECKED ? filter.field : `no${filter.field}`);
      }
    });

    console.log(displayFilters);

    props.onFiltersSet(displayFilters);
  }

  const setFilterFieldState = (field: string, state: CheckboxState) => {
    const targetFilterIndex = filters.findIndex(filter => filter.field === field);
    

    if(targetFilterIndex >= 0) {
      const targetFilter = filters[targetFilterIndex];
      const newFilter: FilterCategory = { ...targetFilter, state };
      const newFilters = [...filters];
      newFilters.splice(targetFilterIndex, 1, newFilter);
      setFiltersAndNotify(newFilters);
    }
  }

  // useEffect(() => setFilters(props.initialFilters), [props.initiialFilters]);

  const checkBoxes = filters.map((category: FilterCategory, index) => {
    return (
      <FilterCheckBox>
        <Form.Group className="mb-0">
          <input
            type="checkbox"
            className="mr-2"
            checked={fromStateGetChecked(category.state)}
            ref={category.ref}
            onChange={() => {
              const newState = nextCheckboxState(category.state);
              setFilterFieldState(category.field, newState);
            }}
          />
          <label>{category.label}</label>
        </Form.Group>
      </FilterCheckBox>
    )
  });

  useEffect(() => {
    filters.forEach(filter => {
      if(filter.ref.current) {
        const node: any = ReactDOM.findDOMNode(filter.ref.current);
        node.indeterminate = fromStateGetIndeterminate(filter.state);
      }
    });
  }, [filters]);

  return (
    <Container>
    <FilterCheckboxContainer>
      <h5 style={{ marginRight: 10 }}>Filters: </h5>
      {checkBoxes}
    </FilterCheckboxContainer>
    <FilterCheckboxContainer>
      <h5 style={{ marginRight: 10 }}>Shortcuts: </h5>
      <Button variant="secondary" size='sm' className="mr-1" onClick={() => {
        const newFilters = filters.map(field => {
          const newField = {...field};
          if(newField.field === 'hasPerks') {
            newField.state = CheckboxState.INDETERMINATE;
          } else {
            newField.state = CheckboxState.UNCHECKED;
          }
          return newField;
        });
        setFiltersAndNotify(newFilters);
      }}>Portraits Only</Button>
      <Button variant="secondary" size='sm' className="mr-1" onClick={() => {
        const newFilters = filters.map(field => {
          const newField = {...field};
          if(newField.field === 'hasPortraits') {
            newField.state = CheckboxState.INDETERMINATE;
          } else {
            newField.state = CheckboxState.UNCHECKED;
          }
          return newField;
        });
        setFiltersAndNotify(newFilters);
      }}>No Portraits</Button>
      <Button variant="secondary" size='sm' className="mr-5" onClick={() => {
        const newFilters = filters.map(field => {
          const newField = {...field, state: CheckboxState.CHECKED};
          return newField;
        });
        setFiltersAndNotify(newFilters);
      }}>Pack With Everything</Button>
      <Button variant="warning" size='sm' onClick={() => {
        const newFilters = filters.map(field => {
          const newField = {...field, state: CheckboxState.UNCHECKED};
          return newField;
        });
        setFiltersAndNotify(newFilters);
      }}>Reset Filters</Button>
    </FilterCheckboxContainer>
    </Container>
  );
}
