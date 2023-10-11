// транспонирование матрицы размерности 2
export function transpose(matrix: number[][]): number [][]
{
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

// умножение матрицы размерности (m x n) на вектор (n)
export function multiplMatrixVector(matr: number[][], vector: number[]): number []
{
    let res: number[] = [];
    let sum: number = 0;

    if(matr[0].length === vector.length)
    {
        for(let i = 0; i < matr.length; i++)
        {
            for(let j = 0; j < matr[0].length; j++) { sum += matr[i][j] * vector[j]; }
            res = [...res, sum];
            sum = 0;
        }
    }

    return res;
}

// вычисление суммы двух векторов и прверка элементов на отрицательность
export function positiveDefiniteSum(vector1: number[], vector2: number[]): boolean
{
    if(vector1.length === vector2.length)
    {
        for(let i = 0; i < vector1.length; i++)
        {
            if(vector1[i] + vector2[i] < 0) { return false; }
        }

        return true;
    }

    return false;
}

// вычисление суммы элементов вектора
export function lineAmount(vector: number[]): number
{
    let res: number = 0;
    vector.forEach((val) => res += val);

    return res;
}