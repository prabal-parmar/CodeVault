const mongoose=require('mongoose')

const GeneratedCodeSchema = new mongoose.Schema(
    {
        question: {type: String, required: true},
        hint: {type: String},
        answer: {type: String},
        createdAt: { type: Date, default: Date.now }
    }
)

const GeneratedInterviewSchema = new mongoose.Schema(
    {
        questions: {
            type: [String],
            default: []
        },
        responses: {
            type: [String],
            default: []
        },
        feedback: {
            type: String,
        },
        score: {
            type: Number,
            min: 0,
            max: 10
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        recommendations: {
            type: String,
            default: "Keep practising and improving yourself"
        }
    }
)

const CoderSchema = mongoose.Schema(
    {
        username: {type: String, unique: true, required: true},
        avatar: {type: String, enum: ["coder0", "coder1", "coder2", "coder3", "coder4", "coder5", "coder6"]},
        name: {type: String, required: true},
        email: {type: String, unique: true, required: true},
        password: { type: String, required: true, select: false },
        generatedCodes: [GeneratedCodeSchema],
        interviewFeedback: [GeneratedInterviewSchema]
    },
    {timestamps: true}
)

module.exports = mongoose.model('Coder', CoderSchema)