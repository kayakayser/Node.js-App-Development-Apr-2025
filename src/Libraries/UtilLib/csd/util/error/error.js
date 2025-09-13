export class ErrorUtil {
    static subscribe(action, errorAction) {
        try {
            return action()
        }
        catch (ex) {
            errorAction(ex)
        }
    }

    static subscribeWithFinally(action, errorAction, finallyAction) {
        try {
            return action()
        }
        catch (ex) {
            errorAction(ex)
        }
        finally {
            finallyAction()
        }
    }

    static subscribeJustFinally(action, finallyAction) {
        try {
            return action()
        }
        finally {
            finallyAction()
        }
    }

}


