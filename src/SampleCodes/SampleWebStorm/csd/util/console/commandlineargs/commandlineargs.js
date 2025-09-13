export class CommandLineArgsUtil {
    static checkLengthGreater(len, argsLen, errMessage, exitCode) {
        if (argsLen <= len) {
            process.stderr.write(`${errMessage}\r\n`);
            process.exit(exitCode === undefined ? 1 : exitCode);
        }
    }

    static checkLengthLess(len, argsLen, errMessage, exitCode) {
        if (argsLen >= len) {
            process.stderr.write(`${errMessage}\r\n`);
            process.exit(exitCode === undefined ? 1 : exitCode);
        }
    }
}