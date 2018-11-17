function stepButton(){
    board.update();
    simulate=false;
};

function simulationButton(){
    toggleSimulation();
};

function randomiseButton(){
    board.randomise();
};

function resetButton(){
    board.reset();
    simulate=false;
}