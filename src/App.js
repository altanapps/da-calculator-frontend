import React, { useState } from "react";
import styled from "styled-components";

// Styled Components
const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; // Increased space between children
`;

const FormContainer = styled.div`
  max-width: 650px;
  width: 100%;
  background: #141414;
  border-radius: 4px;
  border: 1px solid #ffffff1a;
  display: flex;
  flex-direction: column;
  gap: 36px; // Increased space between form elements

  padding: 24px; // Adjust padding as necessary
`;

const FormInputLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px; // Add some bottom margin for spacing
`;

const FormInputRow = styled.div`
  display: flex;
  align-items: center; // Aligns items vertically in the center
  border: 1px solid #aaa; // Softer border color
  border-radius: 4px; // Rounded corners
  padding: 8px; // Padding inside the row
`;
const TableDiv = styled.div`
  width: 80%;
  margin: 20px auto; /* Centers the table and adds top margin */
  border: 1px solid #ccc;
  border-collapse: collapse;
`;

const TableHeader = styled.div`
  background-color: #4f81bd; /* Updated color for better contrast */
  color: white; /* White text for readability */
  font-weight: bold;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  &:nth-child(even) {
    /* Zebra striping for rows */
  }
`;

const TableCell = styled.div`
  flex: 1;
  padding: 15px;
  text-align: center;
  border-right: 2px solid #ccc; /* Add right border to each cell */

  &:last-child {
    border-right: none; /* Remove right border for the last cell in a row */
  }
`;

const FormInputTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const UnitContent = styled.span`
  padding: 8px;
  background-color: #555; // Slightly different background for unit
  border-radius: 4px; // Also round the corners of the unit
  color: #fff; // White text color
`;

const Main = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background: #101010;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0 16px;
  color: white;
  @media (min-width: 640px) {
    padding: 0 40px;
  }
`;

const Spacer = styled.div``;

const BodyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  margin-top: 100px; // Increase this value to push the form further down from the top
  margin-bottom: 40px;
`;

const HeaderContainer = styled.div`
  padding: 18px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 56px;
`;

const TabItem = styled.div`
  cursor: pointer;
  font-size: 24px;
  font-weight: 600;
  ${(props) => !props.selected && "opacity: 0.4;"}
`;

const Input = styled.input`
  flex: 1; // Allows input to fill space
  type: number;
  padding: 8px; // Padding inside the input
  border: none; // Removes individual input border
  border-radius: 4px; // Rounds the corners of the input
  margin-right: 8px; // Adds some space between input and unit
  font-size: 16px; // Larger font size for readability
  color: #fff; // White text color for contrast
  background-color: #333; // Darker background for the input
  &:focus {
    outline: none; // Removes the default focus outline
  }
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: blue;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: blue;
  }
`;

async function retrieveData(blobSizes) {
  blobSizes = parseInt(blobSizes);
  var json = JSON.stringify({
    blobSizes: [blobSizes],
  });

  try {
    const response = await fetch("/estimateFee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
// The App component
const App = () => {
  const [state, setState] = useState({
    tab: "DA Calculator", // Mint / Indexer / Transfer
    dataToSend: "346", // Added for the new input field
    result: null,
  });

  let data = null;

  let body = null;
  if (state.result !== null) {
    const result = state.result;
    const Table = () => {
      return (
        <TableDiv>
          <TableRow>
            <TableCell>NEAR</TableCell>
            <TableCell>TIA</TableCell>
            <TableCell>ETH</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              $ {Number(JSON.stringify(result.NEAR)).toFixed(4)}
            </TableCell>
            <TableCell>
              $ {Number(JSON.stringify(result.TIA)).toFixed(4)}{" "}
            </TableCell>
            <TableCell>
              $ {Number(JSON.stringify(result.ETH)).toFixed(4)}
            </TableCell>
          </TableRow>
        </TableDiv>
      );
    };
    body = (
      <>
        <BodyContainer>
          {state.tab === "DA Calculator" && (
            <>
              <FormContainer>
                <FormInputContainer>
                  <FormInputLabel>
                    <FormInputTitle>Data to Send (Bytes)</FormInputTitle>
                  </FormInputLabel>
                  <FormInputRow>
                    <Input
                      value={state.dataToSend}
                      onChange={(e) =>
                        setState({ ...state, dataToSend: e.target.value })
                      }
                      spellCheck="false"
                    />
                    <UnitContent>Bytes</UnitContent>
                  </FormInputRow>
                  <SubmitButton
                    onClick={async () => {
                      data = await retrieveData(state.dataToSend);
                      // Set the data to be part of the state
                      setState({ ...state, result: data });
                    }}
                  >
                    Submit
                  </SubmitButton>
                </FormInputContainer>
              </FormContainer>
            </>
          )}
        </BodyContainer>
        <BodyContainer>
          <Table></Table>
        </BodyContainer>
      </>
    );
  } else {
    body = (
      <BodyContainer>
        {state.tab === "DA Calculator" && (
          <>
            <FormContainer>
              <FormInputContainer>
                <FormInputLabel>
                  <FormInputTitle>Data to Send (Bytes)</FormInputTitle>
                </FormInputLabel>
                <FormInputRow>
                  <Input
                    value={state.dataToSend}
                    onChange={(e) =>
                      setState({ ...state, dataToSend: e.target.value })
                    }
                    spellCheck="false"
                  />
                  <UnitContent>Bytes</UnitContent>
                </FormInputRow>
                <SubmitButton
                  onClick={async () => {
                    data = await retrieveData(state.dataToSend);
                    // Set the data to be part of the state
                    setState({ ...state, result: data });
                  }}
                >
                  Submit
                </SubmitButton>
              </FormInputContainer>
            </FormContainer>
          </>
        )}
      </BodyContainer>
    );
  }

  return (
    <Main>
      <HeaderContainer>
        <TabContainer>
          <TabItem
            selected={state.tab === "DA Calculator"}
            onClick={() => {
              console.log("printed!");
            }}
          >
            DA Calculator
          </TabItem>
        </TabContainer>
        <Spacer />
      </HeaderContainer>
      {body}
    </Main>
  );
};

export default App;
