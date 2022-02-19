# wordle-word-searcher

wordle の攻略を助けるツールです

## 使い方

-   説明に沿って入力を行っていく

    -   Enter the green letters
        -   緑の文字を入力する
        -   不明な箇所は.を入力
        -   e.g. w....
    -   Enter the yellow letters
        -   黄色の文字を入力する
        -   黄色の文字以外は.を入力
        -   複数のパターンは/でつないで入力する
        -   e.g. a..../.b.c.
    -   Enter the black letters
        -   黒の文字を入力する
        -   それぞれをそのまま続けて入力
        -   2 個以上同一の文字を入力した際に黒い文字になったものも入力することで絞り込むことが可能
            -   例えば spell に対し最後の l が黒文字で、それを入力すれば 4 文字目以外 l が含まれない単語に絞ることが可能
        -   e.g. abc

-   条件に合致する単語が出力される

## 例

以下をプレイを参考に使用例を示します
![image](https://user-images.githubusercontent.com/47515380/154795680-98d93cd8-e44c-45a2-9cb5-2a62a7581394.png)

<details><summary>使用例</summary>

```
Enter the green letters(e.g. w....)> .l...
Enter the yellow letters(e.g. a..../.b.c.)> ..t.a
Enter the black letters(e.g. abc)> ur

result count: 17

1. allot
2. aloft
3. blast
4. bleat
5. bloat
6. cleat
7. elate
8. float
9. gloat
10. plait
11. plant
12. plate
13. platy
14. pleat
15. slant
16. slate
17. slaty

Enter the green letters(previous: .l...)>
Enter the yellow letters(previous: ..t.a)> ..t.a/..at.
Enter the black letters(previous: ur)> urpe

result count: 5

1. allot
2. aloft
3. bloat
4. float
5. gloat

Enter the green letters(previous: .l...)> al..t
Enter the yellow letters(previous: ..t.a/..at.)> ..t.a/..at./...o.
Enter the black letters(previous: urpe)> urpel

result count: 1

1. aloft
```

</details>

## 辞書

英単語のソースは以下の辞書を使用しています
https://github.com/kujirahand/EJDict
