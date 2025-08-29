const mongoose=require('mongoose')

const GeneratedCodeSchema = new mongoose.Schema(
    {
        question: {type: String, required: true},
        hint: {type: String},
        answer: {type: String},
        createdAt: { type: Date, default: Date.now }
    }
)
const CoderSchema = mongoose.Schema(
    {
        username: {type: String, unique: true, required: true},
        name: {type: String, required: true},
        email: {type: String, unique: true, required: true},
        password: { type: String, required: true, select: false },
        generatedCodes: [GeneratedCodeSchema]
    },
    {timestamps: true}
)

module.exports = mongoose.model('Coder', CoderSchema)