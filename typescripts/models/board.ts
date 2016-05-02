class Board{
    size: number;
    words: Word[];
    points: string[][];
    
    constructor(size: number){
        this.size = size;
        
        this.words = [];
        
        this.points = [];
        
        this.clearPoints();
    }
    
    generate(words: Word[], level: number = 1){
        this.words = [];
        
        var max = 0;
        var max_words: Word[];
        var max_points: string[][];
        
        for(var i = 0;i < 100 * level;i++) {
            if(this.setWords([...words])){
                return true;
            } else {
                if(max < this.words.length) {
                    max = this.words.length;
                    max_words = [...this.words];
                    max_points = [...this.points];
                }
                this.clearPoints();
                    
                this.words = [];
            }
        }
        
        this.words = max_words;
        this.points = max_points;
        
        return false;
    }
    
    setWords(words: Word[]){
        var features: Feature[];
        var word: Word;
        var flag: Boolean = false;
        
        for(var w = 0;w < words.length;w++){
            word = words[w];
            
            // 获取当前单词可安放位置列表
            features = this.getFeatures(word.letters);
            this.shuffle(features);
            
            if(features.length > 0){
                word.point.x = features[0].point.x;
                word.point.y = features[0].point.y;
                word.direction = features[0].direction;
                
                this.words.push(word);
                
                this.setCenter();
            
                words.splice(w, 1);
                
                flag = true;
                
                break;
            }
        }
        
        if(flag) {
            if(words.length > 0) {
                return this.setWords(words);
            } else {
                return flag;
            }
        } else {
            return flag;
        }
    }
    
    private getRandomNumber(max: number){
        return Math.floor(Math.random() * max);
    }

    private shuffle(array: any[]){
        var from: number, to: number;
        var tmp: any;
        for(var i = 0;i < array.length * 10;i++){
            from = this.getRandomNumber(array.length);
            to = this.getRandomNumber(array.length);

            tmp = array[to];
            array[to] = array[from];
            array[from] = tmp;
        }
    }
    
    private sortFeatures(features: Feature[]){
        features = features.sort(function(a, b){
            return b.crossPoints - a.crossPoints;
        });
        
        return features;
    }
    
    clearPoints(){
        for(var x = 0;x < this.size;x++){
            this.points[x] = [];
            for(var y = 0;y < this.size;y++){
                this.points[x][y] = null;
            }
        }
    }
    
    refreshPoints(){
        this.clearPoints();
        
        var word: Word;
        for(var index = 0;index < this.words.length;index++){
            word =  this.words[index];
            
            if(word.direction == Direction.Horizontal){
                for(var i = 0;i < word.letters.length;i++){
                    this.points[word.point.x][word.point.y + i] = word.letters[i];
                }
            }
            else{
                for(var i = 0;i < word.letters.length;i++){
                    this.points[word.point.x + i][word.point.y] = word.letters[i];
                }
            }
        }
    }
    
    private setCenter(){
        this.refreshPoints();
        
        var minX: number = this.size, minY: number = this.size;
        var maxX: number = -1, maxY: number = -1;
        
        for(var x = 0;x < this.size;x++){
            for(var y = 0;y < this.size;y++){
                if(this.points[x][y] != null){
                    if(minX > x){
                        minX = x;
                    }
                    if(minY > y){
                        minY = y;
                    }
                    if(maxX < x){
                        maxX = x;
                    }
                    if(maxY < y){
                        maxY = y;
                    }
                }
            }
        }
        
        var width: number =  maxX - minX + 1;
        var height: number = maxY - minY + 1;
        var startX: number =  Math.ceil((this.size - width) / 2);
        var startY: number = Math.ceil((this.size - height) / 2);
        
        for(var i = 0;i < this.words.length;i++){
            this.words[i].point.x = this.words[i].point.x - (minX - startX);
            this.words[i].point.y = this.words[i].point.y - (minY - startY);
        }
        
        this.refreshPoints();
    }
    
    getFeatures(letters: string[]){
        var features: Feature[] = [];
        var feature: Feature;
        
        var direction: Direction;
        
        var topPoint: string;
        var bottomPoint: string;
        
        var currentPoint: string;
        var sidePoint: string;
        var otherSidePoint: string;
        var letter: string;
        var crossPoints: number = 0;
        var canSet: boolean = true;
        
        var x: number, y: number;
        var w: number, l: number;
        var index: number;
        
        if(this.words.length > 0){
            for(w = 0;w < this.words.length;w++){
                for(l = 0;l < this.words[w].letters.length;l++){
                    for(index = 0;index < letters.length;index++){
                        if(letters[index] == this.words[w].letters[l]){
                            x = this.words[w].point.x;
                            y = this.words[w].point.y;
                            if(this.words[w].direction == Direction.Horizontal){
                                direction = Direction.Vertical;
                                
                                x = x - index;
                                
                                y = y + l;
                            }
                            else{
                                direction = Direction.Horizontal;
                                
                                x = x + l;
                                
                                y = y - index;
                            }
                            
                            feature = this.getFeature(letters, x, y, direction);
                            if(feature){
                                features.push(feature);
                            }
                        }
                    }
                }
            }
        }
        else{
            feature = this.getFeature(letters, 0, 0, Direction.Horizontal);
            if(feature){
                features.push(feature);
            }
        }
        
        return features;
    }
    
    getFeature(letters: string[], x: number, y: number, direction: Direction){
        var topPoint: string;
        var bottomPoint: string;
        
        var currentPoint: string;
        var sidePoint: string;
        var otherSidePoint: string;
        var letter: string;
        var crossPoints: number = 0;
        var canSet: boolean = true;
        
        if(x >= 0 && x < this.size && y >=0 && y < this.size){
            if(direction == Direction.Horizontal){
                topPoint = this.points[x][y - 1];
                bottomPoint = this.points[x][y + letters.length];
            }
            else{
                topPoint = x - 1 < 0 ? undefined : this.points[x - 1][y];
                bottomPoint = x + letters.length < this.size ? this.points[x + letters.length][y] : undefined;
            }
            
            if(
                (typeof topPoint !== 'undefined' && topPoint != null) ||  // 顶部不为空
                (typeof bottomPoint !== 'undefined' && bottomPoint != null)  // 底部不为空
            ){
                canSet = false;
            }
            
            for(var i = 0;i < letters.length;i++){
                letter = letters[i];
                if(direction == Direction.Horizontal){
                    currentPoint = this.points[x][y + i];
                    sidePoint = x - 1 < 0 ? undefined : this.points[x - 1][y + i];
                    otherSidePoint = x + 1 < this.size ? this.points[x + 1][y + i] : undefined;
                }
                else{
                    currentPoint = x + i < this.size ? this.points[x + i][y] : undefined;
                    sidePoint = x + i < this.size ? this.points[x + i][y - 1] : undefined;
                    otherSidePoint = x + i < this.size ? this.points[x + i][y + 1] : undefined;
                }
                
                if(
                    (typeof currentPoint === 'undefined') ||                    // 字母越界
                    (typeof currentPoint === 'string' && currentPoint != letter) ||         // 字母不同
                    (currentPoint == null && typeof sidePoint !== 'undefined' && sidePoint != null) ||  // 一侧不为空
                    (currentPoint == null && typeof otherSidePoint !== 'undefined' && otherSidePoint != null)  // 另一侧不为空
                ){
                    canSet = false;
                    break;
                }
                else if(currentPoint != null && currentPoint == letter){        // 字母相交
                    crossPoints++;
                }
            }
            
            if(canSet && (crossPoints > 0 || this.words.length == 0)){
                return new Feature(new Point(x, y), direction, crossPoints);
            }
            else{
                return null;
            }
        }
    }
}