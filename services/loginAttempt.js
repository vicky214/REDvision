const LoginAttemptModel = require('../models/loginAttempt');

module.exports = {
    saveAttempt: async (params) => {
        let saveData = {
            attemptStatus: params.status,
            ReasonForError: params.reason,
            userId: params.userId
        }

        await LoginAttemptModel.create(saveData)
        return ""
    }
}