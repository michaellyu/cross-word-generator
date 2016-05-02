class Generator {
    private words: Word[];
    board: Board;
    level: number;
    
    constructor(board: Board, wordList: string[], level: number = 1){
        this.board = board;
        this.words = [];
        this.level = level;
        for(var i = 0;i < wordList.length;i++){
            if(wordList[i].trim().length > board.size){
                continue;
            }
            this.words.push(new Word(wordList[i].trim(), new Point(-1, -1), Direction.Horizontal));
        }
        
        this.words = this.words.sort(function(a, b){
            return b.weight - a.weight;  // 由大到小
            // return a.weight - b.weight;  // 由小到大
        });
    }
    
    create(){
        return this.board.generate(this.words, this.level);
    }
}