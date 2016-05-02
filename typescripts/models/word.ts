class Word {
    
    point: Point;
    direction: Direction; 
    text: string;
    letters: string[];
    weight: number;
    
    constructor(text: string, point: Point, direction: Direction) {
        this.text = text.toUpperCase();
        this.point = point;
        this.direction = direction;
        this.letters = this.text.toUpperCase().split('');
        this.weight = 0;
        this.setWeight();
    }
    
    private setWeight(){
        var isExist: boolean;
        var isNear: boolean;
        for(var i = 0;i < this.letters.length;i++){
            isExist = false;
            isNear = false;
            for(var j = 0;j < i;j++){
                if(this.letters[j] == this.letters[i]){
                    isExist = true;
                    if(j + 1 == i){
                        isNear = true;
                    }
                }
            }
            if(isExist){
                if(isNear){
                    this.weight += 0.1;
                }
                else{
                    this.weight += 0.5;
                }
            }
            else{
                this.weight += 1;
            }
        }
    }
}