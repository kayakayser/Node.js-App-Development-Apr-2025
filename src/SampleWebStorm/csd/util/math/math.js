const calculateDelta = (a, b, c) => b * b - 4 * a * c

export class MathUtil {
    static solveQuadraticEquation(a, b, c) {
        const delta = calculateDelta(a, b, c)

        if (delta >= 0) {
            const sqrtDelta = Math.sqrt(delta)

            return {exists:true, x1: (-b + sqrtDelta) / (2 * a), x2: (-b - sqrtDelta) / (2 * a)}
        }

        return {exists:false, x1: undefined, x2: undefined}
    }
}

const solveQuadraticEquation = (a, b, c) => {
    return MathUtil.solveQuadraticEquation(a, b, c)
}
