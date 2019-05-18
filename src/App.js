import React, { useState } from 'react';
import styled from 'styled-components';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';

const H1 = styled.h1`
  font-size: 2.1rem;
  text-align: center;
`;

const NumberInput = styled.input`
  width: 10rem;
  box-sizing: border-box;
  font-size: 2rem;
  padding: 0.5rem;
  margin: 10px;
`;

const SimpleForm = styled.form`
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

const AddWeightButton = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  background: lightblue;
  color: black;
  padding: 0.5rem;
  font-size: 2rem;
  box-sizing: border-box;
`;

function App() {
  const [weights, setWeights] = useState([]);
  const [weight, setWeight] = useState(0);
  const [index, setIndex] = useState(weights.length);
  return (
    <>
      <H1>
        Weight Tracker
        <span> </span>
        <i className="fas fa-weight" />
      </H1>
      <SimpleForm
        onSubmit={e => {
          e.preventDefault();
          setWeights([...weights, { day: index, weight }]);
          setIndex(index + 1);
          setWeight('');
        }}
      >
        <NumberInput
          type="number"
          value={weight}
          onChange={e => {
            setWeight(parseInt(e.target.value));
          }}
          onClick={() => {
            setWeight('');
          }}
        />
        <AddWeightButton>Add Weight</AddWeightButton>
      </SimpleForm>
      <div>
        <h2 style={{ textAlign: 'center' }}>
          Weights:
          {weights.map((w, i) => (
            <React.Fragment key={i}>
              {w.weight.toString()}
              {i + 1 !== weights.length && ', '}
            </React.Fragment>
          ))}
        </h2>
      </div>
      {weights.length >= 2 && (
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryLine
            animate={{ duration: 2000, onLoad: { duration: 1000 } }}
            data={weights}
            x="day"
            y="weight"
          />
        </VictoryChart>
      )}
    </>
  );
}

export default App;
