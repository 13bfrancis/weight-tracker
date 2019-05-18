import React, { useState } from 'react';
import styled from 'styled-components';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';

const H1 = styled.h1`
  font-size: 2.1rem;
  text-align: center;
`;

const NumberInput = styled.input`
  width: 10rem;
  height: 3rem;
  box-sizing: border-box;
  margin: 0.5rem;
  font-size: 2rem;
`;

const SimpleForm = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddWeightButton = styled.button`
  padding: 0;
  height: 3rem;
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
      <SimpleForm>
        <NumberInput
          type="number"
          value={weight}
          onChange={e => {
            setWeight(parseInt(e.target.value));
          }}
        />
        <AddWeightButton
          onClick={() => {
            setWeights([...weights, { day: index, weight }]);
            setIndex(index + 1);
          }}
        >
          Add Weight
        </AddWeightButton>
      </SimpleForm>
      <div>
        <h2>
          Weights:
          {weights.map(w => (
            <>{w.weight.toString()}, </>
          ))}{' '}
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
