/**
 * Tom Bielawski
 * React.Tac.Toe game
 * 7/29/2021
 * */

//import statements
import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react";
import Square from "./components/Square";
import {Patterns} from "./patterns";


/* change spinner
* make notification for current player turn
* replace x, o, with images
* */

//Main App function
function App()
{

    //Declare initial state, init with 9 empty strings: one for each square
    const [board, setBoard] = useState(["","","","","","","","","",]);

    //Declare player state, init to X
    const [player, setPlayer] = useState("O");

    //Declare result state, init with object for winner and status
    const [result, setResult] = useState({winner: "Waiting", status: "..." });


    //useEffect hook() to update with every change, calls chooseWinner()
    useEffect(() =>
    {

            //call chooseWinner
            chooseWinner();
            //call checkForATie
            checkForATie();

            //After setting the board above,
            //If current player is X
            if (player === "X")
            {
                //Make the current player O
                setPlayer("O");
            }

            //Else, make the current player X
            else
            {
                setPlayer("X");
            }

        //dependency to prevent endless updates
    }, [ board]);


    //useEffect called after every move
    useEffect((event) =>
    {
        //Check if first render of the page so alert doesnt happen incorrectly
        if (result.state !== "none")
        {

            //Display results in an alert window
            //alert(`Game over!!! The winner is: ${result.winner}`);

            //Restart the game, invoke startOver()
            startOver();
        }

        //Dependency to prevent endless calls
    }, [result]);


    //Square chooser function (rename after complete), pass in square index
    const chooseSquare = (square) =>
    {
        //Set the board, map over squares, find the value of each square
        setBoard(board.map((value, index) =>
        {
            //If square == index, & value is empty, change square's initially empty state to current player
            //This prevents player from choosing more than one square
            if (index === square && value === "")
            {
                return player;
            }

            //Else return the current value
            else {return value;}
        }));

    };

    // Choose winner function, called each time a move is made.
    // No parameters
    const chooseWinner = () =>
    {
        //Loop through the patterns
        //For each pattern in the array
        Patterns.forEach((currentPattern) =>
        {
            //Set the current player
            const firstPlayer = board[currentPattern[0]];

            //If firstPlayer is empty "", continue the game
            if (firstPlayer === "") {return;}

            //Declare win variable, init to true
            let foundWinningPattern = true;

            //Compare the patterns
            //For each index in the current pattern
            currentPattern.forEach((index) =>
            {
                //If board at current index != firstPlayer
                if (board[index] !== firstPlayer)
                {
                    //The winning pattern is false, no winner yet
                    foundWinningPattern = false;
                }

                // //Otherwise,
                // else {foundWinningPattern === true;}
            });

            //If the winning pattern is found
            if (foundWinningPattern === true)
            {
                //Declare the winner and assign to object
                setResult({winner: player, status: " is the winner!!"})
            }
        });
    };

    //Check for a time
    const checkForATie = () =>
    {
        //Declare bool to represent a full board
        let boardIsFilled = true;

        //Loop over board
        //For each square on the board...
        board.forEach((square) =>
        {
            //if a square is empty
            if (square === "")
            {
                //Board is not filled
                boardIsFilled = false;
            }
        });

        //If there is a tie
        if (boardIsFilled)
        {
            //Set the result and display
            setResult({winner: "Two losers!", status: "It's a tie!"});
        }
    };

    //startOver function to restart game, no params
    const startOver = () =>
    {
        //return board to initial state
        setBoard(["","","","","","","","","",]);

        //Set player to O
        setPlayer("O");
    };

    //Bool to check background color
    const backColor = true;

    //Return function
  return (
    <div className="App">

        {/*Main div to hold the board*/}
        <div className= "board" >

            {/*Header */}
            <header className="App-header">
                <h1> React Tac Toe </h1>
                <h4> Choose a square, and let's play! </h4>

                <p>{`Results: ${result.winner} ${result.status}`}</p>

                {/* React Logo */}
                <div className="App-logo">
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
            </header>


            {/*Divs for each row*/}
            <div className="row">
                {/* Render each square, pass the square's index */}
                {/* Pass value, call chooseSquare(), pass in the called square's index */}
                <Square value = {board[0]} chooseSquare = {() => {chooseSquare(0)}}/>
                <Square value = {board[1]} chooseSquare = {() => {chooseSquare(1)}}/>
                <Square value = {board[2]} chooseSquare = {() => {chooseSquare(2)}}/>
            </div>

            {/*Next row of squares*/}
            <div className="row">
                <Square value = {board[3]} chooseSquare = {() => {chooseSquare(3)}}/>
                <Square value = {board[4]} chooseSquare = {() => {chooseSquare(4)}}/>
                <Square value = {board[5]} chooseSquare = {() => {chooseSquare(5)}}/>
            </div>

            {/*Next row of squares*/}
            <div className="row">
                <Square value = {board[6]} chooseSquare = {() => {chooseSquare(6)}}/>
                <Square value = {board[7]} chooseSquare = {() => {chooseSquare(7)}}/>
                <Square value = {board[8]} chooseSquare = {() => {chooseSquare(8)}}/>
            </div>
        </div>
    </div>
  );
}

//Export statement
export default App;

