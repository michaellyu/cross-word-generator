window.onload = () => {
    document.getElementById('generate').addEventListener('click', function(e) {
        var size: number = document.getElementById('size').value * 1;
    
        var level: number = document.getElementById('level').value * 1;
            
        var wordList: string[] = document.getElementById('words').value.split(/[\n,，]/g).filter(word => /^\s*[a-zA-Z-]+\s*$/.test(word));
            
        var board: Board = new Board(size);
    
        var beginTime = +new Date();
    
        var generator = new Generator(board, wordList, level);
        generator.create();
        
        var endTime = +new Date();
        
        document.querySelector('#container tbody').innerHTML = board.points.map(row => {
            let cells = row.map(cell => `<td>${cell || ''}</td>`).join('');
            return `<tr>${cells}</tr>`;
        }).join('');
        
        console.log(`time:${endTime - beginTime}ms`);
        console.log(`total:${wordList.length}`);
        console.log(`count:${board.words.length}`);
        console.table(board.points);
    });
}