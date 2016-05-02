## Cross Word Generator
填字游戏生成器

## 快速开始
```html
<script src="dist/crossword.min.js"></script>
```

```javascript
var size = 19;
var words = ['apple', 'orange'/* , more ... */];
var level = 1;

var board = new Board(size);

var generator = new Generator(board, wordList, level);
generator.create();

console.table(board.points);
```

# License

  MIT