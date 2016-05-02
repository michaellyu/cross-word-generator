class Feature{
    point: Point;
    direction: Direction;
    crossPoints: number;
    
    constructor(point: Point, direction: Direction, crossPoints: number){
        this.point = point;
        this.direction = direction;
        this.crossPoints = crossPoints;
    }
}