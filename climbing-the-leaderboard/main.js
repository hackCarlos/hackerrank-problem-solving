'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'climbingLeaderboard' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY ranked
 *  2. INTEGER_ARRAY player
 */

function climbingLeaderboard(ranked, player) {
    const results = Array(player.length)
    let position = 1
    let j_aux = 0
    
    for(let i = player.length - 1 ; i >= 0 ; i--){
        for(let j = j_aux; j <= ranked.length -1  ; j++){
            if(player[i] >= ranked[j]){
                results[i] = position
                break
            }
    
            if (ranked[j] !== ranked[j + 1] &&  ranked[j + 1] !== undefined){
                position += 1
            }   
            
            j_aux = j + 1  !== ranked.length ? j+1 : j 

            
            if(ranked[j + 1] === undefined){
                results[i] = position + 1
            }      
        }        
    }
    
    return results
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const rankedCount = parseInt(readLine().trim(), 10);

    const ranked = readLine().replace(/\s+$/g, '').split(' ').map(rankedTemp => parseInt(rankedTemp, 10));

    const playerCount = parseInt(readLine().trim(), 10);

    const player = readLine().replace(/\s+$/g, '').split(' ').map(playerTemp => parseInt(playerTemp, 10));

    const result = climbingLeaderboard(ranked, player);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
