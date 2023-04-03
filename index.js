let trees = [];

document.getElementById('files').onchange = function () {
    let file = this.files[0];
    let reader = new FileReader();
    const result = document.getElementById('result');

    reader.onload = function () {
        const forestMap = this.result;
        trees = forestMap.split('\n').map(x => x.split('').filter(x => x !== '\r').map(Number));

        //assume square matrix
        let forestCount = 4 * trees.length - 4;

        for (let i = 1; i < trees.length - 1; i++) {
            for (let j = 1; j < trees.length - 1; j++) {

                let isVisibleTop = true;
                let isVisibleBottom = true;
                let isVisibleLeft = true;
                let isVisibleRight = true;

                // from element left
                for (let k = 0; k < j; k++) {
                    isVisibleLeft = isVisibleLeft && trees[i][j] > trees[i][k];
                }

                // from element right
                for (let k = j + 1; k < trees.length; k++) {
                    isVisibleRight = isVisibleRight && trees[i][j] > trees[i][k];
                }

                // from element top
                for (let k = 0; k < i; k++) {
                    isVisibleTop = isVisibleTop && trees[i][j] > trees[k][j];
                }

                // from element bottom
                for (let k = i + 1; k < trees.length; k++) {
                    isVisibleBottom = isVisibleBottom && trees[i][j] > trees[k][j];
                }

                if (isVisibleTop || isVisibleBottom || isVisibleLeft || isVisibleRight) {
                    forestCount++
                }
            }
        }

        result.textContent = forestCount;
    }
    reader.readAsText(file);
}
